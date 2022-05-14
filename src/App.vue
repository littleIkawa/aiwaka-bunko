<template>
  <site-header-vue />
  <section id="view-container">
    <router-view />
  </section>
  <site-footer-vue />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SiteHeaderVue from "./components/SiteHeader.vue";
import SiteFooterVue from "./components/SiteFooter.vue";

export default defineComponent({
  components: {
    SiteHeaderVue,
    SiteFooterVue,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";

#view-container {
  margin: 1.2rem 3%;

  @include mediaquery(small-size) {
    flex-direction: column;
    top: $header-height + 3rem;
    margin-bottom: 12rem;
  }
}
</style>
