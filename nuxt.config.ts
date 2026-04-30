export default defineNuxtConfig({
  ssr: false,

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

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ["/"],
      failOnError: false,
    },
  },

  compatibilityDate: "2026-04-27",
});