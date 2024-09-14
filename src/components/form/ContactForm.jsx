import React, { useState, useEffect } from 'react';
import { db } from '../../auth/firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

const ContactForm = ({ onContactAdded, contact, onCancel }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');

  // Buscar fornecedores do Firestore
  useEffect(() => {
    const fetchSuppliers = async () => {
      const supplierSnapshot = await getDocs(collection(db, 'fornecedores'));
      const supplierList = supplierSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setSuppliers(supplierList);
    };
    fetchSuppliers();
  }, []);

  // Se um contato for fornecido, preencher os campos
  useEffect(() => {
    if (contact) {
      setName(contact.name || '');
      setPhone(contact.phone || '');
      setEmail(contact.email || '');
      setSelectedSupplier(contact.supplier || '');
    }
  }, [contact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newContact = { name, phone, email, supplier: selectedSupplier };

      if (contact) {
        // Atualizar o contato existente
        await updateDoc(doc(db, 'contatos', contact.id), newContact);
      } else {
        // Adicionar um novo contato
        await addDoc(collection(db, 'contatos'), newContact);
      }

      onContactAdded(newContact);

      // Limpar os campos do formulário após o envio
      setName('');
      setPhone('');
      setEmail('');
      setSelectedSupplier('');
    } catch (e) {
      console.error('Erro ao adicionar/atualizar contato:', e);
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

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Fornecedor:</label>
        <select
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="" disabled>Selecione um fornecedor</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          {contact ? 'Atualizar Contato' : 'Cadastrar Contato'}
        </button>
        {contact && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
