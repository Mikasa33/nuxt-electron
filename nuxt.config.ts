// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  electron: {
    build: [
      {
        entry: "electron/main.ts",
        vite: {
          build: {
            outDir: ".electron",
            rollupOptions: {
              external: ["@libsql/client"],
            },
          },
        },
      },
      {
        entry: "electron/preload.ts",
        vite: {
          build: {
            outDir: ".electron",
            rollupOptions: {
              output: {
                entryFileNames: `[name].mjs`,
              },
            },
          },
        },
        onstart(args) {
          // 在预加载脚本构建完成后，通知渲染器进程重新加载页面，而不是重新启动整个 Electron 应用
          args.reload();
        },
      },
    ],
  },
  future: {
    compatibilityVersion: 4,
  },
  ui: {
    fonts: false,
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "nuxt-electron",
  ],
});
