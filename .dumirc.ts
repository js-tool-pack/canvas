import { defineConfig } from 'dumi';
// @ts-ignore
import pkg from './package.json';
import { getAlias } from './utils';

const pkgName = pkg.name.replace('-monorepo', '');

type ENV = 'development' | 'production';
const map: Record<ENV, Parameters<typeof defineConfig>[0]> = {
  development: {},
  production: {
    base: '/canvas/',
    publicPath: '/canvas/',
  },
};
const env = process.env['NODE_ENV'] as ENV;

export default defineConfig({
  ...map[env],
  // mfsu: true, // windows 系统开启该选项会启动不了
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'canvas',
    showLineNum: true,
    github: pkg.repository.url.replace(/^git\+|\.git$/g, ''),
    // 目前的dumi-theme-antd-style主题不支持从这配置，已移动到.dumi/theme/slots/Footer/index.tsx配置
    // footer: `Open-source MIT Licensed | Powered by <a href="${pkg.homepage}">${pkgName}</a>`,

    // https://dumi-theme-antd-style.arvinx.app/config#apiheader
    apiHeader: {
      // 组件库包名，可以从 package.json 中引入名称
      pkg: pkgName,
      // 匹配路由，默认为 /api 或 /components
      match: ['/core'],
      // github 会匹配 themeConfig.github 字段
      sourceUrl: `{github}/tree/main/packages/core/src/{atomId.kebab}/index.ts`,
      docUrl: `{github}/tree/main/packages/core/src/{atomId.kebab}/index.{locale}.md`,
    },
  },
  // apiParser: {},
  resolve: {
    atomDirs: [{ type: 'core', dir: 'packages/core/src' }],
    // 配置入口文件路径，API 解析将从这里开始
    // entryFile: './packages/canvas/src/index.ts',
  },
  // 在子包中寻找，优先定向到 libs 文件夹
  monorepoRedirect: {
    srcDir: ['packages'],
    // peerDeps: true,
  },
  // 不重定向 @scope/* 的子包
  //   monorepoRedirect: {
  //     exclude: [/^@scope\/.+/],
  //   }
  locales: [
    // { id: 'en-US', name: 'English', suffix: '' },
    // { id: 'zh-CN', name: '中文', suffix: '-cn' },
  ],
  alias: {
    ...getAlias(),
  },
});
