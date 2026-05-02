<script setup>
import { ref, computed, onMounted } from "vue";
import { createClient } from "@supabase/supabase-js";
import ImagePopup from "~/components/common/ImagePopup.vue";
import "vue-easy-lightbox/external-css/vue-easy-lightbox.css";

const props = defineProps({
  cls: String,
});

const config = useRuntimeConfig();

const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseAnonKey
);

const portfolio_data = ref([]);
const items = ref([]);
const activeCategory = ref("All");
const image_popup = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");

const categories = computed(() => {
  return [
    "All",
    ...new Set(portfolio_data.value.map((item) => item.category)),
  ];
});

const fetchProjects = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("sort_order", { ascending: true });

  if (error) {
    errorMessage.value = "Unable to load projects at the moment.";
    isLoading.value = false;
    return;
  }

  portfolio_data.value = data.map((project) => ({
    id: project.id,
    img: project.image_url,
    category: project.category,
    title: project.title,
    description: project.description,
    project_url: project.project_url,
    client: project.client,
    year: project.year,
    service: project.service,
  }));

  items.value = portfolio_data.value;
  isLoading.value = false;
};

const filterItems = (cateItem) => {
  activeCategory.value = cateItem;

  if (cateItem === "All") {
    items.value = portfolio_data.value;
  } else {
    items.value = portfolio_data.value.filter(
      (item) => item.category === cateItem
    );
  }
};

function handleImagePopup(item) {
  const originalIndex = portfolio_data.value.findIndex(
    (project) => project.id === item.id
  );

  if (image_popup.value && originalIndex !== -1) {
    image_popup.value.showImg(originalIndex);
  }
}

onMounted(() => {
  fetchProjects();
});
</script>

<template>
  <div>
    <section id="portfolio" :class="`portfolio-area ${props.cls || ''}`">
      <div class="container">
        <div class="container-inner">
          <div class="row">
            <div class="col-xl-12 col-lg-12">
              <div class="section-title text-center wow fadeInUp delay-0-2s">
                <h2>Works & Projects</h2>
                <p>
                  Check out some of my projects, meticulously crafted with
                  love and dedication, each one reflecting the passion and soul I
                  poured into every detail.
                </p>
              </div>
            </div>
          </div>

          <div v-if="isLoading" class="text-center py-5">
            <p>Loading projects...</p>
          </div>

          <div v-else-if="errorMessage" class="text-center py-5">
            <p>{{ errorMessage }}</p>
          </div>

          <template v-else>
            <ul
              class="project-filter filter-btns-one justify-content-left pb-15 wow fadeInUp delay-0-2s"
            >
              <li v-for="(item, i) in categories" :key="i">
                <a
                  style="cursor: pointer"
                  @click="filterItems(item)"
                  :class="item === activeCategory ? 'current' : ''"
                >
                  <span>{{ item }}</span>
                </a>
              </li>
            </ul>

            <div class="row project-masonry-active">
              <div
                v-for="item in items"
                :key="item.id"
                class="col-lg-4 col-md-6 item branding game"
              >
                <div class="project-item style-two wow fadeInUp delay-0-3s">
                  <div class="project-image">
                    <img :src="item.img" :alt="item.title" />

                    <a
                      style="cursor: pointer"
                      @click.prevent="handleImagePopup(item)"
                      class="details-btn"
                    >
                      <i class="ri-arrow-right-up-line"></i>
                    </a>
                  </div>

                  <div class="project-content">
                    <span class="sub-title">{{ item.category }}</span>
                    <h3>
                      <NuxtLink to="/single-project">
                        {{ item.title }}
                      </NuxtLink>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <ImagePopup
      ref="image_popup"
      :images="portfolio_data.map((item) => item.img)"
    />
  </div>
</template>