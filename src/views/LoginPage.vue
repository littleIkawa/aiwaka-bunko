<template>
  <div class="login-page">
    <template v-if="!state.loggedIn">
      <div class="login-form">
        <h2>ログイン</h2>
        <label>e-mail</label>：<input
          placeholder="name"
          v-model="state.userEmail"
        />
        <label>password</label>：<input
          placeholder="password"
          type="password"
          v-model="state.password"
        />
        <button @click="login">Login</button>
      </div>
      <div>
        登録していない方はこちらから登録してください→
        <router-link to="/register">登録ページ</router-link>
      </div>
    </template>

    <template v-else>
      <h2>ログアウト</h2>
      <div class="login-name-display">
        {{ state.loginUserName }}としてログインしています。
      </div>
      <button @click="logout">Logout</button>
    </template>

    <div v-if="state.errorMessage" class="error-msg">
      {{ state.errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/settings/firebase";
import getUserName from "@/composables/get-username";

interface State {
  userEmail: string;
  password: string;
  errorMessage: string;
  loggedIn: boolean;
  loginUserName: string;
}

export default defineComponent({
  setup() {
    const state = reactive<State>({
      userEmail: "",
      password: "",
      errorMessage: "",
      loggedIn: false,
      loginUserName: "",
    });
    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      const userName = await getUserName();
      state.loggedIn = !!userName;
      if (userName !== null) {
        state.loginUserName = userName;
      }
    });

    const login = () => {
      signInWithEmailAndPassword(auth, state.userEmail, state.password)
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
          state.errorMessage = `${errorCode}:${errorMessage}`;
        });
    };
    const logout = () => {
      if (confirm("ログアウトしますか？")) {
        signOut(auth)
          .then(() => {
            router.push("/");
          })
          .catch((error) => {
            state.errorMessage = error.message;
          });
      }
    };

    return { state, login, logout };
  },
});
</script>

<style lang="scss" scoped>
.login-name-display {
  width: 80%;
  margin: 16px auto;
}
</style>
