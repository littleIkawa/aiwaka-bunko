<template>
  <div class="register-page">
    <div class="register-form">
      <label>name</label>：<input
        placeholder="name"
        v-model="state.newUserName"
      />
      <label>e-mail</label>：<input
        placeholder="email"
        v-model="state.newUserEmail"
      />
      <label>password</label>：<input
        placeholder="password"
        type="password"
        v-model="state.newUserPassword"
      />
      <button @click="registerUser">Register</button>
    </div>
    <div v-if="state.errorMessage" class="error-msg">
      {{ state.errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { validators } from "@/modules/validations";
import { auth } from "@/settings/firebase";
import getUserName from "@/composables/get-username";

interface FormSchema {
  [key: string]: string;
  name: string;
  email: string;
  password: string;
}

interface State {
  newUserName: string;
  newUserEmail: string;
  newUserPassword: string;
  errorMessage: string;
  loggedIn: boolean;
}

const validateForm = (values: FormSchema): boolean => {
  // フォーム項目と適用するバリデーションを並べる.
  let validationSchema = [
    { prop: "name", type: "required" },
    { prop: "email", type: "required" },
    { prop: "email", type: "email" },
    { prop: "password", type: "required" },
  ];

  let result = true;
  for (const schema of validationSchema) {
    // 一つでもfalseになればresultはfalseになる
    result &&= validators[schema.type](values[schema.prop]);
  }
  return result;
};

export default defineComponent({
  setup() {
    const state = reactive<State>({
      newUserName: "",
      newUserEmail: "",
      newUserPassword: "",
      errorMessage: "",
      loggedIn: false,
    });
    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      const userName = await getUserName();
      state.loggedIn = !!userName;
    });

    const registerUser = () => {
      const formValues: FormSchema = {
        name: state.newUserName,
        email: state.newUserEmail,
        password: state.newUserPassword,
      };
      if (!validateForm(formValues)) {
        // 引っかかったら終了させる
        state.errorMessage = "間違いがあります。";
        return;
      } else {
        state.errorMessage = "";
      }
      createUserWithEmailAndPassword(
        auth,
        state.newUserEmail,
        state.newUserPassword
      )
        .then(() => {
          if (route.query.redirect) {
            const redirect = route.query.redirect;
            if (typeof redirect === "string") {
              router.push(redirect);
            } else {
              router.push("/");
            }
          } else {
            router.push("/");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          state.errorMessage = `登録処理中に何らかの問題が発生しました。\n${errorCode}:${errorMessage}`;
        });
    };

    return { state, registerUser };
  },
});
</script>

<style lang="scss" scoped>
.login-name-display {
  width: 80%;
  margin: 16px auto;
}
</style>
