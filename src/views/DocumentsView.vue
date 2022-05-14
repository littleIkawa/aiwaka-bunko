<template>
  <div class="documents-view">
    <template v-if="documentItem !== null">
      <h1>{{ documentItem.title }}</h1>
      <p class="update-timestamp">
        last update : {{ documentItem.postDateAsString() }}
      </p>
      <h2>概要</h2>
      <p>{{ documentItem.description }}</p>
      <template v-if="documentItem.notes.length !== 0">
        <h2>注意</h2>
        <ul>
          <li v-for="note in documentItem.notes" :key="note">
            {{ note }}
          </li>
        </ul>
      </template>
      <h2>ダウンロード</h2>
      <button class="download-button" @click="openFileAsNewTab($props.urlStr)">
        新しいタブで開く
      </button>
      <button class="download-button" @click="downloadDocument($props.urlStr)">
        ダウンロード
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive } from "vue";

import { DocumentContent } from "@/modules/document-content";
import { getOneContent } from "@/composables/get-contents";
import {
  downloadDocument,
  openFileAsNewTab,
} from "@/composables/download-file";

interface State {
  documentItem: DocumentContent | null;
}

export default defineComponent({
  props: {
    urlStr: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { documentItem } = toRefs(reactive<State>({ documentItem: null }));
    onMounted(async () => {
      // 文書情報を取得
      const item = await getOneContent(props.urlStr);
      documentItem.value = item;
    });

    return { documentItem, downloadDocument, openFileAsNewTab };
  },
});
</script>

<style lang="scss" scoped></style>
