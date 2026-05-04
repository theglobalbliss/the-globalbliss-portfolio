<script setup>
import { ref, onMounted } from "vue";
import profileImage from "~/assets/images/about/profile.png";

const aboutContent = ref({
  eyebrow: "Hello There!",
  title:
    "I’m Anuoluwapo Bliss, a creative designer and website developer building clean visuals, functional websites, and purposeful digital experiences for brands.",
  description:
    "I am a Nigerian-based creative with a strong eye for design, digital storytelling, and functional web experiences. My work sits at the intersection of creativity, strategy, and technology, helping brands show up with clarity, beauty, and confidence.",
  description_two:
    "Through The GlobalBliss Brand, I create brand visuals, social media designs, websites, and digital solutions that do more than look good. They communicate value, build trust, and help businesses connect better with their audience.",
  description_three:
    "Whether I am designing a brand identity, building a website, managing a digital presence, or shaping creative direction, my goal remains simple: to create work that is visually compelling, easy to use, and deeply intentional.",
  profile_image_url: "",
  name: "Anuoluwapo Bliss",
  role: "Creative Designer, Website Developer & Brand Strategist",
  availability_text:
    "Available for selected creative projects, website builds, and remote opportunities",
});

const isLoading = ref(true);

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return profileImage;

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    return imageUrl;
  }

  return `/${imageUrl}`;
};

const fetchAboutContent = async () => {
  isLoading.value = true;

  try {
    const supabase = useSupabase();

    const { data, error } = await supabase
      .from("about_content")
      .select(
        "id, section_key, eyebrow, title, description, description_two, description_three, profile_image_url, name, role, availability_text, updated_at"
      )
      .eq("section_key", "main")
      .single();

    if (error) {
      throw error;
    }

    if (data) {
      aboutContent.value = {
        eyebrow: data.eyebrow || aboutContent.value.eyebrow,
        title: data.title || aboutContent.value.title,
        description: data.description || aboutContent.value.description,
        description_two:
          data.description_two || aboutContent.value.description_two,
        description_three:
          data.description_three || aboutContent.value.description_three,
        profile_image_url:
          data.profile_image_url || aboutContent.value.profile_image_url,
        name: data.name || aboutContent.value.name,
        role: data.role || aboutContent.value.role,
        availability_text:
          data.availability_text || aboutContent.value.availability_text,
      };
    }
  } catch (error) {
    console.error("About content error:", error.message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchAboutContent();
});
</script>

<template>
  <section id="about" class="about-single-area innerpage-single-area">
    <div class="container">
      <div v-if="isLoading" class="container-inner text-center py-5">
        <p>Loading about content...</p>
      </div>

      <div v-else class="row align-items-center">
        <div class="col-lg-4">
          <div class="about-image-part wow fadeInUp delay-0-3s">
            <img
              :src="getImageUrl(aboutContent.profile_image_url)"
              :alt="aboutContent.name"
              fetchpriority="high"
              decoding="async"
            />

            <h2>{{ aboutContent.name }}</h2>
            <p>{{ aboutContent.role }}</p>
          </div>
        </div>

        <div class="col-lg-8">
          <div class="about-content-part wow fadeInUp delay-0-2s">
            <p>{{ aboutContent.eyebrow }}</p>

            <h2>{{ aboutContent.title }}</h2>

            <p>{{ aboutContent.description }}</p>

            <p>{{ aboutContent.description_two }}</p>

            <p>{{ aboutContent.description_three }}</p>

            <div class="adress-field">
              <ul>
                <li>
                  <i class="ri-circle-fill"></i>
                  {{ aboutContent.availability_text }}
                </li>
              </ul>
            </div>

            <div class="hero-btns">
              <NuxtLink to="/contact" class="theme-btn">
                Get In Touch <i class="ri-mail-send-line"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>