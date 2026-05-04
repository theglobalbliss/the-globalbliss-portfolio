<script setup>
import Footer from "~/layouts/Footer.vue";
import Header from "~/layouts/Header.vue";

useHead({
  title: "The GlobalBliss Brand | Creative Designer & Website Developer in Nigeria",
  meta: [
    {
      name: "google-site-verification",
      content: "rf1S2vaMm7vznu2YIG6xvGS4PtVIC8BnNr7DG7-UA44",
    },
    {
      name: "description",
      content:
        "Explore The GlobalBliss Brand portfolio by Anuoluwapo Bliss, a creative designer, website developer, brand identity designer, and digital strategist based in Nigeria.",
    },
    {
      name: "keywords",
      content:
        "The GlobalBliss Brand, GlobalBliss, Anuoluwapo Bliss, creative designer in Nigeria, website developer in Nigeria, graphic designer in Nigeria, brand identity designer, social media designer, portfolio website designer",
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
      content:
        "The GlobalBliss Brand | Creative Designer & Website Developer in Nigeria",
    },
    {
      property: "og:description",
      content:
        "Clean designs, functional websites, brand identity, social media design, and digital experiences crafted with purpose by Anuoluwapo Bliss.",
    },
    {
      property: "og:url",
      content: "https://theglobalbliss.online",
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
      content:
        "The GlobalBliss Brand | Creative Designer & Website Developer in Nigeria",
    },
    {
      name: "twitter:description",
      content:
        "Clean designs, functional websites, brand identity, social media design, and digital experiences crafted with purpose by Anuoluwapo Bliss.",
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
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Anuoluwapo Bliss",
        alternateName: "The GlobalBliss",
        url: "https://theglobalbliss.online",
        image: "https://theglobalbliss.online/og-image.jpg",
        jobTitle: [
          "Creative Designer",
          "Website Developer",
          "Brand Identity Designer",
          "Digital Strategist",
        ],
        worksFor: {
          "@type": "Organization",
          name: "The GlobalBliss Brand",
          url: "https://theglobalbliss.online",
        },
        sameAs: ["https://theglobalbliss.online"],
        knowsAbout: [
          "Graphic Design",
          "Website Development",
          "Brand Identity Design",
          "Social Media Design",
          "Creative Direction",
          "Digital Strategy",
          "Nuxt.js",
          "WordPress",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lagos",
          addressCountry: "Nigeria",
        },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "The GlobalBliss Brand",
        alternateName: "GlobalBliss",
        url: "https://theglobalbliss.online",
        logo: "https://theglobalbliss.online/og-image.jpg",
        founder: {
          "@type": "Person",
          name: "Anuoluwapo Bliss",
        },
        description:
          "The GlobalBliss Brand is a creative portfolio and digital brand by Anuoluwapo Bliss, focused on clean designs, functional websites, brand identity, social media design, and purposeful digital experiences.",
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "The GlobalBliss Brand",
        url: "https://theglobalbliss.online",
        description:
          "Creative portfolio of Anuoluwapo Bliss, a Nigerian creative designer, website developer, brand identity designer, and digital strategist.",
        publisher: {
          "@type": "Organization",
          name: "The GlobalBliss Brand",
        },
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

    <HomeAboutArea />
    <HomePortfolioArea />
    <HomeCtaArea />

    <Footer />
  </div>
</template>