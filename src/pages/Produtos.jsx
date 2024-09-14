// src/pages/Produtos.jsx
import React, { useState, useEffect } from 'react';
import ProductForm from '../components/form/ProductForm';
import ProductList from '../components/list/ProductList';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../auth/firebaseConfig';

const Produtos = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'produtos'), (snapshot) => {
      const productList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    });

    return () => unsubscribe();
  }, []);

  const handleProductSubmit = async (product) => {
    try {
      if (editingProduct) {
        await updateDoc(doc(db, 'produtos', editingProduct.id), product);
        setEditingProduct(null);
      } else {
        await addDoc(collection(db, 'produtos'), product);
      }
      console.log('Produto salvo:', product);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleRequestDeleteProduct = (id) => {
    setProductToDelete(id);
    setConfirmationDialogOpen(true);
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteDoc(doc(db, 'produtos', productToDelete));
      console.log('Produto excluído:', productToDelete);
      setConfirmationDialogOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">
        <div className="flex-1 max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            {editingProduct ? 'Editar Produto' : 'Cadastro de Produtos'}
          </h2>
          <ProductForm
            onProductAdded={handleProductSubmit}
            product={editingProduct}
            onCancel={handleCancelEdit}
          />
        </div>
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
          <ProductList
            products={products}
            onDelete={() => {}}
            onEdit={handleEditProduct}
            onRequestDelete={handleRequestDeleteProduct}
          />
        </div>
      </div>
      <ConfirmationDialog
        isOpen={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
        onConfirm={handleDeleteProduct}
        message="Tem certeza de que deseja excluir este produto?"
      />
    </div>
  );
};

export default Produtos;
