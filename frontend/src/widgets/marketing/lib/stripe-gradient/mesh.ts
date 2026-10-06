import type { PlaneGeometry } from './plane-geometry';
import type { Material } from './material';
import type { MiniGL } from './mini-gl';

export class Mesh {
  gl: MiniGL;
  geometry: PlaneGeometry;
  material: Material;
  wireframe = false;

  private attributeInstances: Array<{ attribute: import('./attribute').Attribute; location: number }>;

  constructor(minigl: MiniGL, geometry: PlaneGeometry, material: Material) {
    this.gl = minigl;
    this.geometry = geometry;
    this.material = material;

    this.attributeInstances = Object.entries(this.geometry.attributes).map(([name, attribute]) => ({
      attribute,
      location: attribute.attach(name, this.material.program),
    }));

    this.gl.meshes.push(this);
  }

  draw(): void {
    const context = this.gl.getContext();
    context.useProgram(this.material.program);

    this.material.uniformInstances.forEach(({ uniform, location }) => {
      uniform.update(location);
    });

    this.attributeInstances.forEach(({ attribute, location }) => {
      attribute.use(location);
    });

    const indexCount = this.geometry.attributes.index.values?.length ?? 0;
    const mode = this.wireframe ? context.LINES : context.TRIANGLES;
    context.drawElements(mode, indexCount, context.UNSIGNED_SHORT, 0);
  }

  remove(): void {
    this.gl.meshes = this.gl.meshes.filter((mesh) => mesh !== this);
  }
}
