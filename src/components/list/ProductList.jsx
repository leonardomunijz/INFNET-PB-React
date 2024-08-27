// src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { db } from '../../auth/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Obter a referência para a coleção 'produtos'
    const productsCollection = collection(db, 'produtos');

    // Configurar o listener para atualizações em tempo real
    const unsubscribe = onSnapshot(productsCollection, (querySnapshot) => {
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    }, (error) => {
      console.error('Erro ao ouvir atualizações:', error);
    });

    // Limpar o listener quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  const columns = [
    {
      name: 'Nome',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Descrição',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Preço',
      selector: row => row.price,
      sortable: true,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Produtos</h2>
      <DataTable
        columns={columns}
        data={products}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        striped
        noDataComponent="Nenhum produto cadastrado."
        paginationPerPage={4} // Exibir 4 itens por página
        paginationRowsPerPageOptions={[4, 8, 12]} // Opções de itens por página
      />
    </div>
  );
};

export default ProductList;
