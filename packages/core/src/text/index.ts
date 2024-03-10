import { getStringLen } from '@tool-pack/basic';
import { Rectangle } from '~/rectangle';

type SplitContentItem = { content: string; y: number };
export class Text extends Rectangle {
  splitContent: SplitContentItem[] = [];
  content = '';

  private measureText(): void {
    const r = this.renderer;
    if (!r) return;
    const ctx = r.offScreenCTX;

    const {
      borderWidth = 0,
      fontSize = 12,
      lineHeight = fontSize,
      top = 0,
    } = this.computedStyle;
    const bw = borderWidth * 2;

    this.setCtxAttrs(ctx);

    const offsetY = (lineHeight - fontSize) / 2;
    const totalWidth = ctx.measureText(this.content).width;
    const len = getStringLen(this.content);
    const wordWidth = ~~(totalWidth / len);
    const width =
      (this.parent?.computedStyle.width || this.renderer?.width || 0) - bw;
    const lineLen = ~~(width / wordWidth);
    const [list, maxWidth] = _splitContent(this.content);
    this.splitContent = list;
    this.computedStyle.width = maxWidth + borderWidth;
    this.computedStyle.height =
      (list.at(-1)?.y || 0) + fontSize + offsetY + borderWidth - top;

    function _splitContent(
      content: string,
    ): [plitContent: SplitContentItem[], maxWidth: number] {
      let prev: { content: string; y: number }[] | null = null;
      let maxWidth = 0;
      return [
        content
          .split('\n')
          .map((c) => {
            const [list, _maxWidth] = split(
              splitString(c),
              prev && prev.length
                ? (prev.at(-1)?.y || 0) + fontSize + offsetY
                : top + offsetY + borderWidth,
            );
            maxWidth = Math.max(_maxWidth, maxWidth);
            return (prev = list);
          })
          .flat(),
        maxWidth,
      ];

      function split(
        content: string[],
        top: number,
      ): ReturnType<typeof _splitContent> {
        const splitContent: SplitContentItem[] = [];
        let y = top;
        let _maxWidth = 0;
        const len = content.length;
        for (let i = 0; i < len; ) {
          const [end, width] = measure(content, i, Math.min(i + lineLen, len));
          splitContent.push({ content: content.slice(i, end).join(''), y });
          y += fontSize + offsetY;
          _maxWidth = Math.max(_maxWidth, width);
          i = end;
        }
        return [splitContent, _maxWidth] as const;
      }
    }
    function measure(
      content: string[],
      start: number,
      end: number,
    ): [end: number, width: number] {
      let isLess = false;
      let w = 0;
      while (start < end && end <= content.length) {
        const chunk = content.slice(start, end).join('');
        const prevW = w;
        ({ width: w } = ctx.measureText(chunk));
        if (w <= width) {
          if (isLess) break;
          end++;
          isLess = true;
        } else {
          end--;
          if (isLess) {
            w = prevW;
            break;
          }
          isLess = false;
        }
      }
      return [end, w];
    }
    // 合成表情符号如果用 split 会拆散，必须处理才能正确分割
    function splitString(value: string): string[] {
      const segment = new Intl.Segmenter('fr', {
        granularity: 'grapheme',
      });
      return Array.from(segment.segment(value)).map((v) => v.segment);
    }
  }
  private setCtxAttrs(ctx: CanvasRenderingContext2D): void {
    const {
      letterSpacing = ctx.letterSpacing,
      textAlign = ctx.textAlign,
      fontFamily = 'system-ui',
      fontWeight = 'normal',
      textBaseline = 'top',
      fontSize = 12,
    } = this.computedStyle;

    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.letterSpacing = letterSpacing;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
  }

  private renderText(ctx: CanvasRenderingContext2D): void {
    const { color = 'black', borderWidth = 0, left = 0 } = this.computedStyle;
    this.setCtxAttrs(ctx);
    ctx.fillStyle = color;
    const x = left + borderWidth;
    this.splitContent.forEach(({ content, y }) => ctx.fillText(content, x, y));
  }
  override render(ctx: CanvasRenderingContext2D): void {
    // 不需要每次渲染都从新计算位置
    // this.measureText(ctx);
    const cloneStyle = Object.assign({}, this.computedStyle);
    const { left = 0, width } = cloneStyle;
    if (cloneStyle.textAlign === 'center') {
      cloneStyle.left = left - width / 2;
    } else if (cloneStyle.textAlign === 'right') {
      cloneStyle.left = left - width;
    }
    this.renderBackground(ctx, cloneStyle);
    this.renderText(ctx);
    this.renderBorder(ctx, cloneStyle);
  }
  override handleStyle() {
    super.handleStyle();
    this.measureText();
  }
}
