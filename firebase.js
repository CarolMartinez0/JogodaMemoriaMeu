import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth"; // Verif
const firebaseConfig = {
  apiKey: "AIzaSyAe5B2dhbhac-8trzE6s1dpj4EYcZJ7h8E",
  authDomain: "storygirljogodamemoria.firebaseapp.com",
  projectId: "storygirljogodamemoria",
  storageBucket: "storygirljogodamemoria.firebasestorage.app",
  messagingSenderId: "449905726241",
  appId: "1:449905726241:web:52033a47c39e73b7316460",
  measurementId: "G-SE4KRP4JDZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); 
const auth = getAuth(app);

// Opcional: Você já está fazendo o login aqui no firebase.js, 
// então não precisa repetir no App.vue se não quiser.
signInAnonymously(auth).catch((error) => {
  console.error("Erro ao autenticar anonimamente:", error);
});

export { db, auth };
//export { analytics, logEvent };