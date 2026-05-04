export default defineNuxtConfig({
  ssr: false,

  modules: ["@vercel/analytics"],

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "theme-color",
          content: "#0b0b0f",
        },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "dns-prefetch",
          href: "https://theglobalbliss.online",
        },
      ],
    },
  },

  css: [
    "swiper/css/bundle",
    "@/assets/fonts/remixicon.css",
    "@/assets/css/nice-select.min.css",
    "@/assets/css/animate.min.css",
    "@/assets/css/spacing.css",
    "bootstrap/dist/css/bootstrap.min.css",
    "@/assets/css/style.css",
    "@/assets/css/responsive.css",
  ],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: false,
      routes: [
        "/",
        "/about",
        "/service",
        "/works",
        "/blog",
        "/contact",
        "/robots.txt",
        "/sitemap.xml",
      ],
      failOnError: false,
    },
  },

  vite: {
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["vue"],
            bootstrap: ["bootstrap"],
          },
        },
      },
    },
  },

  experimental: {
    payloadExtraction: false,
  },

  compatibilityDate: "2026-04-27",
});