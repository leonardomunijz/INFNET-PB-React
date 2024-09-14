import React from 'react';
import DataTable from 'react-data-table-component';

const SupplierList = ({ suppliers, onEdit, onDelete }) => {
  const columns = [
    {
      name: 'Nome',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'CNPJ',
      selector: row => row.cnpj,
      sortable: true,
    },
    {
      name: 'Endereço',
      selector: row => row.address,
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
            onClick={() => onDelete(row.id)}
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Fornecedores</h2>
      <DataTable
        columns={columns}
        data={suppliers}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        striped
        noDataComponent="Nenhum fornecedor cadastrado."
        paginationPerPage={4}
        paginationRowsPerPageOptions={[4, 8, 12]}
      />
    </div>
  );
};

export default SupplierList;
