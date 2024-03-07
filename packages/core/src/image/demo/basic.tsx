/**
 * title: 基础用法
 */

import { Renderer, Image } from '@tool-pack/canvas';
import React, { useEffect, useRef } from 'react';

const App: React.FC = () => {
  const elRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const renderer = new Renderer(el);
    const img = new Image(
      'https://s.cn.bing.net/th?id=OHR.BangkokCircle_ZH-CN4702412806_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
      {
        borderRadius: 20,
        height: 100,
        width: 100,
        top: 100,
        left: 0,
      },
    );
    // 划过时切换图片
    img.addEventListener('mouseenter', function () {
      this.src =
        'https://s.cn.bing.net/th?id=OHR.ArenalCostaRica_ZH-CN4466297855_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp';
    });
    img.addEventListener('mouseleave', function () {
      this.src =
        'https://s.cn.bing.net/th?id=OHR.BangkokCircle_ZH-CN4702412806_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp';
    });

    const images = [
      new Image(
        'https://s.cn.bing.net/th?id=OHR.TarragonaSpain_ZH-CN5488361711_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
        {
          height: 100,
          width: 100,
        },
      ),
      new Image(
        'https://s.cn.bing.net/th?id=OHR.WahclellaFalls_ZH-CN4932852217_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
        {
          borderColor: 'deeppink',
          borderRadius: 20,
          borderWidth: 5,
          height: 100,
          width: 100,
          left: 100,
          top: 0,
        },
      ),
      img,
      new Image(
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1610%2F20%2Fc16%2F28666491_1476977210753.jpg&refer=http%3A%2F%2Fimg.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639854808&t=8c31d1b0991a4c8a5068e9f303c1fe90',
        {
          borderColor: '#00e09e',
          borderWidth: 5,
          height: 100,
          width: 100,
          left: 100,
          top: 100,
        },
      ),
    ] as const;

    images.forEach((img) => renderer.add(img));
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
