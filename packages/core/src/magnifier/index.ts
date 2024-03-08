import { Graphics } from '~/Graphics';
import { Style } from '~/Style';

export class Magnifier extends Graphics {
  constructor(
    public scale = 2,
    style: Partial<Style> = {},
  ) {
    style.zIndex ||= 100;
    style.width ||= 100;
    super(style);
  }
  drawMagnifier(ctx: CanvasRenderingContext2D): void {
    const canvas = this.renderer?.offScreenCanvas;
    if (!canvas) return;

    const {
      borderColor = 'white',
      borderWidth = 5,
      left = 0,
      top = 0,
      width,
    } = this.computedStyle;
    const { scale } = this;
    const r = (width - borderWidth) / 2;

    ctx.beginPath();
    ctx.arc(left, top, r, 0, 2 * Math.PI);
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.stroke();
    ctx.clip();

    const size = 2 * r;
    const scaledSize = size * scale;
    const x = left - r;
    const y = top - r;
    const offset = (scaledSize - size) / 2;
    ctx.drawImage(
      canvas,
      // 从源图截取
      x,
      y,
      size,
      size,
      // 画于画布
      x - offset,
      y - offset,
      scaledSize,
      scaledSize,
    );
  }
  override render(ctx: CanvasRenderingContext2D): void {
    this.drawMagnifier(ctx);
  }

  override drawPath(_ctx: CanvasRenderingContext2D, _style: Style): void {}
}
