import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-oWwY1uaq38Rp1KLihZukyn6HVOzws-g",
  authDomain: "coffe-store-94501.firebaseapp.com",
  projectId: "coffe-store-94501",
  storageBucket: "coffe-store-94501.appspot.com",
  messagingSenderId: "683679494504",
  appId: "1:683679494504:web:bcdb97f788569ddb0666dd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
