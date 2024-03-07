// import type { DataType } from 'csstype';
import { Penmanship } from '~/pencil/Penmanship';
import { Shape } from '~/Shape';
import { Style } from '~/Style';

// penmanship
export class Pencil extends Shape {
  private addCanvasListener = (_e: MouseEvent): void => {
    const { renderer } = this;
    if (!renderer) return;

    const style = this.computedStyle;
    const pms = new Penmanship({
      height: style.height,
      color: style.color,
      width: style.width,
    });
    this.appendChild(pms);

    const write = (e: MouseEvent) => {
      pms.write([e.offsetX, e.offsetY]);
      renderer.render();
    };
    const release = () => {
      renderer.canvasOff('mousemove', write);
      renderer.canvasOff('mouseup', release);
      renderer.canvasOff('mouseout', release);
    };
    renderer.canvasOn('mousemove', write);
    renderer.canvasOn('mouseup', release);
    renderer.canvasOn('mouseout', release);
  };
  clear(): void {
    this.children.forEach((child) => child.onRemoved());
    this.children.length = 0;
    this.renderer?.render();
  }
  override onAppended(): void {
    this.renderer?.canvasOn('mousedown', this.addCanvasListener);
    super.onAppended();
  }
  override onRemoved(): void {
    this.renderer?.canvasOff('mousedown', this.addCanvasListener);
    super.onRemoved();
  }
  override drawPath(_ctx: CanvasRenderingContext2D, _style: Style): void {}
  override render(_ctx: CanvasRenderingContext2D): void {}
}
