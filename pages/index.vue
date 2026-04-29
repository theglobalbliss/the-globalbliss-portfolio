
<script setup>
 
import Footer from "~/layouts/Footer.vue";
import Header from "~/layouts/Header.vue";

useHead({
  title: "The Global Bliss Brand - Home of endless creative possibilities",
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


 