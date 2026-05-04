<script setup>
import { onMounted, ref } from "vue";

const aboutContent = ref({
  title: "I'm Anuoluwapo Bliss, a graphic designer and website developer creating clean, visually compelling designs and functional websites with purpose and precision.",
  subtitle: "Hello There!",
  body: "Available for Freelancing and Remote Employment",
  button_text: "Download CV",
  button_url: "/files/Anuoluwapo-Bliss-CV.pdf",
});

const socialLinks = ref({
  facebook_url: "https://www.facebook.com/profile.php?id=61574968987811",
  twitter_url: "https://x.com/anuoluwapobliss",
  linkedin_url: "https://linkedin.com",
  github_url: "https://github.com/theglobalbliss",
});

const fetchAboutContent = async () => {
  const { getHomepageSection } = useHomepageContent();

  const data = await getHomepageSection("about");

  if (data) {
    aboutContent.value = {
      title: data.title || aboutContent.value.title,
      subtitle: data.subtitle || aboutContent.value.subtitle,
      body: data.body || aboutContent.value.body,
      button_text: data.button_text || aboutContent.value.button_text,
      button_url: data.button_url || aboutContent.value.button_url,
    };
  }
};

const fetchSocialLinks = async () => {
  const { getSiteSettings } = useSiteSettings();

  const settings = await getSiteSettings();

  socialLinks.value = {
    facebook_url: settings.facebook_url || socialLinks.value.facebook_url,
    twitter_url: settings.twitter_url || socialLinks.value.twitter_url,
    linkedin_url: settings.linkedin_url || socialLinks.value.linkedin_url,
    github_url: settings.github_url || socialLinks.value.github_url,
  };
};

const setupScrollerAnimation = () => {
  const scrollers = document.querySelectorAll(".scroller");

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation(scrollers);
  }

  function addAnimation(scrollers) {
    scrollers.forEach((scroller) => {
      if (scroller.getAttribute("data-animated") === "true") return;

      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".scroller__inner");

      if (!scrollerInner) return;

      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }
};

onMounted(async () => {
  await fetchAboutContent();
  await fetchSocialLinks();
  setupScrollerAnimation();
});
</script>

<template>
  <section id="about" class="about-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="about-image-part wow fadeInUp delay-0-3s">
            <img src="~/assets/images/about/profile.png" alt="Anuoluwapo Bliss" />

            <h2>Anuoluwapo Bliss</h2>
            <p>I am a Graphic Designer and Website Developer based in Nigeria</p>

            <div class="about-social text-center">
              <ul>
                <li v-if="socialLinks.facebook_url">
                  <a :href="socialLinks.facebook_url" target="_blank">
                    <i class="ri-facebook-circle-fill"></i>
                  </a>
                </li>

                <li v-if="socialLinks.twitter_url">
                  <a :href="socialLinks.twitter_url" target="_blank">
                    <i class="ri-twitter-x-line"></i>
                  </a>
                </li>

                <li v-if="socialLinks.linkedin_url">
                  <a :href="socialLinks.linkedin_url" target="_blank">
                    <i class="ri-linkedin-fill"></i>
                  </a>
                </li>

                <li v-if="socialLinks.github_url">
                  <a :href="socialLinks.github_url" target="_blank">
                    <i class="ri-github-line"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-lg-8">
          <div class="about-content-part wow fadeInUp delay-0-2s">
            <p>{{ aboutContent.subtitle }}</p>

            <h2>
              {{ aboutContent.title }}
            </h2>

            <div class="adress-field">
              <ul>
                <li>
                  <i class="ri-circle-fill"></i>
                  {{ aboutContent.body }}
                </li>
              </ul>
            </div>

            <div class="hero-btns">
              <a
                :href="aboutContent.button_url"
                :download="aboutContent.button_url.includes('.pdf') ? 'Anuoluwapo-Bliss-CV.pdf' : null"
                class="theme-btn"
              >
                {{ aboutContent.button_text }}
                <i class="ri-download-line"></i>
              </a>
            </div>
          </div>

          <div class="about-content-part-bottom wow fadeInUp delay-0-2s">
            <h2>Companies I've Worked With</h2>

            <div class="company-list">
              <div class="scroller" data-direction="left" data-speed="slow">
                <div class="scroller__inner">
                  <img src="~/assets/images/client-logos/partner1.png" alt="Clayheart Studios" />
                  <img src="~/assets/images/client-logos/partner2.png" alt="Amicable Finserv" />
                  <img src="~/assets/images/client-logos/partner3.png" alt="Media Force" />
                  <img src="~/assets/images/client-logos/partner4.png" alt="Third Lens" />
                  <img src="~/assets/images/client-logos/partner5.png" alt="Ignite" />
                  <img src="~/assets/images/client-logos/partner6.png" alt="GWA" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>