import { Shape } from '~/Shape';

type EventType = keyof GlobalEventHandlersEventMap;

export class ListenerManager {
  private readonly listeningMap: Partial<
    Record<EventType, (e: Event) => void>
  > = {};
  private readonly listeningShapeMap: Partial<Record<EventType, Array<Shape>>> =
    {};
  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: CanvasRenderingContext2D,
  ) {}

  private callListenerCallback(type: EventType, shape: Shape, ev: Event): void {
    shape.listener[type]?.forEach((callback) => {
      callback.call(shape, ev);
    });
  }
  /**
   * 模拟鼠标事件
   */
  simulateMouseEvents(): void {
    const enterSet = new Set<Shape>();
    const { listeningShapeMap, ctx: offScreenCTX } = this;

    const simulateMouseLeaveEvents = (e: Event): void => {
      (listeningShapeMap.mouseleave || []).forEach((el) => {
        if (enterSet.has(el) && !el.isHit(offScreenCTX, e)) {
          this.callListenerCallback('mouseleave', el, e);
          enterSet.delete(el);
        }
      });
    };

    this.listeningMap.mousemove = (e) => {
      // 模拟dom 鼠标移入事件
      (listeningShapeMap.mouseenter || []).forEach((el) => {
        if (!enterSet.has(el) && el.isHit(offScreenCTX, e)) {
          this.callListenerCallback('mouseenter', el, e);
          enterSet.add(el);
        }
      });
      // 鼠标移入事件
      (listeningShapeMap.mousemove || []).forEach((el) => {
        if (enterSet.has(el) && el.isHit(offScreenCTX, e)) {
          this.callListenerCallback('mousemove', el, e);
        }
      });
      // 模拟dom 鼠标移出事件
      simulateMouseLeaveEvents(e);
    };
    this.canvas.addEventListener('mousemove', this.listeningMap.mousemove);

    // 有时候移动太快了会漏掉 mouseleave
    this.listeningMap.mouseleave = simulateMouseLeaveEvents;
    this.canvas.addEventListener('mouseleave', this.listeningMap.mouseleave);
  }
  addEventListener(type: EventType, el: Shape): void {
    const { listeningShapeMap, ctx: offScreenCTX, listeningMap } = this;

    const lisEls = listeningShapeMap[type] || [];
    if (lisEls.includes(el)) return;
    lisEls.push(el);

    listeningShapeMap[type] = lisEls;
    if (
      listeningMap[type] ||
      (['mouseenter', 'mousemove', 'mouseleave'] as EventType[]).includes(type)
    )
      return;

    const handler = (e: Event) => {
      lisEls.forEach((el) => {
        if (el.isHit(offScreenCTX, e)) {
          this.callListenerCallback(type, el, e);
        }
      });
    };
    listeningMap[type] = handler;
    this.canvas.addEventListener(type, handler);
  }
  removeEventListener(type: EventType, el: Shape): void {
    const { listeningShapeMap, listeningMap } = this;

    const obj = listeningMap[type];
    if (!obj) return;

    const listeners = listeningShapeMap[type] || [];
    const index = listeners.indexOf(el);
    if (index === -1) return;

    listeners.splice(index, 1);
    if (listeners.length !== 0) return;

    this.canvas.removeEventListener(type, listeningMap[type]!);
    delete listeningMap[type];
  }
  clearListenerOfShape(shape: Shape): void {
    for (const type in shape.listener) {
      this.removeEventListener(
        type as keyof GlobalEventHandlersEventMap,
        shape,
      );
    }
    shape.children.forEach((e) => {
      this.clearListenerOfShape(e);
    });
  }
  clearAll() {
    const map = this.listeningMap;
    for (const type in map) {
      this.canvas.removeEventListener(type, map[type as keyof typeof map]!);
    }
  }
}
