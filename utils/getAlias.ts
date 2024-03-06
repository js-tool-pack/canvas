import Path from 'path';
import Fs from 'fs';

export function getAlias(): Record<string, string> {
  const pkgsPath = Path.resolve(__dirname, '../packages');
  const coreSrcPath = Path.resolve(pkgsPath, 'core/src');

  const pkgs = Fs.readdirSync(pkgsPath);
  const coreSrcDirs = Fs.readdirSync(coreSrcPath).map((s) =>
    s.replace(/\.ts$/, ''),
  );

  return {
    '@tool-pack/canvas': Path.resolve(pkgsPath, 'canvas/src'),
    ...pkgs.reduce(
      (prev, cur) => {
        prev['@pkg/' + cur] = Path.resolve(pkgsPath, `${cur}/src`);
        return prev;
      },
      {} as Record<string, string>,
    ),
    ...coreSrcDirs.reduce(
      (prev, cur) => {
        prev['~/' + cur] = Path.resolve(coreSrcPath, cur);
        return prev;
      },
      {} as Record<string, string>,
    ),
  };
}
