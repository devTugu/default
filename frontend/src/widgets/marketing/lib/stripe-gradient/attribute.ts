import type { MiniGL } from './mini-gl';

interface AttributeOptions {
  target: number;
  size: number;
  type?: number;
  normalized?: boolean;
  values?: Float32Array | Uint16Array;
}

export class Attribute {
  gl: MiniGL;
  target: number;
  size: number;
  type: number;
  normalized: boolean;
  values?: Float32Array | Uint16Array;
  buffer: WebGLBuffer | null;

  constructor(gl: MiniGL, options: AttributeOptions) {
    this.gl = gl;
    this.target = options.target;
    this.size = options.size;
    this.type = options.type ?? gl.getContext().FLOAT;
    this.normalized = options.normalized ?? false;
    this.values = options.values;
    this.buffer = gl.getContext().createBuffer();
    this.update();
  }

  update(): void {
    if (!this.values || !this.buffer) return;
    const context = this.gl.getContext();
    context.bindBuffer(this.target, this.buffer);
    context.bufferData(this.target, this.values, context.STATIC_DRAW);
  }

  attach(name: string, program: WebGLProgram): number {
    const context = this.gl.getContext();
    const location = context.getAttribLocation(program, name);
    if (this.target === context.ARRAY_BUFFER) {
      context.enableVertexAttribArray(location);
      context.vertexAttribPointer(location, this.size, this.type, this.normalized, 0, 0);
    }
    return location;
  }

  use(location: number): void {
    const context = this.gl.getContext();
    if (!this.buffer) return;
    context.bindBuffer(this.target, this.buffer);
    if (this.target === context.ARRAY_BUFFER) {
      context.enableVertexAttribArray(location);
      context.vertexAttribPointer(location, this.size, this.type, this.normalized, 0, 0);
    }
  }
}
