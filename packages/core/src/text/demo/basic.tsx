/**
 * title: 基础用法
 */

import { Renderer, Text } from '@tool-pack/canvas';
import React, { useEffect, useRef } from 'react';

const App: React.FC = () => {
  const elRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const renderer = new Renderer(el);
    const text = new Text({
      backgroundColor: '#faefae',
      borderColor: '#e88355',
      letterSpacing: '2px',
      textBaseline: 'top',
      fontWeight: 'bold',
      textAlign: 'left',
      color: 'darkblue',
      // fontFamily: 'fantasy',
      borderWidth: 2,
      fontSize: 30,
    });
    text.content = 'hello world';
    // multiline
    renderer.add(text);
    renderer.render();

    return () => {
      renderer.destroy();
    };
  }, []);

  return (
    <canvas
      style={{ border: '1px solid blue' }}
      draggable="false"
      height={300}
      width={300}
      ref={elRef}
    />
  );
};

export default App;
