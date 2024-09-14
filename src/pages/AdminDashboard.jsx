import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o useNavigate
import { db } from '../auth/firebaseConfig';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import UserList from '../components/list/UserList';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    const checkAdminStatus = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
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
      setIsLoading(false);
    };

    fetchUsers();
    checkAdminStatus();
  }, []);

  const handleBlockUser = async (userId, isBlocked) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { isBlocked: !isBlocked }); // Alterna o estado de isBlocked
      setUsers(users.map(user =>
        user.id === userId ? { ...user, isBlocked: !isBlocked } : user
      ));
      console.log('Estado do usuário atualizado:', userId);
    } catch (error) {
      console.error('Erro ao atualizar o estado do usuário:', error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Painel de Administração</h1>
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Usuários</h2>
        <Link to="/cadastrar">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition mb-2">
              Criar Usuário
            </button>
          </Link>
        <UserList users={users} onBlock={handleBlockUser} isAdmin={isAdmin} currentUserRole={currentUserRole} />
      </div>
    </div>
  );
};

export default AdminDashboard;
