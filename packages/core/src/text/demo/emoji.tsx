/**
 * title: 合成表情字符
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
      borderRadius: 10,
      color: 'black',
      borderWidth: 2,
      lineHeight: 28,
      fontSize: 16,
    });
    text.content =
      '信言不美，美言不信；善者不辩，👨‍👩‍👧‍👦👨‍👩‍👧‍👦辩者不善；知（zhì）者不博，博者不知（zhì）。\n圣人不积，既以为人，己愈有；既以与人，己愈多。天之道，利而不害。圣人之道，为而不争。';
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
