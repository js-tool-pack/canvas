import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { getAlias } from '../../utils';
import pkg from './package.json';
import { resolve } from 'path';

function getBanner(format: string) {
  const date = new Date();
  return (
    '/*!\n' +
    ` * ${pkg.buildOptions.name}(${pkg.name}) v${pkg.version}\n` +
    ` * Author: ${pkg.author}\n` +
    ` * Documentation: ${pkg.homepage}\n` +
    ` * License: ${pkg.license}\n` +
    ` * File: index.${format}.js\n` +
    ` * Date: ${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}\n` +
    ` */\n`
  );
}

const entryPath = resolve(__dirname, './src/index.ts');
/**
 * Vite configuration
 * https://vitejs.dev/config/
 */
export default defineConfig((): UserConfig => {
  return {
    build: {
      rollupOptions: {
        output: [
          {
            entryFileNames: '[name].iife.js',
            name: pkg.buildOptions.name,
            banner: getBanner('iife'),
            format: 'iife',
          },
          {
            entryFileNames: '[name].es.js',
            banner: getBanner('es'),
            format: 'es',
          },

          {
            entryFileNames: '[name].cjs.js',
            banner: getBanner('cjs'),
            format: 'cjs',
          },
        ],
      },
      outDir: resolve(__dirname, './dist'),
      lib: { entry: entryPath },
      // minify: true,
      cssCodeSplit: true,
      target: 'modules',
      emptyOutDir: true,
    },
    plugins: [
      // https://github.com/vitejs/vite/tree/main/packages/plugin-react
      react({
        jsxRuntime: 'classic',
      }),
    ],
    resolve: {
      alias: getAlias(),
    },
    cacheDir: `./.cache`,
  };
});
