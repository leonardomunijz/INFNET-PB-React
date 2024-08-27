// src/components/ProductForm.jsx
import React, { useState } from 'react';
import { db } from '../../auth/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const ProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { name, description, price };
      const docRef = await addDoc(collection(db, 'produtos'), newProduct);
      onProductAdded({ id: docRef.id, ...newProduct });
      // Clear the form fields after submission
      setName('');
      setDescription('');
      setPrice('');
    } catch (e) {
      console.error('Erro ao adicionar produto:', e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Nome do Produto:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Descrição:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Preço:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Cadastrar Produto
      </button>
    </form>
  );
};

export default ProductForm;
