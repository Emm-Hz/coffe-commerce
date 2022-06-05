<template>
  <div class="action-page">
    <div class="login-register">
      <h1>Login</h1>
      <form @submit.prevent="login">
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
      <router-link to='/register' class="to-register"> Register </router-link>
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

    const login = () => {
      const info = {
        email: email.value,
        password: password.value,
      };
      store.dispatch("getUser", info);
      email.value = "";
      password.value = "";
    };

    return { email, password, login };
  },
};
</script>

<style>
.action-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: center / cover url("@/assets/pexels-tom-swinnen-1309778.webp");
}

.login-register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  width: -webkit-fill-available;
  width: -moz-available;
  aspect-ratio: 1 / 1;
  color: white;
  background-color: hsla(240, 4%, 17%, 0.5);
  backdrop-filter: blur(3px);
}

.login-register h1 {
  text-align: center;
  font-family: var(--bebas);
  font-size: clamp(2.63rem, calc(2.09rem + 2.68vw), 4.00rem);
}

.login-register form {
  position: relative;
  display: flex;
  flex-direction: column;
}

.input-group {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: .5rem;
}

.input-group input {
  padding: 10px;
  width: 15rem;
  border: none;
  border-radius: 4px;
  color: var(--white);
  background-color: hsla(240, 4%, 17%, 0.5);
  outline: 2px solid var(--secondary-color);
}

.input-group:focus-within input {
  outline-color: var(--complement-color);
}

.input-group input:-internal-autofill-selected {
  background-color: transparent;
}

input[type="submit"] {
  margin: 1rem auto;
  padding: .5rem;
  width: 60%;
  border: none;
  border-radius: 4px;
  outline: 2px solid var(--complement-color);
  cursor: pointer;
  color: var(--white);
  background-color: var(--primary-color);
}

input[type="submit"]:hover {
  outline: 2px solid var(--primary-color);
  font-weight: 700;
  color: var(--primary-color);
  background-color: var(--complement-color);
}

.to-register {
  filter: drop-shadow(0px 6px 6px black);
  font-size: clamp(1.20em, calc(1.00em + 0.50em), 2.30em);
  color: var(--white);
}

</style>