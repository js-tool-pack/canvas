import { Renderer } from './Renderer';
import { Style } from './Style';

type ListenerCB = (
  this: any,
  ev: HTMLElementEventMap[keyof GlobalEventHandlersEventMap],
) => void;

export abstract class Graphics {
  listener: Partial<Record<keyof GlobalEventHandlersEventMap, ListenerCB[]>> =
    {};
  renderer: Renderer | null = null;
  parent: Graphics | null = null;
  children: Graphics[] = [];
  computedStyle!: Style;

  constructor(public style: Partial<Style> = {}) {
    this.style = new Proxy(style, {
      set: (obj, prop, value) => {
        (obj as any)[prop] = value;
        this.handleStyle();
        this.renderer?.render();
        return true;
      },
      get(obj: Style, prop: keyof Style) {
        return obj[prop];
      },
    });
    this.handleStyle();
  }

  addEventListener<K extends keyof GlobalEventHandlersEventMap>(
    type: K,
    callback: (this: this, ev: HTMLElementEventMap[K]) => void,
  ): void {
    const list: Array<ListenerCB> = this.listener[type] || [];
    list.push(callback as ListenerCB);
    this.listener[type] = list;
    this.renderer?.on(type, this);
  }

  appendChild(child: Graphics): void {
    if (this.children.includes(child)) return;
    this.children.push(child);
    child.renderer = this.renderer;
    child.parent = this;
    this.handleStyle();
    this.children.sort(
      (a, b) => a.computedStyle.zIndex - b.computedStyle.zIndex,
    );
  }
  handleStyle(): void {
    this.computedStyle = Object.assign(
      {
        position: 'static',
        borderRadius: 0,
        zIndex: 0,
        height: 0,
        width: 0,
      } as Style,
      this.style,
    );
    this.children.forEach((child) => child.handleStyle());
  }
  removeChild(child: Graphics): void {
    const children = this.children;
    const index = children.findIndex((i) => i === child);
    if (index === -1) return;
    this.children.splice(index, 1);
    child.onRemoved();
    child.renderer = null;
    child.parent = null;
  }
  removeEventListener(
    type: keyof GlobalEventHandlersEventMap,
    callback: (this: this) => void,
  ): void {
    const list = this.listener[type] || [];
    const index = list.indexOf(callback);
    list.splice(index, 1);
    this.renderer?.off(type, this);
  }
  isHit(ctx: CanvasRenderingContext2D, event: Event): boolean {
    const x = (event as MouseEvent).offsetX || 0;
    const y = (event as MouseEvent).offsetY || 0;
    this.drawPath(ctx, this.computedStyle);
    return ctx.isPointInPath(x, y);
  }
  renderAll(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    this.render(ctx);
    ctx.restore();
    this.children.forEach((child) => {
      ctx.save();
      child.render(ctx);
      ctx.restore();
    });
  }
  onAppended(): void {
    this.children.forEach((child) => child.onAppended());
  }
  onRemoved(): void {
    this.children.forEach((child) => child.onRemoved());
  }
  append(parent: Graphics): void {
    parent.appendChild(this);
  }
  remove() {
    this.parent?.removeChild(this);
  }
  abstract drawPath(ctx: CanvasRenderingContext2D, style: Style): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
}
