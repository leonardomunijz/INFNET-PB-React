import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Inicio';
import Fornecedores from './pages/Fornecedores';
import Contatos from './pages/Contatos';
import Produtos from './pages/Produtos';
import Cotacoes from './pages/Cotacoes';
import PurchaseRequests from './pages/RequisicoesDeCompra';
import Login from './pages/Login';
import Cadastrar from './pages/Cadastrar';
import AdminDashboard from './pages/AdminDashboard';
import { auth, db } from './auth/firebaseConfig'; // Importando auth e db
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import './style.css'; // Importa o arquivo CSS do Tailwind

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-4xl font-extrabold text-gray-700 text-center">
          Carregando...
        </div>
      </div>
    );
  }

  const ProtectedRoute = ({ element, requiredRole }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (requiredRole && user.role !== requiredRole) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-4xl font-extrabold text-gray-700 text-center">
            Você não tem permissão para acessar esta página.
          </div>
        </div>
      );
    }
    return element;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fornecedores" element={<ProtectedRoute element={<Fornecedores />} requiredRole="admin" />} />
            <Route path="/contatos" element={<ProtectedRoute element={<Contatos />} requiredRole="admin" />} />
            <Route path="/produtos" element={<ProtectedRoute element={<Produtos />} requiredRole="admin" />} />
            <Route path="/cotacoes" element={<ProtectedRoute element={<Cotacoes />} requiredRole="admin" />} />
            <Route path="/requisicoes-de-compra" element={<PurchaseRequests />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrar" element={<Cadastrar />} />
            <Route path="/painel-administrativo" element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
