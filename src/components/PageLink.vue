<template>
  <div class="page-link__container">
    <router-link
      class="page-link"
      exact-active-class="current-page"
      :to="linkTo"
    >
      {{ linkName }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    linkName: {
      type: String,
      required: true,
    },
    linkTo: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";

.page-link {
  transition: 0.25s ease-in-out;
  display: block;
  position: relative;
  margin: 0 1rem;
  font-size: 2.2rem;
  line-height: 8rem;

  @include mediaquery(small-size) {
    font-size: 1.4rem;
    line-height: 3rem;
  }

  &:hover {
    color: rgb(0, 150, 255);
  }

  &::before {
    content: "";
    width: 0;
    height: 0.2rem;
    background: rgb(0, 150, 255);
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    transition: 0.25s ease-out;
  }

  &:hover::before {
    width: 100%;
  }

  &.current-page {
    color: rgb(172, 255, 244);
    &::before {
      width: 100%;
      background: rgb(172, 255, 244);
    }
  }
}
</style>
