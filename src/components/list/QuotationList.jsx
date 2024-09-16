import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { db } from '../../auth/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

const QuotationList = () => {
  const [quotations, setQuotations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Função para buscar e atualizar as cotações
    const fetchQuotations = () => {
      const unsubscribe = onSnapshot(collection(db, 'cotacoes'), (snapshot) => {
        const quotationsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setQuotations(quotationsList);
      });

      return () => unsubscribe();
    };

    fetchQuotations();
  }, []);

  // Função para filtrar as cotações com base no termo de busca
  const filterQuotations = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return quotations.filter((quotation) => {
      return (
        quotation.productId.toLowerCase().includes(lowerCaseSearchTerm) ||
        (quotation.productName && quotation.productName.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (quotation.supplier && quotation.supplier.toLowerCase().includes(lowerCaseSearchTerm))
      );
    });
  };

  // Definindo as colunas da tabela
  const columns = [
    {
      name: 'ID do Produto',
      selector: row => row.productId,
      sortable: true,
    },
    {
      name: 'Nome do Produto',
      selector: row => row.productName,
      sortable: true,
    },
    {
      name: 'Fornecedor',
      selector: row => row.supplier,
      sortable: true,
    },
    {
      name: 'Preço',
      selector: row => row.price,
      sortable: true,
    },
    {
      name: 'Data',
      selector: row => row.date,
      sortable: true,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Cotações</h2>

      {/* Barra de pesquisa */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por ID, nome do produto ou fornecedor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Lista de cotações filtradas */}
      <DataTable
        columns={columns}
        data={filterQuotations()}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        striped
        noDataComponent="Nenhuma cotação encontrada."
        paginationPerPage={5} // Exibir 5 itens por página
        paginationRowsPerPageOptions={[5, 10, 15]} // Opções de itens por página
      />
    </div>
  );
};

export default QuotationList;
