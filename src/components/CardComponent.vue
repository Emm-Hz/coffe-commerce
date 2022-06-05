<template>
  <div class="card-store">
    <form @submit.prevent="handleAddCart">
      <div class="product-info">
        <h2>{{ title }}</h2>
        <details>
          <summary>Description</summary>
          {{ description }}
        </details>
        <p>USD ${{ price }}</p>
        <label for="quantity">Quantity: </label>
        <input name="quantity" :list="title" v-model="addition" />
        <datalist :id="title">
          <option v-for="n in quantity" :value="n" :key="n" />
        </datalist>
      </div>
      <input type="submit" value="Add to card" />
    </form>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { db } from "@/fire/fireconfig";

export default {
  props: ["title", "description", "price", "quantity", "id"],
  setup(props) {
    const store = useStore();
    const addition = ref(null);

    async function handleAddCart() {
      try {
        await addDoc(collection(db, store.state.user), {
          name: props.title,
          price: props.price,
          quantity: parseInt(addition.value) || 1,
        });
        addition.value = null;
        store.commit("setShop");
      } catch (error) {
        console.log(error);
      }
    }

    return { handleAddCart, addition };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Signika&display=swap");

h2 {
  font-family: "Signika", sans-serif;
}

details {
  font-family: var(--poppins);
}

input[name="quantity"] {
  height: 1.2rem;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  text-align: center;
  background-color: var(--secondary-color);
}

input[type="submit"] {
  margin-top: 1rem;
  width: 100%;
  height: 2.5rem;
  border: 2px solid var(--complement-color);
  border-radius: 10px;
  font-weight: bold;
  color: var(--secondary-color);
  background-color: var(--primary-color);
  cursor: pointer;
}

.card-store {
  padding: 1.5rem;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  width: -moz-available;
  height: -moz-available;
  border: 1px solid var(--primary-color);
}
.coffe-img {
  max-width: 10vw;
}
</style>