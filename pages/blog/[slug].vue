<script setup>
import Footer from "~/layouts/Footer.vue";
import Header from "~/layouts/Header.vue";

const route = useRoute();

const post = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");

const fallbackImage = "/images/projects/work1.jpg";
const siteUrl = "https://theglobalbliss.online";

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return `${siteUrl}/og-image.jpg`;

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    return `${siteUrl}${imageUrl}`;
  }

  return `${siteUrl}/${imageUrl}`;
};

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

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
    data.excerpt ||
    data.description ||
    stripHtml(data.content) ||
    stripHtml(data.body) ||
    "Read insights on design, branding, websites, creativity, and digital strategy from The GlobalBliss Brand.";

  return description.length > 160
    ? `${description.substring(0, 157)}...`
    : description;
};

const fetchPost = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  const { getBlogPostBySlug } = useBlogPosts();

  const data = await getBlogPostBySlug(route.params.slug);

  if (!data) {
    errorMessage.value = "Blog post not found.";
    isLoading.value = false;

    useHead({
      title: "Blog Post Not Found | The GlobalBliss Brand",
      meta: [
        {
          name: "robots",
          content: "noindex, follow",
        },
      ],
    });

    return;
  }

  post.value = data;

  const seoTitle = `${data.title} | The GlobalBliss Brand`;
  const seoDescription = getSeoDescription(data);
  const seoImage = getImageUrl(data.image_url);
  const canonicalUrl = `${siteUrl}/blog/${data.slug || route.params.slug}`;

  useHead({
    title: seoTitle,
    meta: [
      {
        name: "description",
        content: seoDescription,
      },
      {
        name: "keywords",
        content:
          data.keywords ||
          `${data.title}, The GlobalBliss Brand, Anuoluwapo Bliss, design blog, branding, website design, creative strategy`,
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
        property: "article:author",
        content: "Anuoluwapo Bliss",
      },
      {
        property: "article:published_time",
        content: data.created_at || "",
      },
      {
        property: "article:modified_time",
        content: data.updated_at || data.created_at || "",
      },
      {
        property: "article:section",
        content: data.category || "Brand Story",
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
          "@type": "BlogPosting",
          headline: data.title,
          description: seoDescription,
          image: seoImage,
          datePublished: data.created_at || "",
          dateModified: data.updated_at || data.created_at || "",
          author: {
            "@type": "Person",
            name: "Anuoluwapo Bliss",
            url: siteUrl,
          },
          publisher: {
            "@type": "Organization",
            name: "The GlobalBliss Brand",
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/og-image.jpg`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
          },
        }),
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
                :src="getDisplayImageUrl(post.image_url)"
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