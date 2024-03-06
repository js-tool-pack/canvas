import { ListenerManager } from '~/ListenerManager';
import { ShapeManager } from '~/ShapeManager';
import { Shape } from './Shape';

export class Renderer {
  private readonly offScreenCTX!: CanvasRenderingContext2D;
  private readonly offScreenCanvas!: HTMLCanvasElement;
  private readonly listenerManager: ListenerManager;
  private readonly ctx!: CanvasRenderingContext2D;
  private readonly shapeManager: ShapeManager;
  private readonly canvas!: HTMLCanvasElement;
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

    this.listenerManager = new ListenerManager(this.canvas, this.offScreenCTX);
    this.listenerManager.simulateMouseEvents();
    this.shapeManager = new ShapeManager(this.listenerManager);
  }

  render(): void {
    const { offScreenCTX, ctx } = this;

    // offScreenCTX.imageSmoothingEnabled = true;
    // ctx.imageSmoothingEnabled = true;

    ctx.clearRect(0, 0, this.width, this.height);
    offScreenCTX.clearRect(0, 0, this.width, this.height);
    this.shapeManager.render(offScreenCTX);

    // 双缓冲
    ctx.drawImage(this.offScreenCanvas, 0, 0);
  }
  addNativeEventListener<K extends keyof GlobalEventHandlersEventMap>(
    type: K,
    callback: (ev: HTMLElementEventMap[K]) => void,
  ) {
    this.canvas.addEventListener(type, callback);
  }
  removeNativeEventListener(
    type: keyof GlobalEventHandlersEventMap,
    cb: Function,
  ) {
    this.canvas.removeEventListener(type, cb as any);
  }
  removeEventListener(
    type: keyof GlobalEventHandlersEventMap,
    el: Shape,
  ): void {
    this.listenerManager.removeEventListener(type, el);
  }
  addEventListener(type: keyof GlobalEventHandlersEventMap, el: Shape): void {
    this.listenerManager.addEventListener(type, el);
  }
  destroy(): void {
    this.listenerManager.clearAll();
    this.shapeManager.clear();
  }

  add(element: Shape): void {
    this.shapeManager.add(element, this);
  }
  remove(element: Shape): void {
    this.shapeManager.remove(element);
  }
}
