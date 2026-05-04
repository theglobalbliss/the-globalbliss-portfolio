<script setup>
// menu sticky
const isSticky = ref(false);

const handleSticky = () => {
  if (window.scrollY > 80) {
    isSticky.value = true;
  } else {
    isSticky.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleSticky);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleSticky);
});

const openMenu = ref(false);

const toggleMenu = () => {
  openMenu.value = !openMenu.value;
};

const closeMenu = () => {
  openMenu.value = false;
};

if (typeof window !== "undefined") {
  import("bootstrap/dist/js/bootstrap");
}
</script>

<template>
  <header :class="`main-header ${isSticky ? 'fixed-header' : ''}`">
    <div class="header-upper">
      <div class="container">
        <div class="header-inner d-flex align-items-center">
          <!-- START LOGO DESIGN AREA -->
          <div class="logo-outer">
            <div class="logo">
              <NuxtLink to="/">
                <img src="~/assets/images/logo.png" alt="Logo" title="Logo" />
              </NuxtLink>
            </div>
          </div>
          <!-- / END LOGO DESIGN AREA -->

          <!-- START NAV DESIGN AREA -->
          <div class="nav-outer clearfix mx-auto">
            <nav class="main-menu navbar-expand-lg">
              <div class="navbar-header">
                <div class="mobile-logo">
                  <NuxtLink to="/">
                    <img src="~/assets/images/logo.png" alt="Logo" title="Logo" />
                  </NuxtLink>
                </div>

                <!-- Toggle Button -->
                <button
                  type="button"
                  :class="`navbar-toggle ${openMenu ? 'collapsed' : ''}`"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse"
                  @click="toggleMenu"
                >
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
              </div>

              <div :class="`navbar-collapse collapse ${openMenu ? 'show' : ''}`">
                <ul class="navigation onepage clearfix">
                  <li>
                    <NuxtLink class="nav-link-click" to="/" @click="closeMenu">
                      Home
                    </NuxtLink>
                  </li>

                  <li>
                    <NuxtLink class="nav-link-click" to="/about" @click="closeMenu">
                      About
                    </NuxtLink>
                  </li>

                  <li>
                    <NuxtLink class="nav-link-click" to="/service" @click="closeMenu">
                      Services
                    </NuxtLink>
                  </li>

                  <li>
                    <NuxtLink class="nav-link-click" to="/works" @click="closeMenu">
                      Works
                    </NuxtLink>
                  </li>

                  <li>
                    <NuxtLink class="nav-link-click" to="/blog" @click="closeMenu">
                      Blog
                    </NuxtLink>
                  </li>

                  <li>
                    <NuxtLink class="nav-link-click" to="/contact" @click="closeMenu">
                      Contact
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <!-- / END NAV DESIGN AREA -->

          <div class="menu-btns">
            <a
              href="https://wa.me/2348052641636"
              target="_blank"
              rel="noopener noreferrer"
              class="theme-btn contact-btn"
            >
              Hire Me
              <i class="ri-shake-hands-line"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>