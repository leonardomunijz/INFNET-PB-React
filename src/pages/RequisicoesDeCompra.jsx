// src/pages/RequisicoesDeCompra.jsx
import React, { useState, useEffect } from 'react';
import { fetchPurchaseRequests } from '../utils/api'; // Certifique-se de que o caminho está correto

const RequisicoesDeCompra = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchPurchaseRequests();
        setRequests(data);
      } catch (error) {
        setError('Falha ao buscar requisições de compra.');
      }
    };

    loadRequests();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Requisições de Compra</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md mb-8" role="alert">
          <strong className="font-bold">Erro:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {requests.length > 0 ? (
            requests.map(request => (
              <li
                key={request.id}
                className="py-4 px-6 flex items-center justify-between text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="text-lg font-semibold text-gray-800">{request.name}</div>
                <div className="text-sm text-gray-500">{request.date}</div>
              </li>
            ))
          ) : (
            <li className="py-4 text-center text-gray-600">Nenhuma requisição de compra encontrada.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RequisicoesDeCompra;
