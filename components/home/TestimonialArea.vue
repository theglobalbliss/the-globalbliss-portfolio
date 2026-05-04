<script setup>
import { ref, onMounted } from "vue";

const testimonials = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

const fallbackTestimonials = [
  {
    id: 1,
    name: "Client Review",
    role: "Brand Client",
    company: "The GlobalBliss Brand",
    message:
      "Working with GlobalBliss was smooth, creative, and professional. The design direction was clear, intentional, and beautifully executed.",
    image_url: "",
    rating: 5,
  },
];

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return "";

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    return imageUrl;
  }

  return `/${imageUrl}`;
};

const getInitials = (name) => {
  if (!name) return "GB";

  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const fetchTestimonials = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  const { getTestimonials } = useTestimonials();

  const data = await getTestimonials();

  if (!data || data.length === 0) {
    testimonials.value = fallbackTestimonials;
    isLoading.value = false;
    return;
  }

  testimonials.value = data.map((item, index) => ({
    id: item.id || index + 1,
    name: item.name || "Client Review",
    role: item.role || "",
    company: item.company || "",
    message: item.message || item.content || "",
    image_url: item.image_url || "",
    rating: item.rating || 5,
    sort_order: item.sort_order || index + 1,
  }));

  isLoading.value = false;
};

const getDelayClass = (index) => {
  const delays = ["delay-0-2s", "delay-0-4s", "delay-0-6s"];
  return delays[index % delays.length];
};

onMounted(() => {
  fetchTestimonials();
});
</script>

<template>
  <section id="testimonials" class="testimonials-area innerpage-single-area">
    <div class="container">
      <div class="container-inner">
        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="section-title text-center wow fadeInUp delay-0-2s">
              <p>Testimonials</p>
              <h2>What People Say</h2>
            </div>
          </div>
        </div>

        <div v-if="isLoading" class="text-center py-5">
          <p>Loading testimonials...</p>
        </div>

        <div v-else-if="errorMessage" class="text-center py-5">
          <p>{{ errorMessage }}</p>
        </div>

        <div v-else class="row">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.id"
            class="col-lg-4 col-md-6"
          >
            <div
              :class="`testimonial-item wow fadeInUp ${getDelayClass(index)}`"
            >
              <div class="testimonial-top">
                <div class="testimonial-avatar">
                  <img
                    v-if="testimonial.image_url"
                    :src="getImageUrl(testimonial.image_url)"
                    :alt="testimonial.name"
                  />

                  <span v-else>
                    {{ getInitials(testimonial.name) }}
                  </span>
                </div>

                <div>
                  <h4>{{ testimonial.name }}</h4>

                  <p>
                    <span v-if="testimonial.role">{{ testimonial.role }}</span>
                    <span v-if="testimonial.role && testimonial.company">, </span>
                    <span v-if="testimonial.company">{{ testimonial.company }}</span>
                  </p>
                </div>
              </div>

              <div class="testimonial-stars">
                <i
                  v-for="star in Number(testimonial.rating)"
                  :key="star"
                  class="ri-star-fill"
                ></i>
              </div>

              <p class="testimonial-message">
                “{{ testimonial.message }}”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>