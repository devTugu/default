import { Uniform } from './uniform';

export class MiniGL {
  commonUniforms: {
    projectionMatrix: Uniform;
    modelViewMatrix: Uniform;
    resolution: Uniform;
    aspectRatio: Uniform;
  };

  meshes: import('./mesh').Mesh[] = [];

  private canvas: HTMLCanvasElement;
  private context: WebGLRenderingContext;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.canvas = canvas;
    const context = canvas.getContext('webgl', { antialias: true, alpha: true });
    if (!context) {
      throw new Error('WebGL is not supported in this browser.');
    }
    this.context = context;

    const matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    this.commonUniforms = {
      projectionMatrix: new Uniform(this, 'mat4', matrix),
      modelViewMatrix: new Uniform(this, 'mat4', matrix),
      resolution: new Uniform(this, 'vec2', [1, 1]),
      aspectRatio: new Uniform(this, 'float', 1),
    };

    this.setSize(width, height);
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  getContext(): WebGLRenderingContext {
    return this.context;
  }

  setSize(width = 640, height = 480): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.context.viewport(0, 0, width, height);
    this.commonUniforms.resolution.value = [width, height];
    this.commonUniforms.aspectRatio.value = width / height;
  }

  setOrthographicCamera(
    left = 0,
    right = 0,
    top = 0,
    bottom = -2000,
    distance = 2000,
  ): void {
    this.commonUniforms.projectionMatrix.value = [
      2 / this.canvas.width,
      0,
      0,
      0,
      0,
      2 / this.canvas.height,
      0,
      0,
      0,
      0,
      2 / (bottom - distance),
      0,
      left,
      right,
      top,
      1,
    ];
  }

  render(): void {
    const context = this.context;
    context.clearColor(0, 0, 0, 0);
    context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    context.enable(context.BLEND);
    context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);
    this.meshes.forEach((mesh) => mesh.draw());
  }
}
