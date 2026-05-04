<script setup>
import { ref, onMounted } from "vue";

const ctaContent = ref({
  title: "Are You Ready to kickstart your project with a touch of bliss?",
  subtitle: "Let's create something beautiful together.",
  body: "Reach out and let's make it happen ✨. I'm also available for full-time or part-time opportunities to push the boundaries of design and deliver exceptional work.",
  button_text: "Let's Talk",
  button_url: "https://wa.me/2348052641636",
});

const fetchCtaContent = async () => {
  const { getHomepageSection } = useHomepageContent();

  const data = await getHomepageSection("cta");

  if (data) {
    ctaContent.value = {
      title: data.title || ctaContent.value.title,
      subtitle: data.subtitle || ctaContent.value.subtitle,
      body: data.body || ctaContent.value.body,
      button_text: data.button_text || ctaContent.value.button_text,
      button_url: data.button_url || ctaContent.value.button_url,
    };
  }
};

onMounted(() => {
  fetchCtaContent();
});
</script>

<template>
  <section class="call-to-action-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="call-to-action-part wow fadeInUp delay-0-2s text-center">
            <p v-if="ctaContent.subtitle">
              {{ ctaContent.subtitle }}
            </p>

            <h2>
              {{ ctaContent.title }}
            </h2>

            <p>
              {{ ctaContent.body }}
            </p>

            <div class="hero-btns">
              <a
                :href="ctaContent.button_url"
                target="_blank"
                rel="noopener noreferrer"
                class="theme-btn"
              >
                {{ ctaContent.button_text }}
                <i class="ri-whatsapp-line"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>