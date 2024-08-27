import React, { useState, useEffect } from 'react';
import SupplierForm from '../components/form/SupplierForm';
import SupplierList from '../components/list/SupplierList';
import { db } from '../auth/firebaseConfig'; // Importando a instância do Firestore do local correto
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Fornecedores = () => {
  const [suppliers, setSuppliers] = useState([]);

  const handleSupplierSubmit = async (supplier) => {
    try {
      const docRef = await addDoc(collection(db, 'fornecedores'), supplier); // Usando a nova coleção 'fornecedores'
      setSuppliers((prev) => [
        ...prev,
        { id: docRef.id, ...supplier }
      ]);
      console.log('Fornecedor cadastrado:', supplier);
    } catch (e) {
      console.error('Erro ao adicionar fornecedor:', e);
    }
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      const querySnapshot = await getDocs(collection(db, 'fornecedores')); // Buscando dados da nova coleção 'fornecedores'
      const suppliersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSuppliers(suppliersList);
    };

    fetchSuppliers();
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">
        <div className="flex-1 max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Cadastro de Fornecedores
          </h2>
          <SupplierForm onSubmit={handleSupplierSubmit} />
        </div>
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
          <SupplierList suppliers={suppliers} />
        </div>
      </div>
    </div>
  );
};

export default Fornecedores;
