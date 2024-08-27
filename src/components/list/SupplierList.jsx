import React from 'react';
import DataTable from 'react-data-table-component';

const SupplierList = ({ suppliers }) => {
  // Definindo as colunas para o DataTable
  const columns = [
    {
      name: 'Nome',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Endereço',
      selector: row => row.address,
      sortable: true,
    },
    {
      name: 'Contato',
      selector: row => row.contact,
      sortable: true,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Lista de Fornecedores
      </h2>
      <DataTable
        columns={columns}
        data={suppliers}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        striped
        noDataComponent="Nenhum fornecedor cadastrado."
        paginationPerPage={4} // Configura o número de itens por página para 4
        paginationRowsPerPageOptions={[4, 8, 12]} // Opções de itens por página
      />
    </div>
  );
};

export default SupplierList;
