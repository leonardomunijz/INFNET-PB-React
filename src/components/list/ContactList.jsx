import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../auth/firebaseConfig';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Função para buscar os contatos do Firestore
    const fetchContacts = async () => {
      const unsubscribe = onSnapshot(collection(db, 'contatos'), (snapshot) => {
        const contactsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(contactsList);
      });
      return () => unsubscribe(); // Desinscrever-se do listener quando o componente for desmontado
    };

    fetchContacts();
  }, []);

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
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Lista de Contatos
      </h2>
      <DataTable
        columns={columns}
        data={contacts}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        striped
        noDataComponent="Nenhum contato cadastrado."
        paginationPerPage={4} // Exibir 4 itens por página
        paginationRowsPerPageOptions={[4, 8, 12]} // Opções de itens por página
      />
    </div>
  );
};

export default ContactList;
