import React, { useState, useEffect } from 'react';

const SupplierForm = ({ onSubmit, selectedSupplier, clearSelectedSupplier }) => {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (selectedSupplier) {
      setName(selectedSupplier.name || '');
      setCnpj(selectedSupplier.cnpj || '');
      setAddress(selectedSupplier.address || '');
    } else {
      setName('');
      setCnpj('');
      setAddress('');
    }
  }, [selectedSupplier]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const supplier = {
      id: selectedSupplier ? selectedSupplier.id : null,
      name,
      cnpj,
      address,
    };
    onSubmit(supplier);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">CNPJ:</label>
        <input
          type="text"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Endereço:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition"
      >
        {selectedSupplier ? 'Atualizar Fornecedor' : 'Cadastrar Fornecedor'}
      </button>
      {selectedSupplier && (
        <button
          type="button"
          onClick={clearSelectedSupplier}
          className="bg-gray-500 text-white rounded-lg px-4 py-2 ml-2 hover:bg-gray-600 transition"
        >
          Cancelar
        </button>
      )}
    </form>
  );
};

export default SupplierForm;
