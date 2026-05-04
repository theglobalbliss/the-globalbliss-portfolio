<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  cls: String,
});

const portfolioData = ref([]);
const items = ref([]);
const activeCategory = ref("All");
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

const getProjectLink = (item) => {
  if (item.slug) {
    return `/single-project/${item.slug}`;
  }

  return `/single-project?id=${item.id}`;
};

const fetchProjects = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const supabase = useSupabase();

    const { data, error } = await supabase
      .from("projects")
      .select(
        "id, title, slug, category, description, image_url, is_featured, sort_order"
      )
      .eq("is_featured", true)
      .order("sort_order", { ascending: true })
      .limit(6);

    if (error) {
      throw error;
    }

    portfolioData.value = (data || []).map((project) => ({
      id: project.id,
      img: getProjectImage(project.image_url),
      category: project.category || "Project",
      title: project.title || "Untitled Project",
      description: project.description || "",
      project_url: "",
      client: "",
      year: "",
      service: project.category || "",
      slug: project.slug || "",
      is_featured: project.is_featured,
      sort_order: project.sort_order,
    }));

    items.value = portfolioData.value;
  } catch (error) {
    console.error("Error loading projects:", error.message);
    errorMessage.value = "Unable to load projects at the moment.";
  } finally {
    isLoading.value = false;
  }
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
                    <img
                      :src="item.img"
                      :alt="item.title"
                      loading="lazy"
                      decoding="async"
                    />

                    <NuxtLink
                      :to="getProjectLink(item)"
                      class="details-btn"
                      aria-label="View project"
                    >
                      <i class="ri-arrow-right-up-line"></i>
                    </NuxtLink>
                  </div>

                  <div class="project-content">
                    <span class="sub-title">
                      {{ item.category }}
                    </span>

                    <h3>
                      <NuxtLink :to="getProjectLink(item)">
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
  </div>
</template>