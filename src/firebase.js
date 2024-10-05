import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPAtURn9Wg7W1QAkIiwVVKyu7Hjp231j4",
  authDomain: "mineguard-731b0.firebaseapp.com",
  projectId: "mineguard-731b0",
  storageBucket: "mineguard-731b0.appspot.com",
  messagingSenderId: "41930119279",
  appId: "1:41930119279:web:6b505c18b17d8952ec959a",
  measurementId: "G-C8MMM77MJ0"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);