<template>
  <div class="contents-home">
    <h1>コンテンツ一覧</h1>
    <!-- <p>全部で{{ allDocumentNum }}件の文書があります。</p> -->
    <div class="documents-list-container">
      <contents-list-item-vue
        v-for="doc in documentList"
        :key="doc.urlStr"
        :item="doc"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { DocumentContent } from "@/modules/document-content";
import { getAllContents } from "@/composables/get-contents";
import ContentsListItemVue from "@/components/ContentsListItem.vue";

interface State {
  allDocumentNum: number;
  documentList: DocumentContent[];
}

export default defineComponent({
  components: { ContentsListItemVue },
  setup() {
    const { allDocumentNum, documentList } = toRefs(
      reactive<State>({
        allDocumentNum: 0,
        documentList: [],
      })
    );
    onMounted(() => {
      getAllContents(documentList).then((docNum) => {
        allDocumentNum.value = docNum;
      });
    });

    return { allDocumentNum, documentList };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";
.documents-list-container {
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  margin: 2rem 3%;
  @include mediaquery(small-size) {
    grid-template-columns: repeat(2, 2fr);
  }
}
</style>
