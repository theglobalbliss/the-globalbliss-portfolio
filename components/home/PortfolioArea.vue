<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  cls: String,
});

const supabase = useSupabase();

const projects = ref([]);
const filteredProjects = ref([]);
const activeCategory = ref("All");

const isLoading = ref(true);
const errorMessage = ref("");

const fallbackImage = "/images/projects/work1.jpg";

/**
 * Normalize image path safely
 */
const getImage = (url) => {
  if (!url) return fallbackImage;
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return url;
  return `/${url}`;
};

/**
 * Fetch ALL projects (NO LIMIT, NO FEATURE FILTER)
 * This fixes your “only 6 projects” issue
 */
const fetchProjects = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;

    if (!data || data.length === 0) {
      projects.value = [];
      filteredProjects.value = [];
      return;
    }

    projects.value = data.map((p) => ({
      id: p.id,
      title: p.title || "Untitled Project",
      category: p.category || "General",
      description: p.description || "",
      image: getImage(p.image_url),
      slug: p.slug,
    }));

    filteredProjects.value = projects.value;
  } catch (err) {
    console.error("Project fetch error:", err);
    errorMessage.value = "Unable to load projects. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

/**
 * Categories (auto-generated)
 */
const categories = computed(() => {
  const list = projects.value.map((p) => p.category);
  return ["All", ...new Set(list)];
});

/**
 * Filter logic
 */
const filterProjects = (category) => {
  activeCategory.value = category;

  if (category === "All") {
    filteredProjects.value = projects.value;
    return;
  }

  filteredProjects.value = projects.value.filter(
    (p) => p.category === category
  );
};

/**
 * Safe link handling
 */
const getLink = (item) => {
  return `/single-project?id=${item.id}`;
};

onMounted(() => {
  fetchProjects();
});
</script>

<template>
  <section :class="`portfolio-area ${props.cls || ''}`">
    <div class="container">

      <!-- TITLE -->
      <div class="text-center mb-4">
        <h2>Works & Projects</h2>
        <p>Selected creative works and brand projects.</p>
      </div>

      <!-- LOADING -->
      <div v-if="isLoading" class="text-center py-5">
        Loading projects...
      </div>

      <!-- ERROR -->
      <div v-else-if="errorMessage" class="text-center py-5">
        {{ errorMessage }}
      </div>

      <!-- CONTENT -->
      <div v-else>

        <!-- FILTER -->
        <div v-if="projects.length" class="mb-4 text-center">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="filterProjects(cat)"
            :class="['mx-2', activeCategory === cat ? 'active' : '']"
          >
            {{ cat }}
          </button>
        </div>

        <!-- GRID -->
        <div v-if="filteredProjects.length" class="row">

          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="col-lg-4 col-md-6 mb-4"
          >
            <div class="project-card">

              <img
                :src="project.image"
                :alt="project.title"
                loading="lazy"
              />

              <div class="p-3">
                <small>{{ project.category }}</small>

                <h3>{{ project.title }}</h3>

                <NuxtLink :to="getLink(project)">
                  View Project →
                </NuxtLink>
              </div>

            </div>
          </div>

        </div>

        <!-- EMPTY STATE -->
        <div v-else class="text-center py-5">
          No projects found.
        </div>

      </div>
    </div>
  </section>
</template>