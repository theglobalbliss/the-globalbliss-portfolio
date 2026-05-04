<script setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

const testimonials = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

const fallbackImage = "/images/testimonials/author1.jpg";

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return fallbackImage;

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    return imageUrl;
  }

  return `/${imageUrl}`;
};

const fetchTestimonials = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const supabase = useSupabase();

    const { data, error } = await supabase
      .from("testimonials")
      .select(
        "id, name, role, company, message, content, image_url, sort_order, is_active, updated_at"
      )
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .limit(9);

    if (error) {
      throw error;
    }

    testimonials.value = data || [];
  } catch (error) {
    console.error("Testimonials error:", error.message);
    errorMessage.value = "Unable to load testimonials at the moment.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchTestimonials();
});
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

        <div v-if="isLoading" class="text-center py-5">
          <p>Loading testimonials...</p>
        </div>

        <div v-else-if="errorMessage" class="text-center py-5">
          <p>{{ errorMessage }}</p>
        </div>

        <div v-else-if="testimonials.length" class="row">
          <div class="col-lg-12">
            <Swiper
              :slidesPerView="2"
              :spaceBetween="30"
              :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
              }"
              :modules="[Navigation, EffectFade, Autoplay]"
              :navigation="{
                nextEl: '.testimonial-next',
                prevEl: '.testimonial-prev',
              }"
              :breakpoints="{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                992: {
                  slidesPerView: 2,
                },
              }"
              class="testimonials-wrap"
            >
              <SwiperSlide
                v-for="testimonial in testimonials"
                :key="testimonial.id"
                class="testimonial-item wow fadeInUp delay-0-3s"
              >
                <div class="author">
                  <img
                    :src="getImageUrl(testimonial.image_url)"
                    :alt="testimonial.name || 'Client testimonial'"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div class="text">
                  {{
                    testimonial.message ||
                    testimonial.content ||
                    "This client shared a kind testimonial about working with The GlobalBliss Brand."
                  }}
                </div>

                <div class="testi-des">
                  <h5>{{ testimonial.name || "Client" }}</h5>

                  <span>
                    <template v-if="testimonial.role">
                      {{ testimonial.role }}
                    </template>

                    <template v-if="testimonial.role && testimonial.company">
                      ,
                    </template>

                    <template v-if="testimonial.company">
                      {{ testimonial.company }}
                    </template>
                  </span>
                </div>
              </SwiperSlide>
            </Swiper>

            <div class="slider-arrows wow fadeInUp delay-0-6s text-center pt-40">
              <button class="testimonial-prev arrow">
                <i class="ri-arrow-left-s-line"></i>
              </button>

              <button class="testimonial-next arrow">
                <i class="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-5">
          <p>No testimonials available yet.</p>
        </div>
      </div>
    </div>
  </section>
</template>