<template>
  <div class="coffe-main">
    <h1>A good day start with a good coffe</h1>
    <p>Mollit exercitation in enim ad ex eiusmod enim.</p>
  </div>
  <div v-if="store.state.login === true">
    <store-view/>
  </div>
</template>

<script>
import { useStore } from "vuex";
import StoreView from './StoreView.vue';
export default {
  components: { StoreView },
  setup() {
    const store = useStore();

    return { store };
  },
};
</script>

<style scoped>
.coffe-main {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 100vw;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background: url("@/assets/wp8903167-cup-of-coffee-wallpapers.jpg");
  background-attachment: fixed;
  background-position-x: right;
  background-size: cover;
}

.coffe-main :is(h1, p) {
  padding-left: 3rem;
}

.coffe-main h1 {
  text-transform: uppercase;
  filter: drop-shadow(5px -3px 3px black);
  font-size: 5em;
  color: var(--complement-color);
}

.coffe-main p {
  padding-bottom: 14rem;
  width: min-content;
  font-size: 1.5em;
  color: var(--white);
}

@media screen and (min-width: 40em) {
  .coffe-main p {
    width: max-content;
  }
}
</style>
