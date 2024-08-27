// src/pages/Contatos.jsx
import React, { useState } from 'react';
import ContactForm from '../components/form/ContactForm';
import ContactList from '../components/list/ContactList';

const Contatos = () => {
  const [contacts, setContacts] = useState([]);

  const handleContactSubmit = (contact) => {
    // Handle contact submission logic here
    setContacts((prev) => [
      ...prev,
      { id: Date.now(), ...contact } // Adding a unique ID for each contact
    ]);
    console.log('Contato cadastrado:', contact);
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">
        <div className="flex-1 max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Cadastro de Contatos
          </h2>
          <ContactForm onSubmit={handleContactSubmit} />
        </div>
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
          <ContactList contacts={contacts} />
        </div>
      </div>
    </div>
  );
};

export default Contatos;
