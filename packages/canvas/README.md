# @tool-pack/canvas

用写 dom 的思路去画 canvas

```shell
pnpm add @tool-pack/canvas -D
```

```typescript
import { Rectangle, Renderer } from '@tool-pack/canvas';

const Colors = ['#00e09e', '#fff143'] as const;
const render = new Renderer(
  document.querySelector('canvas') as HTMLCanvasElement,
);

const rect = new Rectangle({
  backgroundColor: Colors[0],
  height: 80,
  width: 80,
});
const rect2 = new Rectangle({
  borderColor: 'rgb(80, 97, 109)',
  backgroundColor: Colors[1],
  position: 'absolute',
  borderRadius: 10,
  borderWidth: 5,
  height: 80,
  left: 100,
  width: 80,
});

rect.addEventListener('mouseenter', function (this: Rectangle) {
  this.style.backgroundColor = Colors[1];
});
rect.addEventListener('mouseleave', function (this: Rectangle) {
  this.style.backgroundColor = Colors[0];
});
rect2.addEventListener('mouseenter', function (this: Rectangle) {
  this.style.borderWidth = 0;
  this.style.backgroundColor = Colors[0];
});
rect2.addEventListener('mouseleave', function (this: Rectangle) {
  this.style.borderWidth = 5;
  this.style.backgroundColor = Colors[1];
});

render.add(rect);
render.add(rect2);
render.render();
```
