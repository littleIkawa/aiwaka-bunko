<template>
  <div class="request-budge">
    <div class="status-message">
      {{ $props.request.getTypeStr() }}：{{ statusMessage }}
    </div>
    <div class="request-message">
      {{ $props.request.message }}
    </div>
    <template v-if="$props.request.status === 0">
      <div class="button-container">
        <button @click="modifyRequest">修正する</button>
        <button @click="deleteRequest">取り消す</button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { DocumentRequest } from "@/modules/document-requests";

export default defineComponent({
  props: {
    request: {
      type: DocumentRequest,
      required: true,
    },
  },
  emits: ["modify-request", "delete-request"],

  setup(props, context) {
    const statusMessage = computed((): string => {
      if (props.request.status === 0) {
        return "以下の内容でリクエストを送りました。";
      } else if (props.request.status === 1) {
        return "リクエストが処理されました。";
      } else if (props.request.status === 2) {
        return "リクエストが拒否されました。";
      } else {
        return (
          "例外状態になっています。管理者に問い合わせてください。" +
          `コード：${props.request.status}`
        );
      }
    });

    const modifyRequest = () => {
      context.emit("modify-request", props.request.id);
    };
    const deleteRequest = () => {
      context.emit("delete-request", props.request.id);
    };

    return { statusMessage, deleteRequest, modifyRequest };
  },
});
</script>

<style lang="scss" scoped>
.request-budge {
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  padding: 0.8rem 1.6rem;
  margin: 0.7rem 1rem;
  width: 30rem;
  background-color: rgba($color: rgb(35, 98, 245), $alpha: 0.2);

  .status-message {
    margin: 0.2rem auto;
  }

  .request-message {
    margin: 0.3 auto;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;

    button {
      margin: 0.3rem 0.5rem;
      border: 1px solid rgb(100, 200, 255);
      border-radius: 12px;
      transition: 0.25s ease-out;

      &[disabled] {
        color: #999999;
      }
      &:not([disabled]):hover {
        color: #333333;
        background-color: rgb(100, 200, 255);
        border: 1px solid rgb(172, 255, 244);
      }
    }
  }
}
</style>
