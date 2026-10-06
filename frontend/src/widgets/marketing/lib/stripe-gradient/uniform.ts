import type { MiniGL } from './mini-gl';

type UniformType = 'float' | 'int' | 'vec2' | 'vec3' | 'vec4' | 'mat4' | 'array' | 'struct';

interface UniformExtra {
  excludeFrom?: 'vertex' | 'fragment';
  transpose?: boolean;
}

export class Uniform {
  gl: MiniGL;
  type: UniformType;
  value: unknown;
  typeFn: string;
  excludeFrom?: 'vertex' | 'fragment';
  transpose?: boolean;

  private static readonly typeMap: Record<string, string> = {
    float: '1f',
    int: '1i',
    vec2: '2fv',
    vec3: '3fv',
    vec4: '4fv',
    mat4: 'Matrix4fv',
  };

  constructor(gl: MiniGL, type: UniformType, value: unknown, extra: UniformExtra = {}) {
    this.gl = gl;
    this.type = type;
    this.value = value;
    this.excludeFrom = extra.excludeFrom;
    this.transpose = extra.transpose;
    this.typeFn = Uniform.typeMap[type] ?? Uniform.typeMap.float;
  }

  update(location: WebGLUniformLocation | null): void {
    if (!location || this.value === undefined || this.value === null) return;

    const context = this.gl.getContext();
    const fn = `uniform${this.typeFn}` as keyof WebGLRenderingContext;
    const upload = context[fn] as (...args: unknown[]) => void;

    if (this.typeFn.indexOf('Matrix') === 0) {
      upload.call(context, location, this.transpose ?? false, this.value);
      return;
    }

    upload.call(context, location, this.value);
  }

  getDeclaration(name: string, shaderType: 'vertex' | 'fragment', length = 0): string {
    if (this.excludeFrom === shaderType) return '';

    if (this.type === 'array' && Array.isArray(this.value)) {
      const first = this.value[0] as Uniform;
      return `${first.getDeclaration(name, shaderType, this.value.length)}
const int ${name}_length = ${this.value.length};`;
    }

    if (this.type === 'struct' && this.value && typeof this.value === 'object') {
      let prefix = name.replace('u_', '');
      prefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      const body = Object.entries(this.value as Record<string, Uniform>)
        .map(([key, uniform]) => uniform.getDeclaration(key, shaderType).replace(/^uniform\s*/, ''))
        .join('');
      return `uniform struct ${prefix} {
  ${body}
} ${name}${length > 0 ? `[${length}]` : ''};`;
    }

    const suffix = length > 0 ? `[${length}]` : '';
    return `uniform ${this.type} ${name}${suffix};`;
  }
}
