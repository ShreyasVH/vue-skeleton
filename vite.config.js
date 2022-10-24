import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: process.env.VITE_HOST,
      port: process.env.VITE_PORT,
      https: {
        key: fs.readFileSync(process.env.VITE_SSL_KEY_FILE),
        cert: fs.readFileSync(process.env.VITE_SSL_CRT_FILE)
      }
    }
  }
})
