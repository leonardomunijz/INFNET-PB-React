// src/auth/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importe getFirestore para inicializar o Firestore

// Configuração do Firebase do seu app
const firebaseConfig = {
  apiKey: "AIzaSyDSUP7X_2XKV5o25irVYtRjUmHSXeM0FrA",
  authDomain: "pb-tp3.firebaseapp.com",
  projectId: "pb-tp3",
  storageBucket: "pb-tp3.appspot.com",
  messagingSenderId: "880774907082",
  appId: "1:880774907082:web:4fd95804da9fb22c4b2033",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Obtém o objeto de autenticação do Firebase
export const auth = getAuth(app);

// Inicializa o Firestore
export const db = getFirestore(app); // Exporta a instância do Firestore

export default app;
