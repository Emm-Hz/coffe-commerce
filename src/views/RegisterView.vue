<template>
  <div class="action-page">
    <div class="login-register">
    <h1>Register</h1>
      <form @submit.prevent="register">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" name="email" v-model="email" />
        </div>
        <div class="input-group">
          <label for="pass">Password</label>
          <input type="password" name="pass" v-model="password" />
        </div>
        <input type="submit" value="Submit" />
      </form>
      <router-link to='/login' class="to-register"> Login </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const email = ref("");
    const password = ref("");

    const register = () => {
      const info = {
        email: email.value,
        password: password.value,
      };
      store.dispatch("getAuth", info);
      email.value = "";
      password.value = "";
    };

    return { email, password, register };
  },
};
</script>