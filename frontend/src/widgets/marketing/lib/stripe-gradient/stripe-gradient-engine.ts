/**
 * Adapted from thelevicole/stripe-gradient (reverse-engineered Stripe.com gradient)
 * https://github.com/thelevicole/stripe-gradient
 *
 * Enterprise port: container-based resize, intersection pause, TypeScript strict mode.
 */

import { Material } from './material';
import { Mesh } from './mesh';
import { MiniGL } from './mini-gl';
import { hexToColorInt, normalizeColor } from './normalize-color';
import { PlaneGeometry } from './plane-geometry';
import { blendGlsl } from './shaders/blend.glsl';
import { fragmentGlsl } from './shaders/fragment.glsl';
import { noiseGlsl } from './shaders/noise.glsl';
import { vertexGlsl } from './shaders/vertex.glsl';
import {
  STRIPE_GRADIENT_DEFAULT_OPTIONS,
  type StripeGradientOptions,
} from './stripe-gradient-config';
import { Uniform } from './uniform';

export interface StripeGradientEngineOptions extends StripeGradientOptions {
  canvas: HTMLCanvasElement;
  width?: number;
  height?: number;
}

export class StripeGradientEngine {
  private readonly canvas: HTMLCanvasElement;
  private readonly options: Required<
    Pick<StripeGradientOptions, 'colors' | 'density' | 'amplitude' | 'angle' | 'darkenTop' | 'static'>
  >;

  private minigl: MiniGL | null = null;
  private mesh: Mesh | null = null;
  private material: Material | null = null;
  private geometry: PlaneGeometry | null = null;
  private uniforms: Record<string, Uniform> | null = null;

  private playing = false;
  private visible = true;
  private animationFrameId: number | null = null;
  private time = 1_253_106;
  private lastFrame = 0;
  private seed = Math.random() * 100;
  private width = 0;
  private height = 0;
  private xSegCount = 0;
  private ySegCount = 0;

  private readonly freqX = 0.00014;
  private readonly freqY = 0.00029;
  private activeColors: [number, number, number, number] = [1, 1, 1, 1];

  private handleContextLost = (event: Event) => {
    event.preventDefault();
    this.pause();
  };

  constructor(options: StripeGradientEngineOptions) {
    this.canvas = options.canvas;
    this.options = {
      colors: options.colors ?? [...STRIPE_GRADIENT_DEFAULT_OPTIONS.colors],
      density: options.density ?? [...STRIPE_GRADIENT_DEFAULT_OPTIONS.density],
      amplitude: options.amplitude ?? STRIPE_GRADIENT_DEFAULT_OPTIONS.amplitude,
      angle: options.angle ?? STRIPE_GRADIENT_DEFAULT_OPTIONS.angle,
      darkenTop: options.darkenTop ?? STRIPE_GRADIENT_DEFAULT_OPTIONS.darkenTop,
      static: options.static ?? STRIPE_GRADIENT_DEFAULT_OPTIONS.static,
    };

    const initialWidth =
      options.width && options.width > 0
        ? options.width
        : this.canvas.clientWidth || 640;
    const initialHeight =
      options.height && options.height > 0
        ? options.height
        : this.canvas.clientHeight || 480;

    this.minigl = new MiniGL(this.canvas, initialWidth, initialHeight);
    this.initMesh();
    this.resize(initialWidth, initialHeight);

    this.canvas.addEventListener('webglcontextlost', this.handleContextLost);
  }

  play(): void {
    if (this.playing) return;
    this.playing = true;
    this.lastFrame = 0;
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  pause(): void {
    this.playing = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  setVisible(visible: boolean): void {
    this.visible = visible;
    if (visible && !this.playing) {
      this.play();
    }
    if (!visible && this.playing) {
      this.pause();
    }
  }

  resize(width: number, height: number): void {
    if (!this.minigl || !this.mesh || !this.material) return;

    this.width = Math.max(1, Math.floor(width));
    this.height = Math.max(1, Math.floor(height));

    const [densityX, densityY] = this.options.density;
    this.minigl.setSize(this.width, this.height);
    this.minigl.setOrthographicCamera();
    this.xSegCount = Math.max(1, Math.ceil(this.width * densityX));
    this.ySegCount = Math.max(1, Math.ceil(this.height * densityY));
    this.mesh.geometry.setTopology(this.xSegCount, this.ySegCount);
    this.mesh.geometry.setSize(this.width, this.height);

    const shadowUniform = this.uniforms?.u_shadow_power;
    if (shadowUniform) {
      shadowUniform.value = this.width < 600 ? 5 : 6;
    }
  }

  disconnect(): void {
    this.pause();
    this.canvas.removeEventListener('webglcontextlost', this.handleContextLost);
    this.mesh?.remove();
    this.mesh = null;
    this.material = null;
    this.geometry = null;
    this.uniforms = null;
    this.minigl = null;
  }

  private initMesh(): void {
    if (!this.minigl) return;

    this.material = this.initMaterial();
    this.geometry = new PlaneGeometry(this.minigl);
    this.mesh = new Mesh(this.minigl, this.geometry, this.material);
  }

  private initMaterial(): Material {
    if (!this.minigl) {
      throw new Error('MiniGL is not initialized.');
    }

    const colors = this.options.colors
      .map((hex) => {
        try {
          return normalizeColor(hexToColorInt(hex));
        } catch {
          return null;
        }
      })
      .filter((value): value is [number, number, number] => value !== null);

    if (colors.length === 0) {
      throw new Error('Stripe gradient requires at least one valid color.');
    }

    this.uniforms = {
      u_time: new Uniform(this.minigl, 'float', 0),
      u_shadow_power: new Uniform(this.minigl, 'float', 6),
      u_darken_top: new Uniform(this.minigl, 'float', this.options.darkenTop ? 1 : 0),
      u_active_colors: new Uniform(this.minigl, 'vec4', this.activeColors),
      u_global: new Uniform(this.minigl, 'struct', {
        noiseFreq: new Uniform(this.minigl, 'vec2', [this.freqX, this.freqY]),
        noiseSpeed: new Uniform(this.minigl, 'float', 0.000005),
      }),
      u_vertDeform: new Uniform(
        this.minigl,
        'struct',
        {
          incline: new Uniform(
            this.minigl,
            'float',
            Math.sin(this.options.angle) / Math.cos(this.options.angle),
          ),
          offsetTop: new Uniform(this.minigl, 'float', -0.5),
          offsetBottom: new Uniform(this.minigl, 'float', -0.5),
          noiseFreq: new Uniform(this.minigl, 'vec2', [3, 4]),
          noiseAmp: new Uniform(this.minigl, 'float', this.options.amplitude),
          noiseSpeed: new Uniform(this.minigl, 'float', 10),
          noiseFlow: new Uniform(this.minigl, 'float', 3),
          noiseSeed: new Uniform(this.minigl, 'float', this.seed),
        },
        { excludeFrom: 'fragment' },
      ),
      u_baseColor: new Uniform(this.minigl, 'vec3', colors[0], { excludeFrom: 'fragment' }),
      u_waveLayers: new Uniform(this.minigl, 'array', [], { excludeFrom: 'fragment' }),
    };

    const waveLayers = this.uniforms.u_waveLayers.value as Uniform[];
    for (let index = 1; index < colors.length; index += 1) {
      waveLayers.push(
        new Uniform(this.minigl, 'struct', {
          color: new Uniform(this.minigl, 'vec3', colors[index]),
          noiseFreq: new Uniform(this.minigl, 'vec2', [
            2 + index / colors.length,
            3 + index / colors.length,
          ]),
          noiseSpeed: new Uniform(this.minigl, 'float', 11 + 0.3 * index),
          noiseFlow: new Uniform(this.minigl, 'float', 6.5 + 0.3 * index),
          noiseSeed: new Uniform(this.minigl, 'float', this.seed + 10 * index),
          noiseFloor: new Uniform(this.minigl, 'float', 0.1),
          noiseCeil: new Uniform(this.minigl, 'float', 0.63 + 0.07 * index),
        }),
      );
    }

    const vertexShader = [noiseGlsl, blendGlsl, vertexGlsl].join('\n\n');
    return new Material(this.minigl, vertexShader, fragmentGlsl, this.uniforms);
  }

  private animate = (timestamp: number) => {
    if (!this.playing || !this.minigl || !this.material) return;

    const shouldSkipFrame =
      (typeof document !== 'undefined' && document.hidden) ||
      !this.visible ||
      (this.lastFrame !== 0 && Math.floor(timestamp) % 2 === 0);

    if (!shouldSkipFrame && this.uniforms) {
      this.time += Math.min(timestamp - this.lastFrame, 1000 / 15);
      this.lastFrame = timestamp;
      this.uniforms.u_time.value = this.time;
      this.minigl.render();
    } else if (this.lastFrame === 0) {
      this.lastFrame = timestamp;
    }

    if (this.options.static && this.lastFrame !== 0) {
      this.minigl.render();
      this.disconnect();
      return;
    }

    if (this.visible) {
      this.animationFrameId = requestAnimationFrame(this.animate);
    }
  };
}

export { normalizeColor, hexToColorInt } from './normalize-color';
