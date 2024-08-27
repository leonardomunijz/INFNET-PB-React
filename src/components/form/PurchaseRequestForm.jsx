import React, { useState } from 'react';

const PurchaseRequestForm = ({ onSubmit }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Descrição:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      
      <button type="submit">Criar Requisição de Compras</button>
    </form>
  );
};

export default PurchaseRequestForm;
