import React, { useState, useEffect } from 'react';
import { db } from '../../auth/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const QuotationForm = ({ onQuotationAdded }) => {
  const [formData, setFormData] = useState({ productId: '', supplier: '', price: '', date: '' });
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    const fetchProductsAndSuppliers = async () => {
      try {
        // Buscar produtos
        const productsSnapshot = await getDocs(collection(db, 'produtos'));
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);

        // Buscar fornecedores
        const suppliersSnapshot = await getDocs(collection(db, 'fornecedores'));
        const suppliersList = suppliersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSuppliers(suppliersList);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchProductsAndSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Atualizar o nome do produto com base na seleção do ID
    if (name === 'productId') {
      const selectedProduct = products.find(product => product.id === value);
      setSelectedProduct(selectedProduct ? selectedProduct.name : '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'cotacoes'), { ...formData, productName: selectedProduct });
      onQuotationAdded({ id: docRef.id, ...formData, productName: selectedProduct });
      setFormData({ productId: '', supplier: '', price: '', date: '' });
      setSelectedProduct('');
    } catch (error) {
      console.error('Erro ao cadastrar cotação:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Produto:</label>
        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Selecione um produto</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Fornecedor:</label>
        <select
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Selecione um fornecedor</option>
          {suppliers.map(supplier => (
            <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Preço:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Data:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Cadastrar Cotação
      </button>
    </form>
  );
};

export default QuotationForm;
