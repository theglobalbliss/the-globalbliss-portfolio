<script setup>
import { ref } from 'vue';

const formStatus = ref('');
const isSubmitting = ref(false);

const submitForm = async (event) => {
  isSubmitting.value = true;
  formStatus.value = '';

  const form = event.target;
  const formData = new FormData(form);

  try {
    const response = await fetch('https://formspree.io/f/mjkalwdd', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      formStatus.value = 'Message sent successfully!';
      form.reset();
    } else {
      formStatus.value = 'Something went wrong. Please try again.';
    }
  } catch (error) {
    formStatus.value = 'Network error. Please check your connection.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section id="contact" class="contact-area innerpage-single-area">
    <div class="container">
      <div class="container-inner">
        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="section-title text-center wow fadeInUp delay-0-2s">
              <p>contact</p>
              <h2>Get in Touch with Me!</h2>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-4">
            <div class="contact-content-part wow fadeInUp delay-0-2s">
              <div class="single-contact wow fadeInUp" data-wow-delay=".2s">
                <div class="contact-icon">
                  <i class="ri-map-pin-line"></i>
                </div>
                <h2>Location:</h2>
                <p>Lagos, Nigeria</p>
              </div>

              <div class="single-contact wow fadeInUp" data-wow-delay=".4s">
                <div class="contact-icon">
                  <i class="ri-phone-line"></i>
                </div>
                <h2>Contact number:</h2>
                <p>+234 906 408 9633</p>
              </div>

              <div class="single-contact wow fadeInUp" data-wow-delay=".6s">
                <div class="contact-icon">
                  <i class="ri-mail-line"></i>
                </div>
                <h2>Email us:</h2>
                <p>theglobalbliss@gmail.com</p>
              </div>
            </div>
          </div>

          <div class="col-lg-8">
            <div class="contact-form contact-form-area wow fadeInUp delay-0-4s">
              <form
                id="contactForm"
                class="contactForm"
                name="contactForm"
                @submit.prevent="submitForm"
              >
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        class="form-control"
                        placeholder="Anuoluwapo Bliss"
                        required
                      />
                      <label for="name" class="for-icon">
                        <i class="far fa-user"></i>
                      </label>
                      <div class="help-block with-errors"></div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        class="form-control"
                        placeholder="theglobalbliss@gmail.com"
                        required
                      />
                      <label for="email" class="for-icon">
                        <i class="far fa-envelope"></i>
                      </label>
                      <div class="help-block with-errors"></div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="message">Your Message</label>
                      <textarea
                        name="message"
                        id="message"
                        class="form-control"
                        rows="4"
                        placeholder="Write your message"
                        required
                      ></textarea>
                      <div class="help-block with-errors"></div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-group mb-0">
                      <button
                        type="submit"
                        class="theme-btn"
                        :disabled="isSubmitting"
                      >
                        {{ isSubmitting ? 'Sending...' : 'Send Me Message' }}
                        <i class="ri-mail-line"></i>
                      </button>

                      <div
                        id="msgSubmit"
                        class="mt-3"
                        :class="{
                          'text-success': formStatus === 'Message sent successfully!',
                          'text-danger': formStatus !== 'Message sent successfully!' && formStatus !== ''
                        }"
                      >
                        {{ formStatus }}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>