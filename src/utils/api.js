// src/utils/api.js

import { auth, db } from '../auth/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';

// Função para criar um novo usuário e armazenar informações no Firestore
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Erro ao criar conta:", error.message);
    throw new Error(error.message);
  }
};

// Função para buscar produtos
export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'produtos')); // Atualizado para 'produtos'
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Ordena os produtos por nome
    const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));

    return sortedProducts;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    throw new Error(error.message);
  }
};

// Função para buscar fornecedores
export const fetchSuppliers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'fornecedores')); // Confirmado para 'fornecedores'
    const suppliers = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return suppliers;
  } catch (error) {
    console.error("Erro ao buscar fornecedores:", error.message);
    throw new Error(error.message);
  }
};

// Função para buscar requisições de compra
export const fetchPurchaseRequests = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'purchaseRequests'));
    const purchaseRequests = await Promise.all(querySnapshot.docs.map(async doc => {
      const requestData = doc.data();

      const quotationsQuery = query(collection(db, 'cotacoes'), where('requestId', '==', doc.id));
      const quotationsSnapshot = await getDocs(quotationsQuery);

      const numberOfQuotations = quotationsSnapshot.size;

      let status = 'Em aberto';
      if (numberOfQuotations >= 3) {
        status = 'Fechado';
      }

      return {
        id: doc.id,
        name: requestData.name,
        date: requestData.date,
        status: status,
      };
    }));

    return purchaseRequests;
  } catch (error) {
    console.error("Erro ao buscar requisições de compra:", error.message);
    throw new Error(error.message);
  }
};

// Função para criar uma nova requisição de compra
export const createPurchaseRequest = async (productId, supplierId, price) => {
  try {
    const requestId = new Date().getTime().toString();
    const requestDoc = doc(db, 'purchaseRequests', requestId);

    await setDoc(requestDoc, {
      name: `Requisição ${requestId}`,
      date: new Date().toISOString(),
      productId: productId,
      supplierId: supplierId,
      price: price,
    });

    console.log('Requisição de compra criada com sucesso!');
  } catch (error) {
    console.error("Erro ao criar requisição de compra:", error.message);
    throw new Error(error.message);
  }
};

// Função para deletar uma requisição de compra
export const deletePurchaseRequest = async (id) => {
  try {
    await deleteDoc(doc(db, 'purchaseRequests', id));
    console.log('Requisição de compra deletada com sucesso!');
  } catch (error) {
    console.error("Erro ao deletar requisição de compra:", error.message);
    throw new Error(error.message);
  }
};
