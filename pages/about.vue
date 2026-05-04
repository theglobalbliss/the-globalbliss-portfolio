<script setup>
import Footer from "~/layouts/Footer.vue";
import Header from "~/layouts/Header.vue";

import AboutSection from "~/components/about/About.vue";
import ResumeSection from "~/components/about/Resume.vue";
import TestimonialSection from "~/components/about/Testimonial.vue";

useHead({
  title: "About Anuoluwapo Bliss | The GlobalBliss Brand",
  meta: [
    {
      name: "description",
      content:
        "Learn about Anuoluwapo Bliss, a Nigerian creative designer, website developer, brand strategist, and founder of The GlobalBliss Brand.",
    },
    {
      name: "keywords",
      content:
        "Anuoluwapo Bliss, The GlobalBliss Brand, about GlobalBliss, creative designer Nigeria, website developer Nigeria, brand strategist Nigeria, graphic designer portfolio",
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
      content: "About Anuoluwapo Bliss | The GlobalBliss Brand",
    },
    {
      property: "og:description",
      content:
        "Discover the creative journey, experience, education, and brand story behind The GlobalBliss Brand.",
    },
    {
      property: "og:url",
      content: "https://theglobalbliss.online/about",
    },
    {
      property: "og:type",
      content: "profile",
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
      content: "About Anuoluwapo Bliss | The GlobalBliss Brand",
    },
    {
      name: "twitter:description",
      content:
        "Learn about Anuoluwapo Bliss, a Nigerian creative designer, website developer, and brand strategist.",
    },
    {
      name: "twitter:image",
      content: "https://theglobalbliss.online/og-image.jpg",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://theglobalbliss.online/about",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Anuoluwapo Bliss",
        url: "https://theglobalbliss.online/about",
        description:
          "About page for Anuoluwapo Bliss, a Nigerian creative designer, website developer, brand strategist, and founder of The GlobalBliss Brand.",
        mainEntity: {
          "@type": "Person",
          name: "Anuoluwapo Bliss",
          alternateName: "The GlobalBliss",
          url: "https://theglobalbliss.online",
          image: "https://theglobalbliss.online/og-image.jpg",
          jobTitle: [
            "Creative Designer",
            "Website Developer",
            "Brand Strategist",
            "Brand Identity Designer",
          ],
          worksFor: {
            "@type": "Organization",
            name: "The GlobalBliss Brand",
            url: "https://theglobalbliss.online",
          },
          knowsAbout: [
            "Graphic Design",
            "Website Development",
            "Brand Identity Design",
            "Social Media Design",
            "Creative Direction",
            "Digital Strategy",
            "WordPress",
            "Nuxt.js",
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lagos",
            addressCountry: "Nigeria",
          },
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
            name: "About",
            item: "https://theglobalbliss.online/about",
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

    <AboutSection />
    <ResumeSection />
    <TestimonialSection />
    <HomeCtaArea />

    <Footer />
  </div>
</template>