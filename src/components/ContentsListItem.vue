<template>
  <router-link :to="`/contents/${item.urlStr}`">
    <div class="document-item">
      <div class="item-title">{{ item.title }}</div>
      <div class="item-update">last update : {{ item.postDateAsString() }}</div>
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
  border: 2px solid #777777;
  border-radius: 7px;
  backdrop-filter: blur(1.5rem);
  margin: 1rem 1.6rem;
  padding: 1rem 1.8rem;
  &:first-child {
    margin-top: 0;
  }
  &:hover {
    backdrop-filter: blur(0);
    background-color: rgba(100, 100, 255, 0.2);
  }

  .item-title {
    font-size: 1.8rem;
  }
  .item-update {
    font-size: 1.1rem;
    color: #888888;
  }
}
</style>
