// import type { DataType } from 'csstype';
import { Penmanship } from '~/pencil/Penmanship';
import { Shape } from '~/Shape';
import { Style } from '~/Style';

// penmanship
export class Pencil extends Shape {
  private addCanvasListener = (_e: MouseEvent) => {
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
      renderer.removeNativeEventListener('mousemove', write);
      renderer.removeNativeEventListener('mouseup', release);
      renderer.removeNativeEventListener('mouseout', release);
    };
    renderer.addNativeEventListener('mousemove', write);
    renderer.addNativeEventListener('mouseup', release);
    renderer.addNativeEventListener('mouseout', release);
  };
  override onRemoved(): void {
    this.renderer?.removeNativeEventListener(
      'mousedown',
      this.addCanvasListener,
    );
    super.onRemoved();
  }
  override onAppended(): void {
    this.renderer?.addNativeEventListener('mousedown', this.addCanvasListener);
    super.onAppended();
  }
  clear(): void {
    this.children.forEach((child) => child.onRemoved());
    this.children.length = 0;
    this.renderer?.render();
  }
  override drawPath(_ctx: CanvasRenderingContext2D, _style: Style): void {}
  override render(_ctx: CanvasRenderingContext2D): void {}
}
