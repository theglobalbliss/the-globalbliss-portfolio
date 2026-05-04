<script setup>
import Header from "~/layouts/Header.vue";
import ImagePopup from "~/components/common/ImagePopup.vue";

const route = useRoute();

useHead({
  title: "Project Details - The GlobalBliss Brand",
});

const project = ref(null);
const galleryImages = ref([]);
const image_popup = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");

const fallbackImage = "/images/projects/work1.jpg";

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

const galleryPopupImages = computed(() => {
  return galleryImages.value.map((image) => getProjectImage(image.image_url));
});

const handleGalleryPopup = (index) => {
  if (image_popup.value) {
    image_popup.value.showImg(index);
  }
};

const fetchGalleryImages = async (projectId) => {
  const supabase = useSupabase();

  const { data, error } = await supabase
    .from("project_gallery")
    .select("*")
    .eq("project_id", Number(projectId))
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Gallery error:", error.message);
    galleryImages.value = [];
    return;
  }

  galleryImages.value = data || [];
};

const fetchProject = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  const projectId = route.query.id;

  if (!projectId) {
    errorMessage.value = "Project not found.";
    isLoading.value = false;
    return;
  }

  const supabase = useSupabase();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", Number(projectId))
    .single();

  if (error || !data) {
    errorMessage.value = "Project not found.";
    isLoading.value = false;
    return;
  }

  project.value = data;

  await fetchGalleryImages(projectId);

  useHead({
    title: `${data.title} - The GlobalBliss Brand`,
    meta: [
      {
        name: "description",
        content:
          data.description ||
          "View project details from The GlobalBliss Brand portfolio.",
      },
      {
        property: "og:title",
        content: `${data.title} - The GlobalBliss Brand`,
      },
      {
        property: "og:description",
        content:
          data.description ||
          "View project details from The GlobalBliss Brand portfolio.",
      },
      {
        property: "og:image",
        content: getProjectImage(data.image_url),
      },
    ],
  });

  isLoading.value = false;
};

onMounted(async () => {
  const wow = await import("wow.js");
  new wow.default().init();

  fetchProject();
});
</script>

<template>
  <div>
    <CommonScrollTop />
    <Header />

    <section class="single-project-page-design">
      <div class="container">
        <div v-if="isLoading" class="container-inner text-center py-5">
          <p>Loading project...</p>
        </div>

        <div v-else-if="errorMessage" class="container-inner text-center py-5">
          <h2>{{ errorMessage }}</h2>

          <NuxtLink to="/works" class="theme-btn mt-3">
            Back to Works
            <i class="ri-arrow-right-up-line"></i>
          </NuxtLink>
        </div>

        <div v-else>
          <div class="row">
            <div class="col-lg-12 text-center pb-30">
              <p>
                {{ project.category || "Project" }} -
                The GlobalBliss Brand
              </p>

              <h1>
                {{ project.title }}
              </h1>
            </div>
          </div>

          <div class="single-project-image wow fadeInUp delay-0-2s">
            <img
              :src="getProjectImage(project.image_url)"
              :alt="project.title"
            />
          </div>

          <div class="container pt-30">
            <div class="row">
              <div class="col-lg-4">
                <div class="single-project-page-left wow fadeInUp delay-0-2s">
                  <div class="single-info">
                    <p>Year</p>
                    <h3>{{ project.year || "Not specified" }}</h3>
                  </div>

                  <div class="single-info">
                    <p>Client</p>
                    <h3>{{ project.client || "The GlobalBliss Brand" }}</h3>
                  </div>

                  <div class="single-info">
                    <p>Services</p>
                    <h3>
                      {{ project.service || project.category || "Creative Design" }}
                    </h3>
                  </div>

                  <div class="single-info">
                    <p>Project</p>
                    <h3>{{ project.category || "Creative" }}</h3>
                  </div>

                  <div v-if="project.project_url" class="single-info">
                    <p>Live Link</p>

                    <a
                      :href="project.project_url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="theme-btn mt-2"
                    >
                      Visit Project
                      <i class="ri-arrow-right-up-line"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-lg-8">
                <div class="single-project-page-right wow fadeInUp delay-0-4s">
                  <h2>Description</h2>

                  <p style="white-space: pre-line;">
                    {{
                      project.description ||
                      "This project is part of The GlobalBliss Brand portfolio, crafted with attention to detail, visual clarity, and creative direction."
                    }}
                  </p>
                </div>
              </div>
            </div>

            <div v-if="galleryImages.length" class="row pt-30">
              <div class="col-lg-12">
                <div class="single-project-page-right wow fadeInUp delay-0-2s">
                  <h2>Project Gallery</h2>

                  <div class="row mt-4">
                    <div
                      v-for="(image, index) in galleryImages"
                      :key="image.id"
                      class="col-lg-6 col-md-6"
                    >
                      <div
                        class="single-image single-gallery-click"
                        @click="handleGalleryPopup(index)"
                      >
                        <img
                          :src="getProjectImage(image.image_url)"
                          :alt="project.title"
                        />

                        <span class="single-gallery-view">
                          View Full Image
                          <i class="ri-arrow-right-up-line"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="row pt-30">
              <div class="col-lg-12">
                <div class="single-project-page-right wow fadeInUp delay-0-2s">
                  <h2>Project Preview</h2>

                  <p class="text-muted mb-0">
                    Gallery images have not been added for this project yet.
                  </p>
                </div>
              </div>
            </div>

            <div class="row pt-30">
              <div class="col-lg-12 text-center">
                <NuxtLink to="/works" class="theme-btn">
                  Back to Works
                  <i class="ri-arrow-left-line"></i>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <HomeCtaArea />

    <ImagePopup
      ref="image_popup"
      :images="galleryPopupImages"
    />
  </div>
</template>