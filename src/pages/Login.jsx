// src/pages/Login.jsx
import React from 'react';
import LoginForm from '../components/form/LoginForm';

const Login = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Login
      </h1>
      <LoginForm />
    </div>
  </div>
);

export default Login;
