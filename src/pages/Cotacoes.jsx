// src/pages/Cotacoes.jsx
import React, { useState } from 'react';
import QuotationForm from '../components/form/QuotationForm';
import QuotationList from '../components/list/QuotationList';

const Cotacoes = () => {
  const [quotations, setQuotations] = useState([]);

  const handleQuotationSubmit = (quotation) => {
    
    setQuotations((prev) => [
      ...prev,
      { id: Date.now(), ...quotation }
    ]);
    console.log('Cotação cadastrada:', quotation);
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">
        <div className="flex-1 max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Cadastro de Cotações</h2>
          <QuotationForm onSubmit={handleQuotationSubmit} />
        </div>
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
          <QuotationList quotations={quotations} />
        </div>
      </div>
    </div>
  );
};

export default Cotacoes;
