import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import './style.css'; // Importa o arquivo CSS do Tailwind

const App = () => (
  <Router>
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/contatos" element={<Contatos />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/cotacoes" element={<Cotacoes />} />
          <Route path="/requisicoes-de-compra" element={<PurchaseRequests />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/painel-administrativo" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;
