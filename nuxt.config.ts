// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'fade-slide',
      mode: 'out-in',
    },
  },
  compatibilityDate: '2024-11-01',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  electron: {
    build: [
      {
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            outDir: '.electron/main',
            rollupOptions: {
              external: ['@libsql/client'],
            },
          },
        },
      },
      {
        entry: 'electron/preload/index.ts',
        vite: {
          build: {
            outDir: '.electron/preload',
            rollupOptions: {
              output: {
                entryFileNames: `[name].mjs`,
              },
            },
          },
        },
        onstart(args) {
          // 在预加载脚本构建完成后，通知渲染器进程重新加载页面，而不是重新启动整个 Electron 应用
          args.reload()
        },
      },
    ],
  },
  eslint: {
    config: {
      // 自定义配置预设
      standalone: false,
    },
  },
  experimental: {
    // 解决跳转路由控制台报错问题
    appManifest: false,
  },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    'nuxt-electron',
  ],
  ui: {
    // 解决加载谷歌字体失败问题
    fonts: false,
  },
})
