// src/utils/api.js

// Importa as funções e configurações necessárias
import { auth, db } from '../auth/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';

// Função para criar um novo usuário e armazenar informações no Firestore
export const registerUser = async (email, password) => {
  try {
    // Cria o usuário com email e senha
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Salva informações adicionais no Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    // Captura e lança o erro com uma mensagem mais detalhada
    console.error("Erro ao criar conta:", error.message);
    throw new Error(error.message);
  }
};

// Função para buscar requisições de compra
export const fetchPurchaseRequests = async () => {
  try {
    // Referência para a coleção de requisições de compra
    const querySnapshot = await getDocs(collection(db, 'purchaseRequests'));
    
    // Mapeia os documentos para obter os dados
    const purchaseRequests = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return purchaseRequests;
  } catch (error) {
    // Captura e lança o erro com uma mensagem mais detalhada
    console.error("Erro ao buscar requisições de compra:", error.message);
    throw new Error(error.message);
  }
};
