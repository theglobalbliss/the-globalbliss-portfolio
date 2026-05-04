<script setup>
import Footer from "~/layouts/Footer.vue";
import Header from "~/layouts/Header.vue";

const route = useRoute();

const post = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");

const fallbackImage = "/images/projects/work1.jpg";

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

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const fetchPost = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  const { getBlogPostBySlug } = useBlogPosts();

  const data = await getBlogPostBySlug(route.params.slug);

  if (!data) {
    errorMessage.value = "Blog post not found.";
    isLoading.value = false;
    return;
  }

  post.value = data;

  useHead({
    title: `${data.title} - The GlobalBliss Brand`,
    meta: [
      {
        name: "description",
        content:
          data.excerpt ||
          data.description ||
          "Read from The GlobalBliss Brand blog.",
      },
      {
        property: "og:title",
        content: `${data.title} - The GlobalBliss Brand`,
      },
      {
        property: "og:description",
        content:
          data.excerpt ||
          data.description ||
          "Read from The GlobalBliss Brand blog.",
      },
      {
        property: "og:image",
        content: getImageUrl(data.image_url),
      },
    ],
  });

  isLoading.value = false;
};

onMounted(async () => {
  const wow = await import("wow.js");
  new wow.default().init();

  fetchPost();
});
</script>

<template>
  <div>

    <CommonScrollTop />
    <Header />

    <section class="innerpage-area">
      <div class="container">
        <div class="container-inner">
          <div v-if="isLoading" class="text-center py-5">
            <p>Loading blog post...</p>
          </div>

          <div v-else-if="errorMessage" class="text-center py-5">
            <h2>{{ errorMessage }}</h2>

            <NuxtLink to="/blog" class="theme-btn mt-3">
              Back to Blog
            </NuxtLink>
          </div>

          <article v-else class="gb-single-blog">
            <NuxtLink to="/blog" class="read-more mb-4 d-inline-flex">
              <i class="ri-arrow-left-line"></i>
              Back to Blog
            </NuxtLink>

            <div class="gb-single-blog-hero wow fadeInUp delay-0-2s">
              <img
                :src="getImageUrl(post.image_url)"
                :alt="post.title"
              />
            </div>

            <div class="gb-single-blog-content wow fadeInUp delay-0-3s">
              <div class="gb-blog-meta mb-3">
                <span>{{ post.category || "Brand Story" }}</span>
                <span>{{ formatDate(post.created_at) }}</span>
              </div>

              <h1>
                {{ post.title }}
              </h1>

              <p
                v-if="post.excerpt || post.description"
                class="gb-single-blog-excerpt"
              >
                {{ post.excerpt || post.description }}
              </p>

              <div class="gb-single-blog-body">
                <p style="white-space: pre-line;">
                  {{ post.content || post.body || post.description }}
                </p>
              </div>

              <div class="gb-single-blog-footer">
                <NuxtLink to="/blog" class="theme-btn">
                  More Blog Posts
                  <i class="ri-arrow-right-up-line"></i>
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <HomeCtaArea />
    <Footer />
  </div>
</template>