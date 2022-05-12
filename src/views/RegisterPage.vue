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
import { auth } from "@/settings/firebase";
import getUserName from "@/composables/get-username";

interface State {
  newUserName: string;
  newUserEmail: string;
  newUserPassword: string;
  errorMessage: string;
  loggedIn: boolean;
}

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
          state.errorMessage = `${errorCode}:${errorMessage}`;
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
