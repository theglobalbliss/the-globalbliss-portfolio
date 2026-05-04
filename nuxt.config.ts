export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title:
        "The GlobalBliss Brand | Creative Designer & Website Developer in Nigeria",
      meta: [
        {
          name: "description",
          content:
            "The GlobalBliss Brand is the creative portfolio of Anuoluwapo Bliss, a Nigerian creative designer, website developer, brand identity designer, and digital strategist helping brands build clean visuals and functional websites.",
        },
        {
          name: "keywords",
          content:
            "GlobalBliss, Anuoluwapo Bliss, graphic designer in Nigeria, website designer in Nigeria, brand identity designer, social media designer, portfolio website designer, creative designer Nigeria",
        },
        {
          name: "author",
          content: "Anuoluwapo Bliss",
        },
        {
          name: "robots",
          content: "index, follow",
        },
        {
          property: "og:site_name",
          content: "The GlobalBliss Brand",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:image",
          content: "https://theglobalbliss.online/og-image.jpg",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:image",
          content: "https://theglobalbliss.online/og-image.jpg",
        },
      ],
      link: [
        {
          rel: "canonical",
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
    prerender: {
      crawlLinks: false,
      routes: ["/"],
      failOnError: false,
    },
  },

  compatibilityDate: "2026-04-27",
});