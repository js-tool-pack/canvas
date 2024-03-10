import { Graphics } from '~/Graphics';
import { Style } from '~/Style';

export class Rectangle extends Graphics {
  override drawPath(ctx: CanvasRenderingContext2D, style: Style): void {
    let {
      borderRadius: r = 0,
      left: x = 0,
      top: y = 0,
      height: h,
      width: w,
    } = style;
    ctx.beginPath();
    // ctx.rect(x, y, w, h);

    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();

    // ctx.moveTo(x + r, y);
    // ctx.arcTo(x + w, y, x + w, y + h, r);
    // ctx.arcTo(x + w, y + h, x, y + h, r);
    // ctx.arcTo(x, y + h, x, y, r);
    // ctx.arcTo(x, y, x + w, y, r);

    ctx.roundRect(x, y, w, h, r);
    ctx.closePath();
  }
  protected drawPathWithoutBorder(
    ctx: CanvasRenderingContext2D,
    style = this.computedStyle,
  ): void {
    const bw = style.borderWidth || 0;
    this.drawPath(ctx, {
      ...style,
      left: (style.left || 0) + bw / 2,
      top: (style.top || 0) + bw / 2,
      height: style.height - bw,
      width: style.width - bw,
    });
  }
  protected renderBorder(
    ctx: CanvasRenderingContext2D,
    style = this.computedStyle,
  ): void {
    if (!style.borderWidth) return;

    this.drawPathWithoutBorder(ctx, style);

    ctx.lineWidth = style.borderWidth || 0;
    ctx.strokeStyle = style.borderColor || 'black';

    ctx.stroke();
  }
  protected renderBackground(
    ctx: CanvasRenderingContext2D,
    style = this.computedStyle,
  ): void {
    if (!style.backgroundColor) return;

    ctx.fillStyle = style.backgroundColor;
    // this.drawPath(ctx, style);
    this.drawPathWithoutBorder(ctx, style);
    ctx.fill();
  }
  override render(ctx: CanvasRenderingContext2D): void {
    this.renderBackground(ctx);
    this.renderBorder(ctx);
  }
}
