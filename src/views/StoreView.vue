<template>
  <div class="store">
    <h1 class="store-title">store</h1>
    <div class="store-list">
      <card-component
        v-for="coffe in info"
        :key="coffe.id"
        :title="coffe.name"
        :description="coffe.description"
        :price="coffe.price"
        :quantity="coffe.quantity"
        :id="coffe.id"
      />
    </div>
    <modal-component />
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { db } from "@/fire/fireconfig";
import CardComponent from "@/components/CardComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import store from '@/store';
export default {
  components: {
    CardComponent,
    ModalComponent,
  },
  setup() {
    const info = ref([]);

    onMounted(async () => {
      const querySnapshot = await getDocs(collection(db, "coffes"));
      querySnapshot.forEach((doc) => {
        info.value.push({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          quantity: doc.data().quantity,
        });
      });
      store.commit('setShop')
    });

    return { info };
  },
};
</script>

<style scoped>

.store {
  position: relative;
  background-color: var(--primary-color);
}

.store-title {
  margin-bottom: 2rem;
  padding-top: 2rem;
  text-align: center;
  color: var(--secondary-color);
}

.store-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  place-items: center;
  width: 100%;
  height: max-content;
  background-color: var(--secondary-color);
}

@media screen and (min-width: 64rem) {
  .store-list {
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
}
}
</style>