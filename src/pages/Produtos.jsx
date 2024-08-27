// src/pages/Produtos.jsx
import React, { useState } from 'react';
import ProductForm from '../components/form/ProductForm';
import ProductList from '../components/list/ProductList';

const Produtos = () => {
  const [products, setProducts] = useState([]);

  const handleProductSubmit = (product) => {
    // Handle product submission logic here
    setProducts((prev) => [
      ...prev,
      { id: Date.now(), ...product } // Adding a unique ID for each product
    ]);
    console.log('Produto cadastrado:', product);
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">
        <div className="flex-1 max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Cadastro de Produtos
          </h2>
          <ProductForm onSubmit={handleProductSubmit} />
        </div>
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default Produtos;
