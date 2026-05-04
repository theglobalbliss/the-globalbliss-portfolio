<script setup>
import { ref, onMounted } from "vue";

const services = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

const fallbackServices = [
  {
    id: 1,
    title: "Website Design and Development",
    description:
      "I create clean and responsive websites that don’t just look good, but work smoothly and help brands show up professionally online.",
    icon: "ri-global-fill",
  },
  {
    id: 2,
    title: "Brand Identity Design",
    description:
      "I create clean, memorable brand identities that help businesses look professional, communicate clearly, and stand out with confidence.",
    icon: "ri-quill-pen-line",
  },
  {
    id: 3,
    title: "Social Media Design",
    description:
      "I create clean, engaging, and visually compelling social media designs that help brands communicate clearly, attract attention, and stay consistent online.",
    icon: "ri-pantone-fill",
  },
];

const getDelayClass = (index) => {
  const delays = ["delay-0-2s", "delay-0-4s", "delay-0-6s"];
  return delays[index % delays.length];
};

const fetchServices = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  const { getServices } = useServices();

  const data = await getServices();

  if (!data || data.length === 0) {
    services.value = fallbackServices;
    isLoading.value = false;
    return;
  }

  services.value = data.map((service, index) => ({
    id: service.id || index + 1,
    title: service.title || "Untitled Service",
    description: service.description || "",
    icon: service.icon || "ri-service-line",
    sort_order: service.sort_order || index + 1,
  }));

  isLoading.value = false;
};

onMounted(() => {
  fetchServices();
});
</script>

<template>
  <section id="services" class="services-area innerpage-single-area">
    <div class="container">
      <div class="container-inner">
        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="section-title text-center wow fadeInUp delay-0-2s">
              <p>Services</p>
              <h2>Quality Services Assured</h2>
            </div>
          </div>
        </div>

        <div v-if="isLoading" class="text-center py-5">
          <p>Loading services...</p>
        </div>

        <div v-else-if="errorMessage" class="text-center py-5">
          <p>{{ errorMessage }}</p>
        </div>

        <div v-else class="row">
          <div
            v-for="(service, index) in services"
            :key="service.id"
            class="col-lg-4 col-md-6"
          >
            <div
              :class="`service-item wow fadeInUp ${getDelayClass(index)}`"
            >
              <i :class="service.icon"></i>

              <h4>
                {{ service.title }}
              </h4>

              <p>
                {{ service.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>