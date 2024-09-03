import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebaseConfig'; // Importar configuração do Firebase
import { onAuthStateChanged } from 'firebase/auth';

// Cria o contexto de autenticação
const AuthContext = createContext();

// Fornece o contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Pode substituir por um spinner ou uma mensagem de carregamento
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};
