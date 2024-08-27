import React from 'react';
import RegisterForm from '../components/form/RegisterForm'; // Certifique-se de que o caminho está correto

const Cadastrar = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Registrar
      </h2>
      <RegisterForm />
    </div>
  </div>
);

export default Cadastrar;
