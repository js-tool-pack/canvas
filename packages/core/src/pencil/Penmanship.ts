import type { Point } from '@tool-pack/types';
import { Graphics } from '~/Graphics';
import type { Style } from '~/Style';

/**
 * 笔迹类，用于记录笔的颜色大小以及划过的路线
 */
export class Penmanship extends Graphics {
  private points: Point[] = [];

  override drawPath(ctx: CanvasRenderingContext2D, _style: Style): void {
    const points = this.points;
    if (!points.length) return;

    ctx.beginPath();
    const start = points[0]!;
    ctx.moveTo(start[0], start[1]);
    points.forEach((p) => {
      ctx.lineTo(p[0], p[1]);
    });
    // ctx.closePath();
  }
  override render(ctx: CanvasRenderingContext2D): void {
    const { computedStyle: style } = this;
    this.drawPath(ctx, style);
    ctx.strokeStyle = style.color || 'black';
    ctx.lineWidth = style.width;
    ctx.stroke();
  }
  write(point: Point): void {
    this.points.push(point);
  }
}
