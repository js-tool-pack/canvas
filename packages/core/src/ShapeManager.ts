import { ListenerManager } from '~/ListenerManager';
import { Renderer } from '~/Renderer';
import { Shape } from '~/Shape';

export class ShapeManager {
  private readonly shapes: Shape[] = [];

  constructor(private readonly listenerManager: ListenerManager) {}

  add(element: Shape, renderer: Renderer) {
    element.renderer = renderer;
    this.shapes.push(element);
    this.shapes.sort((a, b) => a.computedStyle.zIndex - b.computedStyle.zIndex);
    element.onAppended();

    const listen = (el: Shape): void => {
      for (const type in el.listener) {
        this.listenerManager.addEventListener(
          type as keyof GlobalEventHandlersEventMap,
          el,
        );
      }
      el.children.forEach(listen);
    };
    listen(element);
  }
  remove(element: Shape): void {
    const c = this.shapes;
    const index = c.findIndex((i) => i === element);
    if (index === -1) return;
    this.shapes.splice(index, 1);
    element.renderer = null;

    this.listenerManager.clearListenerOfShape(element);
  }
  render(ctx: CanvasRenderingContext2D): void {
    this.shapes.forEach((c) => c.renderAll(ctx));
  }
  clear(): void {
    this.shapes.length = 0;
  }
}
