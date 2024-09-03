import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importe o useNavigate
import { auth, db } from '../auth/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate(); // Inicialize o useNavigate

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email);

        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          setIsAdmin(userData && userData.role === 'admin');
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUserEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUserEmail('');
      navigate('/'); // Redireciona para a página inicial
    } catch (error) {
      console.error('Falha ao sair:', error);
    }
  };

  return (
    <>
      <nav className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-md text-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex space-x-4">
            <Link to="/" className="text-lg font-semibold hover:text-blue-400">Início</Link>
            {isAdmin && (
              <>
                <Link to="/fornecedores" className="text-lg font-semibold hover:text-blue-400">Fornecedores</Link>
                <Link to="/contatos" className="text-lg font-semibold hover:text-blue-400">Contatos</Link>
                <Link to="/produtos" className="text-lg font-semibold hover:text-blue-400">Produtos</Link>
                <Link to="/cotacoes" className="text-lg font-semibold hover:text-blue-400">Cotações</Link>
              </>
            )}
            {isAuthenticated && (
              <Link to="/requisicoes-de-compra" className="text-lg font-semibold hover:text-blue-400">Requisições de Compra</Link>
            )}
          </div>
          <div className="flex space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-lg font-semibold hover:text-blue-400">Login</Link>
                <Link to="/cadastrar" className="text-lg font-semibold hover:text-blue-400">Cadastrar</Link>
              </>
            ) : (
              <>
                {isAdmin && <Link to="/painel-administrativo" className="text-lg font-semibold hover:text-blue-400">Painel Administrativo</Link>}
                <span className="text-lg font-semibold">Olá, {userEmail}</span>
                <button
                  onClick={handleSignOut}
                  className="text-lg font-semibold hover:text-blue-400"
                >
                  Sair
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Adicionando o padding-top ao container do conteúdo */}
      <div className="pt-16">
        {/* Conteúdo da página aqui */}
      </div>
    </>
  );
};

export default Navbar;
