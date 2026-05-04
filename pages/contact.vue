<script setup>
import Footer from "~/layouts/Footer.vue";
import Header from "~/layouts/Header.vue";

useHead({
  title: "Contact Anuoluwapo Bliss | The GlobalBliss Brand",
  meta: [
    {
      name: "description",
      content:
        "Contact Anuoluwapo Bliss of The GlobalBliss Brand for website design, brand identity design, social media design, creative direction, and digital projects.",
    },
    {
      name: "keywords",
      content:
        "contact Anuoluwapo Bliss, contact GlobalBliss, website designer Nigeria contact, graphic designer Nigeria contact, brand identity designer Nigeria",
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
      content: "Contact Anuoluwapo Bliss | The GlobalBliss Brand",
    },
    {
      property: "og:description",
      content:
        "Reach out to The GlobalBliss Brand for clean designs, functional websites, brand visuals, and creative digital solutions.",
    },
    {
      property: "og:url",
      content: "https://theglobalbliss.online/contact",
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
      content: "Contact Anuoluwapo Bliss | The GlobalBliss Brand",
    },
    {
      name: "twitter:description",
      content:
        "Let’s work on your next website, brand identity, social media design, or creative project.",
    },
    {
      name: "twitter:image",
      content: "https://theglobalbliss.online/og-image.jpg",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://theglobalbliss.online/contact",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Anuoluwapo Bliss",
        url: "https://theglobalbliss.online/contact",
        description:
          "Contact page for The GlobalBliss Brand, the creative portfolio of Anuoluwapo Bliss.",
        mainEntity: {
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
          email: "theglobalbliss@gmail.com",
          telephone: "+2349064089633",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lagos",
            addressCountry: "Nigeria",
          },
          worksFor: {
            "@type": "Organization",
            name: "The GlobalBliss Brand",
            url: "https://theglobalbliss.online",
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
            name: "Contact",
            item: "https://theglobalbliss.online/contact",
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

    <Contact />
    <HomeCtaArea />

    <Footer />
  </div>
</template>