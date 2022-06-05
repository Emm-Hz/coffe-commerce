import { auth } from "@/fire/fireconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createStore } from "vuex";
import router from "./../router/index";

export default createStore({
  state: {
    login: JSON.parse(localStorage.getItem("state")),
    user: JSON.parse(localStorage.getItem("user")) || "",
    modal: false,
    shopping: JSON.parse(localStorage.getItem("shop")),
    toPay: 0
  },
  getters: {},
  mutations: {
    setAuth(state, payload) {
      if (payload) {
        state.login = true;
        localStorage.setItem("state", true);
        router.push({ path: "/" });
      } else {
        alert("You are going to be detroyed");
      }
    },
    setUser(state, payload) {
      if (payload) {
        localStorage.setItem("user", JSON.stringify(payload.user.email));
        localStorage.setItem("state", true);
        state.user = payload.user.email;
        state.login = true;
        router.push({ path: "/" });
      } else {
        alert("Algo a salido mal");
      }
    },
    setShop(state) {
      state.shopping = JSON.parse(localStorage.getItem("shop"));
    },
  },
  actions: {
    getAuth({ commit }, info) {
      try {
        const registerUser = createUserWithEmailAndPassword(
          auth,
          info.email,
          info.password
        );
        commit("setAuth", registerUser);
      } catch (error) {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      }
    },
    async getUser({ commit }, info) {
      try {
        const loginUser = await signInWithEmailAndPassword(
          auth,
          info.email,
          info.password
        );

        console.log(loginUser);

        commit("setUser", loginUser);
      } catch (error) {
        console.log(error);
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      }
    },
  },
  modules: {},
});
