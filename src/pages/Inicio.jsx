import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Adiciona navegação entre páginas
import { auth, db } from '../auth/firebaseConfig'; // Importe a configuração do Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Inicio = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          if (userData && userData.role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      } else {
        setIsAdmin(false);
      }
      setIsLoading(false); // Indica que o carregamento foi concluído
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserRole(user);
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar o componente
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center">
        Bem-vindo ao Sistema de Compras
      </h1>
      <p className="text-xl text-gray-700 mb-8 text-center">
        {isAdmin
          ? 'Gerencie fornecedores, contatos, produtos, cotações e requisições de compras com facilidade.'
          : 'Solicite e gerencie suas requisições de compra com eficiência.'}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl">
        {isAdmin ? (
          <>
            <Link to="/fornecedores" className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-50 transition">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fornecedores</h2>
              <p className="text-gray-600">
                Adicione e gerencie seus fornecedores. Mantenha suas informações organizadas e atualizadas.
              </p>
            </Link>
            <Link to="/contatos" className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-50 transition">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contatos</h2>
              <p className="text-gray-600">
                Cadastre e organize seus contatos para um gerenciamento eficiente.
              </p>
            </Link>
            <Link to="/produtos" className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-50 transition">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Produtos</h2>
              <p className="text-gray-600">
                Gerencie seus produtos com detalhes precisos e atualizações em tempo real.
              </p>
            </Link>
            <Link to="/cotacoes" className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-50 transition">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cotações</h2>
              <p className="text-gray-600">
                Registre e acompanhe suas cotações de forma fácil e rápida.
              </p>
            </Link>
            <Link to="/requisicoes-de-compra" className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-50 transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Requisições de Compra</h2>
            <p className="text-gray-600">
              Solicite e gerencie suas requisições de compra com eficiência.
            </p>
          </Link>
            <Link to="/painel-administrativo" className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-50 transition">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Painel Administrativo</h2>
              <p className="text-gray-600">
                Acesse o painel administrativo para gerenciar usuários e configurar permissões.
              </p>
            </Link>
          </>
        ) : (
          <Link to="/requisicoes-compra" className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-50 transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Requisições de Compra</h2>
            <p className="text-gray-600">
              Solicite e gerencie suas requisições de compra com eficiência.
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Inicio;
