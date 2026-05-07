import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import process from 'node:process';
import { build } from 'esbuild';

export function previewScriptsPlugin() {
  const scriptsDir = resolve(process.cwd(), 'src/components/preview/scripts');
  let outDir = resolve(process.cwd(), 'dist');

  const bundleScript = async (entryFilePath) => {
    const result = await build({
      entryPoints: [entryFilePath],
      bundle: true,
      write: false,
      format: 'iife',
      platform: 'browser',
      target: 'es2020',
      sourcemap: false,
    });

    const output = result.outputFiles?.[0];

    if (!output)
      return '';

    return output.text;
  };

  return {
    name: 'preview-scripts',
    configResolved(config) {
      outDir = resolve(process.cwd(), config.build.outDir);
    },
    configureServer(server) {
      server.middlewares.use('/preview/scripts', async (req, _res, next) => {
        const res = _res;
        const requestPath = req.url?.split('?')[0] ?? '';
        const requestedFilePath = join(scriptsDir, requestPath);

        if (extname(requestedFilePath) !== '.js') {
          next();
          return;
        }

        const sourceFilePath = requestedFilePath.replace(/\.js$/, '.ts');

        if (!existsSync(sourceFilePath)) {
          next();
          return;
        }

        try {
          const content = await bundleScript(sourceFilePath);

          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
          res.end(content);
        } catch (error) {
          next(error);
        }
      });
    },
    async closeBundle() {
      if (!existsSync(scriptsDir))
        return;

      const outputDir = join(outDir, 'preview/scripts');
      const scriptFiles = readdirSync(scriptsDir).filter((fileName) => extname(fileName) === '.ts');

      mkdirSync(outputDir, { recursive: true });

      for (const scriptFile of scriptFiles) {
        const sourceFilePath = join(scriptsDir, scriptFile);
        const outputFilePath = join(outputDir, `${basename(scriptFile, '.ts')}.js`);
        const content = await bundleScript(sourceFilePath);

        writeFileSync(outputFilePath, content);
      }
    },
  };
}
