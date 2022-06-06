<template>
  <div>
    <i @click="handleModal" class="fa-solid fa-cart-arrow-down cart"></i>
    <span>
      {{ quantity }}
    </span>
  </div>
</template>

<script>
import { collection, query, onSnapshot } from "firebase/firestore";
import { useStore } from "vuex";
import { db } from "@/fire/fireconfig";
import { computed, ref, watchEffect } from "@vue/runtime-core";
export default {
  setup() {
    const store = useStore();
    const quantity = ref(0);

    const handleModal = () => {
      store.state.modal = !store.state.modal;
    };

    watchEffect(async () => {
      const data = query(collection(db, store.state.user));
      onSnapshot(data, (querySnapshot) => {
        const values = [];
        querySnapshot.forEach((doc) => {
          values.push({ id: doc.id, data: doc.data() });
        });
        if (store.state.login === true) {
          quantity.value = values.length;
        } else {
          quantity.value = 0;
        }
        localStorage.setItem("shop", JSON.stringify(values));
      });
    });

    return { quantity, handleModal };
  },
};
</script>

<style>
.cart {
  color: var(--complement-color);
  cursor: pointer;
}
</style>