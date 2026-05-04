<script setup>
import ImagePopup from "~/components/common/ImagePopup.vue";

const route = useRoute();

const project = ref(null);
const galleryImages = ref([]);
const image_popup = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");

const fallbackImage = "/images/projects/work1.jpg";
const siteUrl = "https://theglobalbliss.online";

const getDisplayImageUrl = (imageUrl) => {
  if (!imageUrl) return fallbackImage;

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    return imageUrl;
  }

  return `/${imageUrl}`;
};

const getSeoImageUrl = (imageUrl) => {
  if (!imageUrl) return `${siteUrl}/og-image.jpg`;

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    return `${siteUrl}${imageUrl}`;
  }

  return `${siteUrl}/${imageUrl}`;
};

const stripHtml = (text) => {
  if (!text) return "";

  return text
    .replace(/<[^>]*>?/gm, "")
    .replace(/\s+/g, " ")
    .trim();
};

const getSeoDescription = (data) => {
  const description =
    data.description ||
    `Explore ${data.title}, a creative project by The GlobalBliss Brand, crafted by Anuoluwapo Bliss.`;

  const cleanDescription = stripHtml(description);

  return cleanDescription.length > 160
    ? `${cleanDescription.substring(0, 157)}...`
    : cleanDescription;
};

const galleryPopupImages = computed(() => {
  return galleryImages.value.map((image) =>
    getDisplayImageUrl(image.image_url)
  );
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
    .select("id, image_url, sort_order, project_id")
    .eq("project_id", Number(projectId))
    .order("sort_order", { ascending: true })
    .limit(12);

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

  try {
    const supabase = useSupabase();

    const projectId = route.query.id;
    const projectSlug = route.params.slug;

    let query = supabase
      .from("projects")
      .select(
        "id, title, slug, category, description, image_url, project_url, client, year, service, created_at, updated_at, sort_order, is_featured"
      );

    if (projectSlug) {
      query = query.eq("slug", projectSlug);
    } else if (projectId) {
      query = query.eq("id", Number(projectId));
    } else {
      throw new Error("Project not found.");
    }

    const { data, error } = await query.single();

    if (error || !data) {
      throw new Error("Project not found.");
    }

    project.value = data;

    await fetchGalleryImages(data.id);

    const seoTitle = `${data.title} | The GlobalBliss Brand Portfolio`;
    const seoDescription = getSeoDescription(data);
    const seoImage = getSeoImageUrl(data.image_url);
    const canonicalUrl = data.slug
      ? `${siteUrl}/single-project/${data.slug}`
      : `${siteUrl}/single-project?id=${data.id}`;

    useHead({
      title: seoTitle,
      meta: [
        {
          name: "description",
          content: seoDescription,
        },
        {
          name: "keywords",
          content: `${data.title}, ${data.category || "creative project"}, ${
            data.service || "portfolio project"
          }, The GlobalBliss Brand, Anuoluwapo Bliss, website design, brand identity design, creative design Nigeria`,
        },
        {
          name: "author",
          content: "Anuoluwapo Bliss",
        },
        {
          name: "robots",
          content: "index, follow",
        },
        {
          property: "og:title",
          content: seoTitle,
        },
        {
          property: "og:description",
          content: seoDescription,
        },
        {
          property: "og:url",
          content: canonicalUrl,
        },
        {
          property: "og:type",
          content: "article",
        },
        {
          property: "og:site_name",
          content: "The GlobalBliss Brand",
        },
        {
          property: "og:image",
          content: seoImage,
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: seoTitle,
        },
        {
          name: "twitter:description",
          content: seoDescription,
        },
        {
          name: "twitter:image",
          content: seoImage,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: canonicalUrl,
        },
      ],
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: data.title,
            description: seoDescription,
            image: seoImage,
            url: canonicalUrl,
            creator: {
              "@type": "Person",
              name: "Anuoluwapo Bliss",
              url: siteUrl,
            },
            publisher: {
              "@type": "Organization",
              name: "The GlobalBliss Brand",
              url: siteUrl,
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/og-image.jpg`,
              },
            },
            dateCreated: data.created_at || "",
            dateModified: data.updated_at || data.created_at || "",
            genre: data.category || "Creative Project",
            about: data.service || data.category || "Creative Design",
          }),
        },
      ],
    });
  } catch (error) {
    errorMessage.value = error.message || "Project not found.";

    useHead({
      title: "Project Not Found | The GlobalBliss Brand",
      meta: [
        {
          name: "robots",
          content: "noindex, follow",
        },
      ],
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  const wow = await import("wow.js");
  new wow.default().init();

  fetchProject();
});
</script>

<template>
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
            :src="getDisplayImageUrl(project.image_url)"
            :alt="project.title"
            fetchpriority="high"
            decoding="async"
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
                        :src="getDisplayImageUrl(image.image_url)"
                        :alt="project.title"
                        loading="lazy"
                        decoding="async"
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

    <ImagePopup
      ref="image_popup"
      :images="galleryPopupImages"
    />
  </section>
</template>