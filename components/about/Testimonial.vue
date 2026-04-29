
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, EffectFade } from "swiper/modules";

</script> 


<template>
  <section class="testimonials-area">
    <div class="container">
      <div class="container-inner">
        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="section-title text-center wow fadeInUp delay-0-2s">
              <p>Testimonials</p>
              <h2>What clients say!</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <Swiper
              :slidesPerView="2"
              :spaceBetween="30"
              :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
              }"
              :modules="[Navigation, EffectFade]"
              :navigation="{
                nextEl: '.testimonial-next',
                prevEl: '.testimonial-prev',
              }"
              class="testimonials-wrap"
            >
              <!-- START SINGLE TESTIMONIALS DESIGN AREA -->
              <SwiperSlide class="testimonial-item wow fadeInUp delay-0-3s">
                <div class="author">
                  <img
                    src="assets/images/testimonials/author2.jpg"
                    alt="Author"
                  />
                </div>
                <div class="text">
                  We are happy to work with GlobalBliss. Their expertise, combined
                  with the client’s vision, brings great ideas to life especially 
                  in the areas of website development and management.
                  We are pleased to partner with them.
                </div>
                <div class="testi-des">
                  <h5>Gbenga Oloniniran</h5>
                  <span>Executive Director/Editor-In-Chief, Third Lens Media</span>
                </div>
              </SwiperSlide>
              <!-- / END SINGLE TESTIMONIALS DESIGN AREA -->
              <!-- START SINGLE TESTIMONIALS DESIGN AREA -->
              <SwiperSlide class="testimonial-item wow fadeInUp delay-0-4s">
                <div class="author">
                  <img
                    src="assets/images/testimonials/author1.jpg"
                    alt="Author"
                  />
                </div>
                <div class="text">
                  Working with Bliss has been a really smooth experience. 
                  He understands the creative direction quickly and knows how to bring 
                  ideas to life in a clean, professional, and visually appealing way.
                  From designs to website work, he pays attention to the little details 
                  and always delivers with purpose. He is reliable, creative, and easy to 
                  work with, and we truly appreciate the value he brings to every project.
                </div>
                <div class="testi-des">
                  <h5>Abiola Clay</h5>
                  <span>Executive Director, Clayheart Studios</span>
                </div>
              </SwiperSlide>
              <!-- / END SINGLE TESTIMONIALS DESIGN AREA -->
            </Swiper>
            <div
              class="slider-arrows wow fadeInUp delay-0-6s text-center pt-40"
            >
              <button class="testimonial-prev arrow">
                <i class="ri-arrow-left-s-line"></i>
              </button>
              <button class="testimonial-next arrow">
                <i class="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

 