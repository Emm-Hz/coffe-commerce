<template>
  <nav class="coffe-navbar">
    <router-link to="/">Home</router-link> |
    <cart-shop />
    <button @click="handleLogin">{{ msg }}</button>
  </nav>
  <router-view />
</template>

<script setup>
const { computed } = require("@vue/runtime-core");
const { useStore } = require("vuex");
const { default: router } = require("./router");
import CartShop from "./components/CartShop.vue"

const store = useStore();
const msg = computed(() => {
   return store.state.login === true 
    ? "Logout" 
    : "Login";
});

const handleLogin = () => {
  console.log("you press it");
  if (store.state.login === true) {
    localStorage.setItem("state", JSON.stringify(false));
    store.state.login = false
  } else {
    router.push({ path: "/login" });
  }
};
</script>

<style>
:root {
  --primary-color: #201b16;
  --secondary-color: #c2b4a6;
  --complement-color: #b77f1c;

  --white: #ffffff;
  --black: #000000;

  /* ? Fonts */
  --poppins: "Poppins", sans-serif;
  --bebas: "Bebas Neue", cursive;
}

body {
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
  font-family: var(--bebas);
}

span,
a,
p,
label {
  font-family: var(--poppins);
}

nav {
  position: fixed;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 2rem;
  width: 100vw;
  min-height: 2.5rem;
  color: var(--secondary-color);
  background-color: var(--primary-color);
  z-index: 1;
}

nav a {
  text-decoration: none;
  color: var(--complement-color);
}

nav button {
  margin-right: 2rem;
  padding: 0.2em 1.5em;
  border: 2px solid var(--complement-color);
  color: var(--complement-color);
  background: none;
  cursor: pointer;
}

nav button:hover {
  border: 2px solid var(--secondary-color);
  color: var(--primary-color);
  background: var(--complement-color);
}
</style>
