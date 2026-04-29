<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const scrollers = document.querySelectorAll(".scroller");

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation(scrollers);
  }

  function addAnimation(scrollers) {
    scrollers.forEach((scroller) => {
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
});
</script>

<template>
  <section id="about" class="about-area">
    <div class="container">
      <div class="row">
        <!-- START ABOUT IMAGE DESIGN AREA -->
        <div class="col-lg-4">
          <div class="about-image-part wow fadeInUp delay-0-3s">
            <img src="~/assets/images/about/profile.png" alt="Anuoluwapo Bliss" />

            <h2>Anuoluwapo Bliss</h2>
            <p>I am a Graphic Designer and Website Developer based in Nigeria</p>

            <div class="about-social text-center">
              <ul>
                <li>
                  <a href="https://www.facebook.com/profile.php?id=61574968987811" target="_blank">
                    <i class="ri-facebook-circle-fill"></i>
                  </a>
                </li>

                <li>
                  <a href="https://x.com/anuoluwapobliss" target="_blank">
                    <i class="ri-twitter-x-line"></i>
                  </a>
                </li>

                <li>
                  <a href="https://linkedin.com" target="_blank">
                    <i class="ri-linkedin-fill"></i>
                  </a>
                </li>

                <li>
                  <a href="https://github.com/theglobalbliss" target="_blank">
                    <i class="ri-github-line"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- / END ABOUT IMAGE DESIGN AREA -->

        <!-- START ABOUT TEXT DESIGN AREA -->
        <div class="col-lg-8">
          <div class="about-content-part wow fadeInUp delay-0-2s">
            <p>Hello There!</p>

            <h2>
              {{"I'm"}} Anuoluwapo Bliss, a graphic designer and website developer creating clean,
              visually compelling designs and functional websites with purpose and precision.
            </h2>

            <div class="adress-field">
              <ul>
                <li>
                  <i class="ri-circle-fill"></i>
                  Available for Freelancing and Remote Employment
                </li>
              </ul>
            </div>

            <div class="hero-btns">
              <a
                href="/files/Anuoluwapo-Bliss-CV.pdf"
                download="Anuoluwapo-Bliss-CV.pdf"
                class="theme-btn"
              >
                Download CV <i class="ri-download-line"></i>
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
        <!-- / END ABOUT TEXT DESIGN AREA -->
      </div>
    </div>
  </section>
</template>