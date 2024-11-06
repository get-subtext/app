import adapter from '@sveltejs/adapter-static';
import fs from 'fs';
import path from 'path';
import { map, toPairs, fromPairs } from 'lodash-es';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tsconfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'tsconfig.json'), 'utf-8'));
const alias = fromPairs(map(toPairs(tsconfig.compilerOptions.paths), ([name, path]) => [name, '../../' + path[0]]));

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({ fallback: '404.html' }),
    paths: { base: process.argv.includes('dev') ? '' : process.env.BASE_PATH },
    alias,
  },
};

export default config;
