/**
 * title: 基础用法
 * description: 用操作 dom 的方式操作 canvas。
 */

import { Rectangle, Renderer } from '@tool-pack/canvas';
import React, { useEffect, useRef } from 'react';

const App: React.FC = () => {
  const elRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const Colors = ['#00e09e', '#fff143'] as const;
    const render = new Renderer(el);
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
  }, []);

  return (
    <>
      <p>Hover</p>
      <canvas height={200} width={200} ref={elRef} />
    </>
  );
};

export default App;
