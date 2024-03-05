import { Shape } from './Shape';

type EventType = keyof GlobalEventHandlersEventMap;

export class Renderer {
  private readonly listeningMap: Partial<
    Record<EventType, (e: Event) => void>
  > = {};
  private readonly listeningShapeMap: Partial<Record<EventType, Array<Shape>>> =
    {};
  private readonly offScreenCTX!: CanvasRenderingContext2D;
  private readonly offScreenCanvas!: HTMLCanvasElement;
  private readonly ctx!: CanvasRenderingContext2D;
  private readonly canvas!: HTMLCanvasElement;
  private readonly shapes: Shape[] = [];
  readonly height!: number;
  readonly width!: number;

  constructor(canvas: HTMLCanvasElement | string) {
    const canvasEl =
      typeof canvas === 'string'
        ? document.querySelector<HTMLCanvasElement>(canvas)
        : canvas;
    if (!canvasEl) throw new Error('canvas can not be empty!');

    const shadowCanvas = document.createElement('canvas');
    this.width = shadowCanvas.width = canvasEl.width;
    this.height = shadowCanvas.height = canvasEl.height;

    this.offScreenCTX = shadowCanvas.getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    this.ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;
    this.offScreenCanvas = shadowCanvas;
    this.canvas = canvasEl;

    this.simulateMouseEvents();
  }

  /**
   * 模拟鼠标事件
   */
  simulateMouseEvents(): void {
    const enterSet = new Set<Shape>();
    const { listeningShapeMap, offScreenCTX } = this;

    const simulateMouseLeaveEvents = (e: Event): void => {
      (listeningShapeMap.mouseleave || []).forEach((el) => {
        if (enterSet.has(el) && !el.isHit(offScreenCTX, e)) {
          this.callListenerCallback('mouseleave', el);
          enterSet.delete(el);
        }
      });
    };

    this.listeningMap.mousemove = (e) => {
      // 模拟dom 鼠标移入事件
      (listeningShapeMap.mouseenter || []).forEach((el) => {
        if (!enterSet.has(el) && el.isHit(offScreenCTX, e)) {
          this.callListenerCallback('mouseenter', el);
          enterSet.add(el);
        }
      });
      // 鼠标移入事件
      (listeningShapeMap.mousemove || []).forEach((el) => {
        if (enterSet.has(el) && el.isHit(offScreenCTX, e)) {
          this.callListenerCallback('mousemove', el);
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
    const { listeningShapeMap, offScreenCTX, listeningMap } = this;

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
          this.callListenerCallback(type, el);
        }
      });
    };
    listeningMap[type] = handler;
    this.canvas.addEventListener(type, handler);
  }
  remove(element: Shape): void {
    const c = this.shapes;
    const index = c.findIndex((i) => i === element);
    if (index === -1) return;
    this.shapes.splice(index, 1);
    element.renderer = null;

    const removeListen = (el: Shape) => {
      for (const type in el.listener) {
        this.removeEventListener(type as keyof GlobalEventHandlersEventMap, el);
      }
      el.children.forEach((e) => {
        removeListen(e);
      });
    };
    removeListen(element);
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

  add(element: Shape): void {
    element.renderer = this;
    this.shapes.push(element);
    this.shapes.sort((a, b) => a.computedStyle.zIndex - b.computedStyle.zIndex);

    const listen = (el: Shape) => {
      for (const type in el.listener) {
        this.addEventListener(type as keyof GlobalEventHandlersEventMap, el);
      }
      el.children.forEach(listen);
    };
    listen(element);
  }

  render(): void {
    const { offScreenCTX, ctx } = this;

    // offScreenCTX.imageSmoothingEnabled = true;
    // ctx.imageSmoothingEnabled = true;

    ctx.clearRect(0, 0, this.width, this.height);
    offScreenCTX.clearRect(0, 0, this.width, this.height);
    this.shapes.forEach((c) => {
      c.renderAll(offScreenCTX);
    });

    // 双缓冲
    ctx.drawImage(this.offScreenCanvas, 0, 0);
  }
  callListenerCallback(type: EventType, shape: Shape): void {
    shape.listener[type]?.forEach((callback) => {
      callback.call(shape);
    });
  }
}
