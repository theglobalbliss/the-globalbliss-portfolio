export default defineNuxtConfig({
  ssr: false,

  modules: ["@vercel/analytics"],

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

  experimental: {
    payloadExtraction: false,
  },

  compatibilityDate: "2026-04-27",
});