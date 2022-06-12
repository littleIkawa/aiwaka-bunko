<template>
  <div class="register-page">
    <template v-if="!state.loggedIn">
      <div class="register-form">
        <fieldset :class="{ 'error-exist': state.errorMessage }">
          <label for="form-name">ハンドルネーム</label>
          <input
            id="form-name"
            type="text"
            placeholder="name"
            v-model="state.newUserName"
          />
          <label for="form-belongs">所属</label>
          <input
            id="form-belongs"
            type="text"
            placeholder="belongs"
            v-model="state.newUserBelongs"
          />
          <label for="form-email">メールアドレス</label>
          <input
            id="form-email"
            type="email"
            placeholder="email"
            v-model="state.newUserEmail"
          />
          <label for="form-password">パスワード</label>
          <input
            id="form-password"
            type="password"
            placeholder="password"
            v-model="state.newUserPassword"
          />
          <button @click="registerUser">Register</button>
        </fieldset>
      </div>
      <div v-if="state.errorMessage" class="error-msg error-exist">
        {{ state.errorMessage }}
      </div>
    </template>
    <template v-else> ログイン済みです。 </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { validators } from "@/modules/validations";
import { auth } from "@/settings/firebase";
import {
  createUserRecord,
  getUserName,
} from "@/composables/user-record-operations";

interface FormSchema {
  [key: string]: string;
  name: string;
  belongs: string;
  email: string;
  password: string;
}

interface State {
  errorMessage: string;
  loggedIn: boolean;
  newUserName: string;
  newUserBelongs: string;
  newUserEmail: string;
  newUserPassword: string;
}

const validateForm = (values: FormSchema): boolean => {
  // フォーム項目と適用するバリデーションを並べる.
  const validationSchema = [
    { prop: "name", type: "required" },
    { prop: "belongs", type: "required" },
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
      errorMessage: "",
      loggedIn: false,
      newUserName: "",
      newUserBelongs: "",
      newUserEmail: "",
      newUserPassword: "",
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
        belongs: state.newUserBelongs,
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

      const confirmPass = window.prompt("認証パスを入力してください。");
      if (confirmPass !== process.env.VUE_APP_REGISTER_PASS) {
        state.errorMessage = "認証パスが誤っています。";
        return;
      }
      createUserWithEmailAndPassword(
        auth,
        state.newUserEmail,
        state.newUserPassword
      )
        .then((cred) => {
          // アカウント登録情報を使ってデータベースに情報を登録
          const uid = cred.user.uid;
          createUserRecord(uid, state.newUserName, state.newUserBelongs);

          // リダイレクトを行う
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
          if (errorCode === "auth/weak-password") {
            state.errorMessage = `パスワードが不適切です。\n${errorMessage}`;
          } else {
            state.errorMessage = `登録処理中に何らかの問題が発生しました。\n${errorCode}:${errorMessage}`;
          }
        });
    };

    return { state, registerUser };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";
$question-height: 2.8rem;
.login-name-display {
  width: 80%;
  margin: 16px auto;
}

.error-exist {
  border: 2px solid red;
}
.error-msg {
  color: red;
}
fieldset {
  display: grid;
  grid-template-rows: repeat(2, $question-height) 1fr;
  grid-template-columns: 22rem 1fr;
  row-gap: 2.4rem;
  column-gap: 0.7rem;
  width: 97%;
  margin: 2rem auto;
  padding: 1.6rem 2rem;

  @include mediaquery(small-size) {
    grid-template-rows: repeat(5, $question-height);
    grid-template-columns: 1fr;
    row-gap: 1.2rem;
  }

  label {
    @include mediaquery(normal-size) {
      grid-column-start: 1;
    }
    line-height: $question-height;
  }

  input {
    color: inherit;
    background-color: transparent;
    border: 1px solid #777777;
    transition: ease-in-out 0.2s;

    &:focus {
      outline-width: 0;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(1.5rem);
    }
  }

  label {
    margin-right: 0.7rem;
    line-height: $question-height;
  }

  button {
    grid-column-start: 2;
    @include mediaquery(small-size) {
      grid-column-start: 1;
    }
    width: fit-content;
    height: 3rem;
    justify-self: right;

    padding: 0.2rem 0.7rem;
    border: 2px solid #999;
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;
    &:hover,
    &:focus {
      outline: none;
      background-color: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(1.5rem);
    }
  }
}
</style>
