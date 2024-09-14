import React, { useState, useEffect } from 'react';

const ProductForm = ({ onProductAdded, product, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(product.price || '');
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, description, price };
    onProductAdded(newProduct);
    setName('');
    setDescription('');
    setPrice('');
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
        {product ? 'Atualizar Produto' : 'Cadastrar Produto'}
      </button>
      {product && (
        <button
          type="button"
          onClick={onCancel}
          className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
        >
          Cancelar
        </button>
      )}
    </form>
  );
};

export default ProductForm;
