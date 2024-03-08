/**
 * title: 基础用法
 * description: 鼠标点击拖动图片可显示放大效果
 */

import { Magnifier, Renderer, Image } from '@tool-pack/canvas';
import React, { useEffect, useRef } from 'react';

const App: React.FC = () => {
  const elRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const renderer = new Renderer(el);
    const magnifier = new Magnifier(
      5, // 放大倍数
      {
        borderColor: '#fff143', // 放大镜边框颜色
        borderWidth: 5, // 放大镜边框宽度
        width: 160, // 放大镜大小
      },
    );
    const img = new Image(
      'https://s.cn.bing.net/th?id=OHR.ArenalCostaRica_ZH-CN4466297855_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
      {
        height: 300,
        width: 300,
      },
    );

    renderer.add(img);
    renderer.render();

    // 交互。放大镜并未内置具体的交互方式，因为不确定具体是要在何时开启放大镜效果
    const addListener = (): (() => void) => {
      const down = (e: MouseEvent): void => {
        move(e);
        renderer.add(magnifier);
        renderer.render();
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseup', up);
      };
      const move = (e: MouseEvent): void => {
        // left top 不再是dom 一样在最左边与最上边，而是对应放大镜的中心位置
        magnifier.style.left = e.offsetX;
        magnifier.style.top = e.offsetY;
      };
      const up = (): void => {
        renderer.remove(magnifier);
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseup', up);
        renderer.render();
      };

      el.addEventListener('mousedown', down);

      return (): void => {
        el.removeEventListener('mousedown', down);
        up();
      };
    };

    const removeListener = addListener();
    return () => {
      removeListener();
      renderer.destroy();
    };
  }, []);

  return <canvas draggable="false" height={300} width={300} ref={elRef} />;
};

export default App;
