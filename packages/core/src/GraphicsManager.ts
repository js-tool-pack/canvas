import { ListenerManager } from '~/ListenerManager';
import { Renderer } from '~/Renderer';
import { Graphics } from '~/Graphics';

export class GraphicsManager {
  private readonly graphicsList: Graphics[] = [];

  constructor(private readonly listenerManager: ListenerManager) {}

  add(element: Graphics, renderer: Renderer) {
    element.renderer = renderer;
    this.graphicsList.push(element);
    this.graphicsList.sort(
      (a, b) => (a.style?.zIndex || 0) - (b.style?.zIndex || 0),
    );
    element.onAppended();

    const listen = (el: Graphics): void => {
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
  remove(element: Graphics): void {
    const c = this.graphicsList;
    const index = c.findIndex((i) => i === element);
    if (index === -1) return;
    this.graphicsList.splice(index, 1);
    element.renderer = null;

    this.listenerManager.clearListenerOfGraphics(element);
  }
  render(ctx: CanvasRenderingContext2D): void {
    this.graphicsList.forEach((c) => c.renderAll(ctx));
  }
  clear(): void {
    this.graphicsList.length = 0;
  }
}
