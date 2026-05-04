<script setup>
import Footer from "~/layouts/Footer.vue";
import Header from "~/layouts/Header.vue";

useHead({
  title: "Services | Website Design, Branding & Creative Design in Nigeria",
  meta: [
    {
      name: "description",
      content:
        "Explore services by The GlobalBliss Brand, including website design, website development, brand identity design, social media design, and creative direction for brands and businesses.",
    },
    {
      name: "keywords",
      content:
        "website design services Nigeria, brand identity design Nigeria, social media design, creative designer Nigeria, GlobalBliss services, Anuoluwapo Bliss services",
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
      content: "Services | Website Design, Branding & Creative Design in Nigeria",
    },
    {
      property: "og:description",
      content:
        "Get clean websites, memorable brand identities, social media designs, and creative direction from The GlobalBliss Brand.",
    },
    {
      property: "og:url",
      content: "https://theglobalbliss.online/service",
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
      content: "Services | The GlobalBliss Brand",
    },
    {
      name: "twitter:description",
      content:
        "Website design, brand identity design, social media design, and creative direction services by Anuoluwapo Bliss.",
    },
    {
      name: "twitter:image",
      content: "https://theglobalbliss.online/og-image.jpg",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://theglobalbliss.online/service",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Creative Design and Website Development Services",
        provider: {
          "@type": "Organization",
          name: "The GlobalBliss Brand",
          url: "https://theglobalbliss.online",
          founder: {
            "@type": "Person",
            name: "Anuoluwapo Bliss",
          },
        },
        areaServed: {
          "@type": "Country",
          name: "Nigeria",
        },
        serviceType: [
          "Website Design",
          "Website Development",
          "Brand Identity Design",
          "Social Media Design",
          "Creative Direction",
          "Digital Strategy",
        ],
        description:
          "The GlobalBliss Brand offers website design, website development, brand identity design, social media design, creative direction, and digital strategy services for brands and businesses.",
        url: "https://theglobalbliss.online/service",
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
            name: "Services",
            item: "https://theglobalbliss.online/service",
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

    <ServiceArea />
    <ServicePricingArea />
    <HomeCtaArea />

    <Footer />
  </div>
</template>