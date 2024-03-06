/**
 * title: 基础用法
 * description: 可在框内拖动鼠标写字
 */

import { Renderer, Pencil } from '@tool-pack/canvas';
import React, { useEffect, useRef } from 'react';

const App: React.FC = () => {
  const elRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const renderer = new Renderer(el);
    const pencil = new Pencil();

    renderer.add(pencil);
    renderer.render();

    return () => renderer.destroy();
  }, []);

  return (
    <canvas
      style={{ border: '1px solid pink' }}
      draggable="false"
      height={200}
      width={200}
      ref={elRef}
    />
  );
};

export default App;
