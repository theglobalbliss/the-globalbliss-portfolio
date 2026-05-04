export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      meta: [
        {
          name: "google-site-verification",
          content: "rf1S2vaMm7vznu2YIG6xvGS4PtVIC8BnNr7DG7-UA44",
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

  compatibilityDate: "2026-04-27",
});