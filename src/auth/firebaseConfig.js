// src/auth/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importe getFirestore para inicializar o Firestore

// Configuração do Firebase do seu app
const firebaseConfig = {
  apiKey: "AIzaSyCEQGylZeV00PyhGY-ajV_iM18xHif0dyw",
  authDomain: "infnet-pb-react.firebaseapp.com",
  projectId: "infnet-pb-react",
  storageBucket: "infnet-pb-react.appspot.com",
  messagingSenderId: "206685692731",
  appId: "1:206685692731:web:c411a62f4f2e20e91c4d1e"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Obtém o objeto de autenticação do Firebase
export const auth = getAuth(app);

// Inicializa o Firestore
export const db = getFirestore(app); // Exporta a instância do Firestore

export default app;
