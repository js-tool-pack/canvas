import React, { useEffect, Suspense } from 'react';
import { debounce } from '@tool-pack/basic';

const scrollToHash = debounce(() => {
  document
    .querySelector(window.location.hash)
    ?.scrollIntoView({ block: 'center' });
}, 100);

const Loading: React.FC = () => {
  useEffect(() => {
    return () => {
      if (!window.location.hash) return;
      scrollToHash();
    };
  }, []);
  return <div>loading</div>;
};

function basename(path: string) {
  return path.split(/[^\w-]/).at(-2);
}

export function getDemos(demos: Record<string, unknown>) {
  return (
    <>
      <section>
        <h2>目录</h2>
        <ol>
          {Object.keys(demos).map((key) => {
            const name = basename(key);
            return (
              <li key={name}>
                <a href={'#' + name}>{name}</a>
              </li>
            );
          })}
        </ol>
      </section>
      <section>
        <h2>Demo</h2>
        <Suspense fallback={<Loading />}>
          {Object.keys(demos).map((key, index) => {
            const App = React.lazy(
              demos[key] as () => Promise<{ default: React.FC }>,
            );
            const name = basename(key);
            return (
              <section key={name} id={name}>
                <h3>
                  <a href={'#' + name}>
                    {index + 1}. {name}
                  </a>
                </h3>
                <div>
                  <App />
                </div>
              </section>
            );
          })}
        </Suspense>
      </section>
    </>
  );
}
