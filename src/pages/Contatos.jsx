import React, { useState, useEffect } from 'react';
import ContactForm from '../components/form/ContactForm';
import ContactList from '../components/list/ContactList';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../auth/firebaseConfig';

const Contatos = () => {
  const [contacts, setContacts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    const unsubscribeContacts = onSnapshot(collection(db, 'contatos'), (snapshot) => {
      const contactList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(contactList);
    });

    const unsubscribeSuppliers = onSnapshot(collection(db, 'fornecedores'), (snapshot) => {
      const supplierList = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setSuppliers(supplierList);
    });

    return () => {
      unsubscribeContacts();
      unsubscribeSuppliers();
    };
  }, []);

  const handleContactSubmit = async (contact) => {
    try {
      if (editingContact) {
        // Atualizar contato existente
        await updateDoc(doc(db, 'contatos', editingContact.id), contact);
        setEditingContact(null);
      } else {
        // Verificar se o contato já existe
        const contactsQuery = query(collection(db, 'contatos'), where('email', '==', contact.email));
        const querySnapshot = await getDocs(contactsQuery);
        if (querySnapshot.empty) {
          // Adicionar novo contato
          await addDoc(collection(db, 'contatos'), contact);
        } else {
          console.log('Contato com este email já existe.');
        }
      }
      console.log('Contato salvo:', contact);
    } catch (error) {
      console.error('Erro ao salvar contato:', error);
    }
  };

  const handleDeleteContact = async () => {
    try {
      if (contactToDelete) {
        await deleteDoc(doc(db, 'contatos', contactToDelete));
        console.log('Contato excluído:', contactToDelete);
        setContactToDelete(null);
      }
    } catch (error) {
      console.error('Erro ao excluir contato:', error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">
        <div className="flex-1 max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            {editingContact ? 'Editar Contato' : 'Cadastro de Contatos'}
          </h2>
          <ContactForm
            onContactAdded={handleContactSubmit}
            contact={editingContact}
            onCancel={() => setEditingContact(null)}
          />
        </div>
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
          <ContactList
            contacts={contacts}
            onDelete={(id) => {
              setContactToDelete(id);
              setIsDialogOpen(true);
            }}
            onEdit={handleEditContact}
            suppliers={suppliers}
          />
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        message="Você tem certeza de que deseja excluir este contato?"
        onConfirm={handleDeleteContact}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default Contatos;
