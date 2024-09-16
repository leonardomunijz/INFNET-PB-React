import React, { useState, useEffect } from 'react';
import { db } from '../auth/firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const CreateQuotationModal = ({ isOpen, onClose, requestId }) => {
  const [quotationValue, setQuotationValue] = useState('');
  const [quotationObservations, setQuotationObservations] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const loadSuppliers = async () => {
        try {
          const suppliersSnapshot = await getDocs(collection(db, 'fornecedores'));
          const suppliersList = suppliersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSuppliers(suppliersList);
        } catch (error) {
          setError('Falha ao buscar fornecedores.');
        }
      };

      loadSuppliers();
    }

    // Limpa o estado quando o modal é fechado
    return () => {
      setQuotationValue('');
      setQuotationObservations('');
      setSelectedSupplierId('');
      setError('');
    };
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!quotationValue || !quotationObservations || !selectedSupplierId) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      await addDoc(collection(db, 'quotations'), {
        requestId,
        supplierId: selectedSupplierId,
        price: quotationValue,
        observations: quotationObservations,
        createdAt: new Date(),
      });
      onClose(); // Fecha o modal após criar a cotação
    } catch (error) {
      setError('Falha ao criar cotação.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Criar Cotação</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
            <strong className="font-bold">Erro:</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="supplierSelect" className="block text-sm font-medium text-gray-700">Fornecedor</label>
          <select
            id="supplierSelect"
            value={selectedSupplierId}
            onChange={(e) => setSelectedSupplierId(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="">Selecione o Fornecedor</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="quotationValue" className="block text-sm font-medium text-gray-700">Valor</label>
          <input
            type="number"
            id="quotationValue"
            value={quotationValue}
            onChange={(e) => setQuotationValue(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Digite o valor da cotação"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quotationObservations" className="block text-sm font-medium text-gray-700">Observações</label>
          <textarea
            id="quotationObservations"
            value={quotationObservations}
            onChange={(e) => setQuotationObservations(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Digite as observações da cotação"
            rows="4"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Fechar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Criar Cotação
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuotationModal;
