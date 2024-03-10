import { ListenerManager } from '~/ListenerManager';
import { GraphicsManager } from '~/GraphicsManager';
import { Graphics } from './Graphics';

export class Renderer {
  private readonly listenerManager: ListenerManager;
  private readonly graphicsManager: GraphicsManager;
  private readonly ctx!: CanvasRenderingContext2D;
  private readonly canvas!: HTMLCanvasElement;
  readonly offScreenCTX!: CanvasRenderingContext2D;
  readonly offScreenCanvas!: HTMLCanvasElement;
  readonly height!: number;
  readonly width!: number;

  constructor(canvas: HTMLCanvasElement | string) {
    const canvasEl =
      typeof canvas === 'string'
        ? document.querySelector<HTMLCanvasElement>(canvas)
        : canvas;
    if (!canvasEl) throw new Error('canvas can not be empty!');

    this.width = canvasEl.width;
    this.height = canvasEl.height;

    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;

    [this.offScreenCanvas, this.offScreenCTX] = this.cloneCanvas();

    this.listenerManager = new ListenerManager(this.canvas, this.offScreenCTX);
    this.listenerManager.simulateMouseEvents();
    this.graphicsManager = new GraphicsManager(this.listenerManager);
  }

  render(): void {
    const { offScreenCTX, ctx } = this;

    // offScreenCTX.imageSmoothingEnabled = true;
    // ctx.imageSmoothingEnabled = true;

    ctx.clearRect(0, 0, this.width, this.height);
    offScreenCTX.clearRect(0, 0, this.width, this.height);
    this.graphicsManager.render(offScreenCTX);

    // 双缓冲
    ctx.drawImage(this.offScreenCanvas, 0, 0);
  }
  cloneCanvas(): [
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ] {
    const canvas = document.createElement('canvas');
    canvas.width = this.canvas.width;
    canvas.height = this.canvas.height;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    return [canvas, ctx];
  }
  canvasOn<K extends keyof GlobalEventHandlersEventMap>(
    type: K,
    callback: (ev: HTMLElementEventMap[K]) => void,
  ) {
    this.canvas.addEventListener(type, callback);
  }
  off(type: keyof GlobalEventHandlersEventMap, el: Graphics): void {
    this.listenerManager.removeEventListener(type, el);
  }
  canvasOff(type: keyof GlobalEventHandlersEventMap, cb: Function) {
    this.canvas.removeEventListener(type, cb as any);
  }
  on(type: keyof GlobalEventHandlersEventMap, el: Graphics): void {
    this.listenerManager.addEventListener(type, el);
  }
  destroy(): void {
    this.listenerManager.clearAll();
    this.graphicsManager.clear();
  }
  add(element: Graphics): void {
    this.graphicsManager.add(element, this);
  }
  remove(element: Graphics): void {
    this.graphicsManager.remove(element);
  }
}
