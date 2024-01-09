import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCmtnGg83sp_BQgA4XjHHWkK9frfmVkAdQ",
  authDomain: "imageproject-431c1.firebaseapp.com",
  projectId: "imageproject-431c1",
  storageBucket: "imageproject-431c1.appspot.com",
  messagingSenderId: "763064223310",
  appId: "1:763064223310:web:2ec8ad4f548de2eb6ce51f",
  measurementId: "G-H0LGFFXJHD"
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)