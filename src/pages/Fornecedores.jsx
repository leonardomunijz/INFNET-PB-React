import React, { useState, useEffect } from 'react';
import SupplierForm from '../components/form/SupplierForm';
import SupplierList from '../components/list/SupplierList';
import Loader from '../components/Loader';
import ErrorBoundary from '../components/ErrorBoundary';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { db } from '../auth/firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const Fornecedores = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'fornecedores'));
      const suppliersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,  // Captura o ID corretamente
        ...doc.data(),
      }));
      setSuppliers(suppliersList);
    } catch (e) {
      console.error('Erro ao buscar fornecedores:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSupplierSubmit = async (supplier) => {
    try {
      if (supplier.id) {
        // Atualizando fornecedor existente
        const supplierRef = doc(db, 'fornecedores', supplier.id);  // Referencia correta do documento
        await updateDoc(supplierRef, {
          name: supplier.name,
          cnpj: supplier.cnpj,
          address: supplier.address,
        });
        setSuppliers((prev) =>
          prev.map((s) => (s.id === supplier.id ? { ...supplier } : s))
        );
      } else {
        // Adicionando novo fornecedor
        const docRef = await addDoc(collection(db, 'fornecedores'), {
          name: supplier.name,
          cnpj: supplier.cnpj,
          address: supplier.address,
        });
        setSuppliers((prev) => [
          ...prev,
          { id: docRef.id, name: supplier.name, cnpj: supplier.cnpj, address: supplier.address },
        ]);
      }
      setSelectedSupplier(null); // Limpar o formulário após a submissão
      console.log('Fornecedor cadastrado/atualizado:', supplier);
    } catch (e) {
      console.error('Erro ao adicionar/atualizar fornecedor:', e);
    }
  };

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);  // Seleciona o fornecedor para editar
  };

  const handleDeleteSupplier = (id) => {
    setSupplierToDelete(id);  // Configura o ID do fornecedor para exclusão
    setIsDialogOpen(true);  // Abre o diálogo de confirmação
  };

  const confirmDelete = async () => {
    try {
      const supplierRef = doc(db, 'fornecedores', supplierToDelete);  // Referencia correta para exclusão
      await deleteDoc(supplierRef);
      setSuppliers((prev) => prev.filter((supplier) => supplier.id !== supplierToDelete));  // Remove da lista
      setSupplierToDelete(null);  // Limpa o estado de exclusão
      console.log('Fornecedor excluído com sucesso:', supplierToDelete);
    } catch (e) {
      console.error('Erro ao excluir fornecedor:', e);
    } finally {
      setIsDialogOpen(false);  // Fecha o diálogo após exclusão
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);  // Cancela exclusão
    setSupplierToDelete(null);  // Limpa o fornecedor a ser excluído
  };

  return (
    <ErrorBoundary>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-start min-h-screen p-4 bg-gray-100">
          <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">
            <div className="flex-1 max-w-md p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Cadastro de Fornecedores</h2>
              <SupplierForm
                onSubmit={handleSupplierSubmit}
                selectedSupplier={selectedSupplier}
                clearSelectedSupplier={() => setSelectedSupplier(null)}
              />
            </div>
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
              <SupplierList
                suppliers={suppliers}
                onEdit={handleEditSupplier}
                onDelete={handleDeleteSupplier}
              />
            </div>
          </div>
          <ConfirmationDialog
            isOpen={isDialogOpen}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        </div>
      )}
    </ErrorBoundary>
  );
};

export default Fornecedores;
