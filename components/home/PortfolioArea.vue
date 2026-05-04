<script setup>
import { ref, computed, onMounted } from "vue";
import ImagePopup from "~/components/common/ImagePopup.vue";
import "vue-easy-lightbox/external-css/vue-easy-lightbox.css";

const props = defineProps({
  cls: String,
});

const portfolioData = ref([]);
const items = ref([]);
const activeCategory = ref("All");
const image_popup = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");

const fallbackImage = "/images/projects/work1.jpg";

const categories = computed(() => {
  const cleanCategories = portfolioData.value
    .map((item) => item.category)
    .filter(Boolean);

  return ["All", ...new Set(cleanCategories)];
});

const getProjectImage = (imageUrl) => {
  if (!imageUrl) return fallbackImage;

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    return imageUrl;
  }

  return `/${imageUrl}`;
};

const fetchProjects = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  const supabase = useSupabase();

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

  portfolioData.value = (data || []).map((project) => ({
    id: project.id,
    img: getProjectImage(project.image_url),
    category: project.category || "Project",
    title: project.title || "Untitled Project",
    description: project.description || "",
    project_url: project.project_url || "",
    client: project.client || "",
    year: project.year || "",
    service: project.service || project.category || "",
    slug: project.slug || "",
    is_featured: project.is_featured,
    sort_order: project.sort_order,
  }));

  items.value = portfolioData.value;
  isLoading.value = false;
};

const filterItems = (category) => {
  activeCategory.value = category;

  if (category === "All") {
    items.value = portfolioData.value;
    return;
  }

  items.value = portfolioData.value.filter(
    (item) => item.category === category
  );
};

const handleImagePopup = (item) => {
  const originalIndex = portfolioData.value.findIndex(
    (project) => project.id === item.id
  );

  if (image_popup.value && originalIndex !== -1) {
    image_popup.value.showImg(originalIndex);
  }
};

const getProjectLink = (item) => {
  if (item.project_url) return item.project_url;

  if (item.slug) return `/single-project/${item.slug}`;

  return "/single-project";
};

const isExternalLink = (url) => {
  return url?.startsWith("http://") || url?.startsWith("https://");
};

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
                  Check out some of my projects, meticulously crafted with love
                  and dedication, each one reflecting the passion and soul I
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
              v-if="portfolioData.length"
              class="project-filter filter-btns-one justify-content-left pb-15 wow fadeInUp delay-0-2s"
            >
              <li v-for="category in categories" :key="category">
                <a
                  style="cursor: pointer"
                  @click="filterItems(category)"
                  :class="category === activeCategory ? 'current' : ''"
                >
                  <span>{{ category }}</span>
                </a>
              </li>
            </ul>

            <div v-if="items.length" class="row project-masonry-active">
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
                    <span class="sub-title">
                      {{ item.category }}
                    </span>

                    <h3>
                      <a
                        v-if="isExternalLink(getProjectLink(item))"
                        :href="getProjectLink(item)"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {{ item.title }}
                      </a>

                      <NuxtLink v-else :to="getProjectLink(item)">
                        {{ item.title }}
                      </NuxtLink>
                    </h3>

                    <p v-if="item.client || item.year" class="project-meta">
                      <span v-if="item.client">{{ item.client }}</span>
                      <span v-if="item.client && item.year"> · </span>
                      <span v-if="item.year">{{ item.year }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-5">
              <p>No projects available yet.</p>
            </div>
          </template>
        </div>
      </div>
    </section>

    <ImagePopup
      ref="image_popup"
      :images="portfolioData.map((item) => item.img)"
    />
  </div>
</template>