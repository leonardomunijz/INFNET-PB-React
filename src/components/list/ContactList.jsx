import React from 'react';
import DataTable from 'react-data-table-component';

const ContactList = ({ contacts, onDelete, onEdit, suppliers }) => {
  // Cria um mapa de IDs para nomes de fornecedores
  const supplierMap = suppliers.reduce((map, supplier) => {
    map[supplier.id] = supplier.name;
    return map;
  }, {});

  const columns = [
    {
      name: 'Nome',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Telefone',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Fornecedor',
      selector: row => supplierMap[row.supplier] || 'Fornecedor desconhecido',
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Contatos</h2>
      <DataTable
        columns={columns}
        data={contacts}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        striped
        noDataComponent="Nenhum contato cadastrado."
        paginationPerPage={4}
        paginationRowsPerPageOptions={[4, 8, 12]}
      />
    </div>
  );
};

export default ContactList;
