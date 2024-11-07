import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCvf-Aln2qMSJcWO9lyDA0hvOaCeq_2kGM",
  authDomain: "saborexpress-3673b.firebaseapp.com",
  projectId: "saborexpress-3673b",
  storageBucket: "saborexpress-3673b.appspot.com",
  messagingSenderId: "786702884332",
  appId: "1:786702884332:web:b26c7892da1a685ea934c9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app);