import type { MiniGL } from './mini-gl';
import { Uniform } from './uniform';

export class Material {
  gl: MiniGL;
  uniforms: Record<string, Uniform>;
  program: WebGLProgram;
  uniformInstances: Array<{ uniform: Uniform; location: WebGLUniformLocation | null }> = [];

  constructor(
    minigl: MiniGL,
    vertexShaderSource: string,
    fragmentShaderSource: string,
    uniforms: Record<string, Uniform> = {},
  ) {
    this.gl = minigl;
    this.uniforms = uniforms;

    const context = minigl.getContext();
    const prefix = 'precision highp float;';

    const vertexSource = `
${prefix}
attribute vec4 position;
attribute vec2 uv;
attribute vec2 uvNorm;
${this.getUniformDeclarations(minigl.commonUniforms, 'vertex')}
${this.getUniformDeclarations(uniforms, 'vertex')}
${vertexShaderSource}
`;

    const fragmentSource = `
${prefix}
${this.getUniformDeclarations(minigl.commonUniforms, 'fragment')}
${this.getUniformDeclarations(uniforms, 'fragment')}
${fragmentShaderSource}
`;

    const vertexShader = this.compileShader(context.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.compileShader(context.FRAGMENT_SHADER, fragmentSource);
    const program = context.createProgram();
    if (!program) throw new Error('Unable to create WebGL program.');

    context.attachShader(program, vertexShader);
    context.attachShader(program, fragmentShader);
    context.linkProgram(program);

    if (!context.getProgramParameter(program, context.LINK_STATUS)) {
      throw new Error(context.getProgramInfoLog(program) ?? 'WebGL program link failed.');
    }

    this.program = program;
    context.useProgram(program);
    this.attachUniforms(undefined, minigl.commonUniforms);
    this.attachUniforms(undefined, uniforms);
  }

  private compileShader(type: number, source: string): WebGLShader {
    const context = this.gl.getContext();
    const shader = context.createShader(type);
    if (!shader) throw new Error('Unable to create shader.');

    context.shaderSource(shader, source);
    context.compileShader(shader);

    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
      throw new Error(context.getShaderInfoLog(shader) ?? 'Shader compilation failed.');
    }

    return shader;
  }

  private getUniformDeclarations(
    uniforms: Record<string, Uniform>,
    shaderType: 'vertex' | 'fragment',
  ): string {
    return Object.entries(uniforms)
      .map(([name, uniform]) => uniform.getDeclaration(name, shaderType))
      .filter(Boolean)
      .join('\n');
  }

  private attachUniforms(name: string | undefined, uniforms: Record<string, Uniform> | Uniform): void {
    if (!name) {
      Object.entries(uniforms as Record<string, Uniform>).forEach(([uniformName, uniform]) => {
        this.attachUniforms(uniformName, uniform);
      });
      return;
    }

    const uniform = uniforms as Uniform;
    if (uniform.type === 'array' && Array.isArray(uniform.value)) {
      (uniform.value as Uniform[]).forEach((entry, index) => {
        this.attachUniforms(`${name}[${index}]`, entry);
      });
      return;
    }

    if (uniform.type === 'struct' && uniform.value && typeof uniform.value === 'object') {
      Object.entries(uniform.value as Record<string, Uniform>).forEach(([key, entry]) => {
        this.attachUniforms(`${name}.${key}`, entry);
      });
      return;
    }

    this.uniformInstances.push({
      uniform,
      location: this.gl.getContext().getUniformLocation(this.program, name),
    });
  }
}
