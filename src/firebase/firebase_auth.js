import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyAQ4Krf2WyI4sVzopkQw6zYaqhnwg7x7AI",
   authDomain: "dare-to-donate-80c29.firebaseapp.com",
   projectId: "dare-to-donate-80c29",
   storageBucket: "dare-to-donate-80c29.firebasestorage.app",
   messagingSenderId: "761485300654",
   appId: "1:761485300654:web:2bb9c7934425543b266e3f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
