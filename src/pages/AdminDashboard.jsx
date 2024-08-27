import React, { useEffect, useState } from 'react';
import { db } from '../auth/firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import UserList from '../components/list/UserList';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState('');

  useEffect(() => {
    // Função para buscar usuários do Firestore
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(userList);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    // Função para verificar se o usuário atual é admin e buscar o papel do usuário atual
    const checkAdminStatus = async () => {
      const user = JSON.parse(localStorage.getItem('user')); // Obtém o usuário autenticado do localStorage ou contexto
      if (user && user.role === 'admin') {
        setIsAdmin(true);
      }
      if (user && user.uid) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentUserRole(userData.role);
        }
      }
    };

    fetchUsers();
    checkAdminStatus();
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { isBlocked: true }); // Atualiza o campo isBlocked para true
      setUsers(users.map(user =>
        user.id === userId ? { ...user, isBlocked: true } : user
      ));
      console.log('Usuário bloqueado:', userId);
    } catch (error) {
      console.error('Erro ao bloquear usuário:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-6">Painel de Administração</h1>
      <UserList users={users} onBlock={handleBlockUser} isAdmin={isAdmin} currentUserRole={currentUserRole} />
    </div>
  );
};

export default AdminDashboard;
