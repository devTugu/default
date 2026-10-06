import { Attribute } from './attribute';
import type { MiniGL } from './mini-gl';

export class PlaneGeometry {
  gl: MiniGL;
  attributes: {
    position: Attribute;
    uv: Attribute;
    uvNorm: Attribute;
    index: Attribute;
  };

  xSegCount = 1;
  ySegCount = 1;
  vertexCount = 4;
  quadCount = 2;
  width = 1;
  height = 1;
  orientation = 'xz';

  constructor(minigl: MiniGL) {
    this.gl = minigl;
    const context = minigl.getContext();
    context.createBuffer();

    this.attributes = {
      position: new Attribute(minigl, { target: context.ARRAY_BUFFER, size: 3 }),
      uv: new Attribute(minigl, { target: context.ARRAY_BUFFER, size: 2 }),
      uvNorm: new Attribute(minigl, { target: context.ARRAY_BUFFER, size: 2 }),
      index: new Attribute(minigl, {
        target: context.ELEMENT_ARRAY_BUFFER,
        size: 3,
        type: context.UNSIGNED_SHORT,
      }),
    };
  }

  setTopology(xSegments = 1, ySegments = 1): void {
    this.xSegCount = xSegments;
    this.ySegCount = ySegments;
    this.vertexCount = (this.xSegCount + 1) * (this.ySegCount + 1);
    this.quadCount = this.xSegCount * this.ySegCount * 2;

    this.attributes.uv.values = new Float32Array(2 * this.vertexCount);
    this.attributes.uvNorm.values = new Float32Array(2 * this.vertexCount);
    this.attributes.index.values = new Uint16Array(3 * this.quadCount);

    for (let y = 0; y <= this.ySegCount; y++) {
      for (let x = 0; x <= this.xSegCount; x++) {
        const index = y * (this.xSegCount + 1) + x;
        this.attributes.uv.values[2 * index] = x / this.xSegCount;
        this.attributes.uv.values[2 * index + 1] = 1 - y / this.ySegCount;
        this.attributes.uvNorm.values[2 * index] = (x / this.xSegCount) * 2 - 1;
        this.attributes.uvNorm.values[2 * index + 1] = 1 - (y / this.ySegCount) * 2;

        if (x < this.xSegCount && y < this.ySegCount) {
          const quad = y * this.xSegCount + x;
          this.attributes.index.values[6 * quad] = index;
          this.attributes.index.values[6 * quad + 1] = index + 1 + this.xSegCount;
          this.attributes.index.values[6 * quad + 2] = index + 1;
          this.attributes.index.values[6 * quad + 3] = index + 1;
          this.attributes.index.values[6 * quad + 4] = index + 1 + this.xSegCount;
          this.attributes.index.values[6 * quad + 5] = index + 2 + this.xSegCount;
        }
      }
    }

    this.attributes.uv.update();
    this.attributes.uvNorm.update();
    this.attributes.index.update();
  }

  setSize(width = 1, height = 1, orientation = 'xz'): void {
    this.width = width;
    this.height = height;
    this.orientation = orientation;

    if (!this.attributes.position.values || this.attributes.position.values.length !== 3 * this.vertexCount) {
      this.attributes.position.values = new Float32Array(3 * this.vertexCount);
    }

    const originX = width / -2;
    const originY = height / -2;
    const segmentWidth = width / this.xSegCount;
    const segmentHeight = height / this.ySegCount;

    for (let y = 0; y <= this.ySegCount; y++) {
      const posY = originY + y * segmentHeight;
      for (let x = 0; x <= this.xSegCount; x++) {
        const posX = originX + x * segmentWidth;
        const vertex = y * (this.xSegCount + 1) + x;
        this.attributes.position.values[3 * vertex + 'xyz'.indexOf(orientation[0])] = posX;
        this.attributes.position.values[3 * vertex + 'xyz'.indexOf(orientation[1])] = -posY;
      }
    }

    this.attributes.position.update();
  }
}
