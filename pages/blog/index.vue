<script setup>
import Footer from "~/layouts/Footer.vue";
import Header from "~/layouts/Header.vue";

useHead({
  title: "Blog - The GlobalBliss Brand",
});

const posts = ref([]);
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

const fetchPosts = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const { getBlogPosts } = useBlogPosts();

    const data = await getBlogPosts();

    posts.value = data || [];
  } catch (error) {
    errorMessage.value = "Unable to load blog posts at the moment.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  const wow = await import("wow.js");
  new wow.default().init();

  fetchPosts();
});
</script>

<template>
  <div>
    <CommonScrollTop />
    <Header />

    <section class="innerpage-area">
      <div class="container">
        <div class="container-inner">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title text-center wow fadeInUp delay-0-2s">
                <p>Blog</p>

                <h2>Thoughts, Stories & Updates</h2>

                <p>
                  Fresh notes on design, branding, websites, creativity, and
                  the GlobalBliss journey.
                </p>
              </div>
            </div>
          </div>

          <div v-if="isLoading" class="text-center py-5">
            <p>Loading blog posts...</p>
          </div>

          <div v-else-if="errorMessage" class="text-center py-5">
            <p>{{ errorMessage }}</p>
          </div>

          <div v-else-if="posts.length === 0" class="text-center py-5">
            <p>No blog post has been published yet.</p>
          </div>

          <div v-else class="row">
            <div
              v-for="post in posts"
              :key="post.id"
              class="col-lg-4 col-md-6"
            >
              <article class="gb-blog-card wow fadeInUp delay-0-2s">
                <NuxtLink
                  :to="`/blog/${post.slug}`"
                  class="gb-blog-image"
                >
                  <img
                    :src="getImageUrl(post.image_url)"
                    :alt="post.title"
                  />
                </NuxtLink>

                <div class="gb-blog-content">
                  <div class="gb-blog-meta">
                    <span>{{ post.category || "Brand Story" }}</span>
                    <span>{{ formatDate(post.created_at) }}</span>
                  </div>

                  <h3>
                    <NuxtLink :to="`/blog/${post.slug}`">
                      {{ post.title }}
                    </NuxtLink>
                  </h3>

                  <p>
                    {{
                      post.excerpt ||
                      post.description ||
                      "Read more from The GlobalBliss Brand."
                    }}
                  </p>

                  <NuxtLink
                    :to="`/blog/${post.slug}`"
                    class="read-more"
                  >
                    Read More
                    <i class="ri-arrow-right-up-line"></i>
                  </NuxtLink>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <HomeCtaArea />
    <Footer />
  </div>
</template>