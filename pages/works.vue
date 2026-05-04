<script setup>
import Footer from "~/layouts/Footer.vue";
import Header from "~/layouts/Header.vue";

useHead({
  title: "Works & Projects | The GlobalBliss Brand Portfolio",
  meta: [
    {
      name: "description",
      content:
        "View selected works and projects by The GlobalBliss Brand, including website development, brand identity design, social media design, and creative direction.",
    },
    {
      name: "keywords",
      content:
        "GlobalBliss portfolio, Anuoluwapo Bliss projects, website design projects, brand identity design, social media design portfolio, creative designer portfolio Nigeria",
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
      property: "og:title",
      content: "Works & Projects | The GlobalBliss Brand Portfolio",
    },
    {
      property: "og:description",
      content:
        "Explore creative projects crafted by Anuoluwapo Bliss across web design, branding, social media design, and digital strategy.",
    },
    {
      property: "og:url",
      content: "https://theglobalbliss.online/works",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:site_name",
      content: "The GlobalBliss Brand",
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
      name: "twitter:title",
      content: "Works & Projects | The GlobalBliss Brand Portfolio",
    },
    {
      name: "twitter:description",
      content:
        "View selected works by The GlobalBliss Brand across websites, branding, social media design, and creative direction.",
    },
    {
      name: "twitter:image",
      content: "https://theglobalbliss.online/og-image.jpg",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://theglobalbliss.online/works",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Works & Projects | The GlobalBliss Brand Portfolio",
        url: "https://theglobalbliss.online/works",
        description:
          "A portfolio collection of selected website development, brand identity design, social media design, and creative design projects by Anuoluwapo Bliss.",
        creator: {
          "@type": "Person",
          name: "Anuoluwapo Bliss",
          url: "https://theglobalbliss.online",
        },
        publisher: {
          "@type": "Organization",
          name: "The GlobalBliss Brand",
          url: "https://theglobalbliss.online",
          logo: {
            "@type": "ImageObject",
            url: "https://theglobalbliss.online/og-image.jpg",
          },
        },
        mainEntity: {
          "@type": "ItemList",
          name: "The GlobalBliss Brand Portfolio Projects",
          itemListOrder: "https://schema.org/ItemListOrderAscending",
        },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://theglobalbliss.online",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Works",
            item: "https://theglobalbliss.online/works",
          },
        ],
      }),
    },
  ],
});

onMounted(async () => {
  const wow = await import("wow.js");
  new wow.default().init();
});
</script>

<template>
  <div>
    <CommonScrollTop />
    <Header />

    <HomePortfolioArea cls="innerpage-single-area" />
    <HomeCtaArea />

    <Footer />
  </div>
</template>