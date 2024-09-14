// src/components/list/ProductList.jsx
import React from 'react';
import DataTable from 'react-data-table-component';

const ProductList = ({ products, onDelete, onEdit, onRequestDelete }) => {
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
    {
      name: 'Ações',
      cell: row => (
        <div>
          <button
            onClick={() => onEdit(row)}
            className="text-blue-500 mr-4 hover:underline"
          >
            Editar
          </button>
          <button
            onClick={() => onRequestDelete(row.id)}
            className="text-red-500 hover:underline"
          >
            Excluir
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
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
        paginationPerPage={4}
        paginationRowsPerPageOptions={[4, 8, 12]}
      />
    </div>
  );
};

export default ProductList;
