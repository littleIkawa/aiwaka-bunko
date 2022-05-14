<template>
  <router-link :to="`/contents/${item.urlStr}`">
    <div class="document-item">
      <h3>{{ item.title }}</h3>
      <div>last update : {{ item.postDateAsString() }}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { DocumentContent } from "@/modules/document-content";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<DocumentContent>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.document-item {
  border: 1px solid #777777;
  border-radius: 7px;
  backdrop-filter: blur(1.5rem);
  margin: 2rem 1.6rem;
  padding: 1.5rem 2.4rem;
  &:first-child {
    margin-top: 0;
  }
  &:hover {
    backdrop-filter: blur(0);
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
