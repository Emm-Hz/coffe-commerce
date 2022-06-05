<template>
  <div class="modal" v-if="store.state.modal">
    <div class="inter-modal" v-if="store.state.shopping.length > 0">
      <div class="actions">
        <h1>shop cart</h1>
        <button @click="handleClose">X</button>
      </div>
      <div class="info-modal">
        <p v-for="(product, index) in store.state.shopping" :key="index">
          Product: {{ product.data.name }} - Quantity:
          {{ product.data.quantity }}
          <br />
          ${{ product.data.price }}
          <span @click="handleRemove(product.id)"> Remove </span>
        </p>
      </div>
      <button @click="delDoc">Total to pay: ${{ toPay }}</button>
    </div>
    <div class="inter-modal text-center" v-else>
      <div class="actions">
        <h1>Empty cart</h1>
        <button @click="handleClose">X</button>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/fire/fireconfig";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { watchEffect } from "@vue/runtime-core";
export default {
  setup() {
    const store = useStore();
    const toPay = ref(0);

    watchEffect(() => {
      toPay.value = 0;
      store.state.shopping.forEach((element) => {
        toPay.value += element.data.price * element.data.quantity;
      });
    });

    const handleClose = () => {
      store.state.modal = !store.state.modal;
    };

    const delDoc = () => {
      const user = store.state.user;
      store.state.shopping.forEach(async (element) => {
        try {
          await deleteDoc(doc(db, user, element.id));
          store.commit("setShop");
        } catch (error) {
          console.log(error);
        }
      });
    };

    const handleRemove = async (id) => {
      const user = store.state.user;
      const toRemove = store.state.shopping.filter(
        (element) => element.id === id
      );

      try {
        await deleteDoc(doc(db, user, toRemove[0].id));
        store.commit("setShop");
      } catch (error) {
        console.log(error);
      }
    };

    return { store, toPay, handleClose, handleRemove, delDoc };
  },
};
</script>

<style scoped>
button {
  height: 2.5rem;
  border: 2px solid var(--complement-color);
  border-radius: 10px;
  font-weight: bold;
  color: var(--secondary-color);
  background-color: var(--primary-color);
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: hsla(255, 0%, 0%, 0.5);
}

.inter-modal {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: auto;
  background-color: var(--secondary-color);
}

.actions {
  display: flex;
  justify-content: space-between;
}

.info-modal span {
  padding: 0.2rem;
  float: right;
  border: 2px solid var(--complement-color);
  border-radius: 10px;
  color: var(--white);
  background-color: var(--primary-color);
  cursor: pointer;
}

@media screen and (min-width: 46rem) {
  .inter-modal {
    width: 60vw;
  }
}
</style>