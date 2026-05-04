<script setup>
import { ref, computed, onMounted } from "vue";

const resumeItems = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

const fallbackItems = [
  {
    id: "fallback-exp-1",
    item_type: "experience",
    years: "April 2026 - Present",
    title: "Website Manager",
    institution: "JDM Outreach, USA",
    description:
      "Managing website updates, content structure, and digital presence to support the organization’s online visibility and communication.",
    icon: "ri-briefcase-line",
    sort_order: 1,
  },
  {
    id: "fallback-exp-2",
    item_type: "experience",
    years: "2025 - Present",
    title: "Brand Designer",
    institution: "Amicable FinServ",
    description:
      "Creating brand visuals, identity assets, and digital designs that help communicate trust, growth, and financial confidence.",
    icon: "ri-palette-line",
    sort_order: 2,
  },
  {
    id: "fallback-exp-3",
    item_type: "experience",
    years: "2024 - Present",
    title: "Brand Designer & Website Developer",
    institution: "Clayheart Studios, NYC, USA",
    description:
      "Supporting creative projects through brand design, website development, digital storytelling, and visual direction across multiple client-facing projects.",
    icon: "ri-layout-4-line",
    sort_order: 3,
  },
  {
    id: "fallback-edu-1",
    item_type: "education",
    years: "2025 - Present",
    title: "Computer Science",
    institution: "Miva Open University",
    description:
      "Building deeper technical knowledge in software systems, programming logic, and modern digital technology.",
    icon: "ri-graduation-cap-line",
    sort_order: 1,
  },
  {
    id: "fallback-edu-2",
    item_type: "education",
    years: "2019 - 2024",
    title: "Management and Accounting",
    institution: "Obafemi Awolowo University, Ile-Ife",
    description:
      "Developed a strong foundation in business, finance, management, and analytical thinking, now applied across creative and digital strategy.",
    icon: "ri-bank-line",
    sort_order: 2,
  },
  {
    id: "fallback-edu-3",
    item_type: "education",
    years: "Continuous Learning",
    title: "Design, Web Development & Creative Technology",
    institution: "Self-Led Learning & Practice",
    description:
      "Continuously improving through real client projects, design experiments, frontend development, WordPress, Nuxt.js, and creative problem-solving.",
    icon: "ri-computer-line",
    sort_order: 3,
  },
];

const experienceItems = computed(() => {
  return resumeItems.value.filter((item) => item.item_type === "experience");
});

const educationItems = computed(() => {
  return resumeItems.value.filter((item) => item.item_type === "education");
});

const fetchResumeItems = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const supabase = useSupabase();

    const { data, error } = await supabase
      .from("resume_items")
      .select(
        "id, item_type, years, title, institution, description, icon, sort_order, is_active, updated_at"
      )
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .limit(12);

    if (error) {
      throw error;
    }

    resumeItems.value = data?.length ? data : fallbackItems;
  } catch (error) {
    console.error("Resume items error:", error.message);
    errorMessage.value = "Unable to load resume items.";
    resumeItems.value = fallbackItems;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchResumeItems();
});
</script>

<template>
  <section id="resume" class="resume-area">
    <div class="container">
      <div v-if="isLoading" class="container-inner text-center py-5">
        <p>Loading resume...</p>
      </div>

      <div v-else class="resume-items">
        <div class="row g-4">
          <div class="col-xl-6 col-md-6">
            <div class="single-resume">
              <h2>Experience</h2>

              <div class="experience-list">
                <div
                  v-for="item in experienceItems"
                  :key="item.id"
                  class="resume-item wow fadeInUp delay-0-3s"
                >
                  <div class="icon">
                    <i :class="item.icon || 'ri-briefcase-line'"></i>
                  </div>

                  <div class="content">
                    <span class="years">{{ item.years }}</span>
                    <h4>{{ item.title }}</h4>
                    <span class="company">{{ item.institution }}</span>

                    <p v-if="item.description" class="resume-desc">
                      {{ item.description }}
                    </p>
                  </div>
                </div>

                <p v-if="experienceItems.length === 0" class="text-muted mb-0">
                  No experience added yet.
                </p>
              </div>
            </div>
          </div>

          <div class="col-xl-6 col-md-6">
            <div class="single-resume">
              <h2>Education</h2>

              <div class="experience-list">
                <div
                  v-for="item in educationItems"
                  :key="item.id"
                  class="resume-item wow fadeInUp delay-0-3s"
                >
                  <div class="icon">
                    <i :class="item.icon || 'ri-graduation-cap-line'"></i>
                  </div>

                  <div class="content">
                    <span class="years">{{ item.years }}</span>
                    <h4>{{ item.title }}</h4>
                    <span class="company">{{ item.institution }}</span>

                    <p v-if="item.description" class="resume-desc">
                      {{ item.description }}
                    </p>
                  </div>
                </div>

                <p v-if="educationItems.length === 0" class="text-muted mb-0">
                  No education added yet.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p v-if="errorMessage" class="text-muted text-center mt-4 mb-0">
          Showing default resume content because live content could not load.
        </p>
      </div>
    </div>
  </section>
</template>