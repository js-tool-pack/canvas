/**
 * title: 基础用法
 * description: 笔的加载与移除
 */

import React, { useEffect, useState, useRef } from 'react';
import { Renderer, Pencil } from '@tool-pack/canvas';

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const pencilRef = useRef(new Pencil({ color: '#00e09e', width: 5 }));
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = (rendererRef.current = new Renderer(canvas));
    return () => renderer.destroy();
  }, []);

  return (
    <>
      <div>
        <button
          onClick={() => {
            setEnable((v) => !v);
            const renderer = rendererRef.current;
            if (!renderer) return;

            if (!enable) renderer.add(pencilRef.current);
            else renderer.remove(pencilRef.current);

            renderer.render();
          }}
        >
          {enable ? '移除' : '加载'}
        </button>
        <button onClick={() => pencilRef.current?.clear()}>清除笔迹</button>
      </div>
      <canvas
        style={{ border: '1px solid pink' }}
        draggable="false"
        ref={canvasRef}
        height={200}
        width={200}
      />
    </>
  );
};

export default App;
