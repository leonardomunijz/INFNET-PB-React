import React, { useState } from 'react';
import { db } from '../../auth/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const ContactForm = ({ onContactAdded }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newContact = { name, phone, email };
      await addDoc(collection(db, 'contatos'), newContact);
      onContactAdded(newContact);
      
      // Limpar os campos do formulário após o envio
      setName('');
      setPhone('');
      setEmail('');
    } catch (e) {
      console.error('Erro ao adicionar contato:', e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Nome do Contato:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Telefone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Cadastrar Contato
      </button>
    </form>
  );
};

export default ContactForm;
