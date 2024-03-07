import { Graphics } from '~/Graphics';

type EventType = keyof GlobalEventHandlersEventMap;

export class ListenerManager {
  private readonly eventGraphicsMap: Partial<
    Record<EventType, Array<Graphics>>
  > = {};
  private readonly eventMap: Partial<Record<EventType, (e: Event) => void>> =
    {};
  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: CanvasRenderingContext2D,
  ) {}

  private callListenerCallback(
    type: EventType,
    graphics: Graphics,
    ev: Event,
  ): void {
    graphics.listener[type]?.forEach((callback) => {
      callback.call(graphics, ev);
    });
  }
  /**
   * 模拟鼠标事件
   */
  simulateMouseEvents(): void {
    const enterSet = new Set<Graphics>();
    const { ctx: offScreenCTX, eventGraphicsMap } = this;

    const simulateMouseLeaveEvents = (e: Event): void => {
      (eventGraphicsMap.mouseleave || []).forEach((el) => {
        if (enterSet.has(el) && !el.isHit(offScreenCTX, e)) {
          this.callListenerCallback('mouseleave', el, e);
          enterSet.delete(el);
        }
      });
    };

    this.eventMap.mousemove = (e) => {
      // 模拟dom 鼠标移入事件
      (eventGraphicsMap.mouseenter || []).forEach((el) => {
        if (!enterSet.has(el) && el.isHit(offScreenCTX, e)) {
          this.callListenerCallback('mouseenter', el, e);
          enterSet.add(el);
        }
      });
      // 鼠标移入事件
      (eventGraphicsMap.mousemove || []).forEach((el) => {
        if (enterSet.has(el) && el.isHit(offScreenCTX, e)) {
          this.callListenerCallback('mousemove', el, e);
        }
      });
      // 模拟dom 鼠标移出事件
      simulateMouseLeaveEvents(e);
    };
    this.canvas.addEventListener('mousemove', this.eventMap.mousemove);

    // 有时候移动太快了会漏掉 mouseleave
    this.eventMap.mouseleave = simulateMouseLeaveEvents;
    this.canvas.addEventListener('mouseleave', this.eventMap.mouseleave);
  }
  addEventListener(type: EventType, el: Graphics): void {
    const { ctx: offScreenCTX, eventGraphicsMap, eventMap } = this;

    const lisEls = eventGraphicsMap[type] || [];
    if (lisEls.includes(el)) return;
    lisEls.push(el);

    eventGraphicsMap[type] = lisEls;
    if (
      eventMap[type] ||
      (['mouseenter', 'mousemove', 'mouseleave'] as EventType[]).includes(type)
    )
      return;

    const handler = (e: Event): void => {
      lisEls.forEach((el) => {
        if (el.isHit(offScreenCTX, e)) {
          this.callListenerCallback(type, el, e);
        }
      });
    };
    eventMap[type] = handler;
    this.canvas.addEventListener(type, handler);
  }
  removeEventListener(type: EventType, el: Graphics): void {
    const { eventGraphicsMap, eventMap } = this;

    const obj = eventMap[type];
    if (!obj) return;

    const listeners = eventGraphicsMap[type] || [];
    const index = listeners.indexOf(el);
    if (index === -1) return;

    listeners.splice(index, 1);
    if (listeners.length !== 0) return;

    this.canvas.removeEventListener(type, eventMap[type]!);
    delete eventMap[type];
  }
  clearListenerOfGraphics(graphics: Graphics): void {
    for (const type in graphics.listener) {
      this.removeEventListener(
        type as keyof GlobalEventHandlersEventMap,
        graphics,
      );
    }
    graphics.children.forEach((e) => {
      this.clearListenerOfGraphics(e);
    });
  }
  clearAll(): void {
    const map = this.eventMap;
    for (const type in map) {
      this.canvas.removeEventListener(type, map[type as keyof typeof map]!);
    }
  }
}
