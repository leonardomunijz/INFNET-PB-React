import React, { useState, useEffect } from 'react';
import { fetchPurchaseRequests } from '../../../utils/api'; // Tenho uma função para buscar requisições de compras

const PurchaseRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const data = await fetchPurchaseRequests();
        setRequests(data);
      } catch (error) {
        console.error('Erro ao buscar requisições de compras:', error);
      }
    };
    getRequests();
  }, []);

  return (
    <div>
      <h1>Requisições de Compras</h1>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            {request.title} - {request.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseRequests;
