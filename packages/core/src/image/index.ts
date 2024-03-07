import { Rectangle } from '~/rectangle';
import { Style } from '~/Style';

export class Image extends Rectangle {
  private img!: HTMLImageElement;
  private _src!: string;
  crossOrigin: string | null = null;

  constructor(src?: string, style?: Partial<Style>) {
    super(style);
    if (src) this._src = src;
    this.createImgElement();
  }

  private drawImg(ctx: CanvasRenderingContext2D): void {
    const pattern = ctx.createPattern(this.img, 'no-repeat');
    const { left = 0, top = 0, height, width } = this.computedStyle;
    const { naturalHeight, naturalWidth } = this.img;

    this.drawPathWithoutBorder(ctx);
    if (pattern) {
      // 注意：translate 和 scale 的先后顺序会影响实际位置，必须先移动再缩放
      const matrix = new DOMMatrix()
        .translate(left, top)
        .scale(width / naturalWidth, height / naturalHeight);

      pattern.setTransform(matrix);
      ctx.fillStyle = pattern;
      ctx.fill();
    }
  }

  private createImgElement(): void {
    const img = (this.img = document.createElement('img'));
    img.crossOrigin = this.crossOrigin;
    img.onload = () => {
      this.computedStyle.width ||= img.width;
      this.computedStyle.height ||= img.height;
      this.update();
    };
    img.onerror = img.oncancel = (): void => {
      console.error(`'${this._src}' load fail`);
    };
    img.src = this._src;
  }
  override render(ctx: CanvasRenderingContext2D): void {
    // super.render(ctx);
    this.renderBackground(ctx);
    this.drawImg(ctx);
    this.renderBorder(ctx);
  }
  set src(src: string) {
    this._src = src;
    this.img.src = src;
  }
  get src(): string {
    return this._src;
  }
}
