import React, { useState, useEffect } from 'react';
import {
  fetchPurchaseRequests,
  createPurchaseRequest,
  fetchProducts,
  fetchSuppliers,
  deletePurchaseRequest
} from '../utils/api';
import QuotationDetailsModal from '../components/QuotationDetailsModal';
import ConfirmationDialog from '../components/ConfirmationDialog';
import CreateQuotationModal from '../components/CreateQuotationModal';

const RequisicoesDeCompra = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [creatingRequest, setCreatingRequest] = useState(false);
  const [newRequestProductId, setNewRequestProductId] = useState('');
  const [newRequestSupplierId, setNewRequestSupplierId] = useState('');
  const [newRequestPrice, setNewRequestPrice] = useState('');
  const [newRequestObservations, setNewRequestObservations] = useState('');
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [isCreateQuotationModalOpen, setIsCreateQuotationModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchPurchaseRequests();
        setRequests(data);
      } catch (error) {
        setError('Falha ao buscar requisições de compra.');
      }
    };

    const loadProductsAndSuppliers = async () => {
      try {
        const [productData, supplierData] = await Promise.all([
          fetchProducts(),
          fetchSuppliers()
        ]);
        const sortedProducts = productData.sort((a, b) => a.name.localeCompare(b.name));
        setProducts(sortedProducts);
        setSuppliers(supplierData);
      } catch (error) {
        setError('Falha ao buscar produtos e fornecedores.');
      }
    };

    loadRequests();
    loadProductsAndSuppliers();
  }, []);

  const handleCreateRequest = () => {
    setCreatingRequest(true);
  };

  const handleSubmitRequest = async () => {
    try {
      await createPurchaseRequest(newRequestProductId, newRequestSupplierId, newRequestPrice, newRequestObservations);
      setCreatingRequest(false);
      setNewRequestProductId('');
      setNewRequestSupplierId('');
      setNewRequestPrice('');
      setNewRequestObservations('');
      const data = await fetchPurchaseRequests();
      setRequests(data);
    } catch (error) {
      setError('Falha ao criar requisição de compra.');
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleOpenConfirmationDialog = (requestId) => {
    setRequestToDelete(requestId);
    setIsDialogOpen(true);
  };

  const handleDeleteRequest = async () => {
    try {
      if (requestToDelete) {
        await deletePurchaseRequest(requestToDelete);
        setIsDialogOpen(false);
        setRequestToDelete(null);
        const data = await fetchPurchaseRequests();
        setRequests(data);
      }
    } catch (error) {
      setError('Falha ao deletar requisição de compra.');
    }
  };

  const handleCloseConfirmationDialog = () => {
    setIsDialogOpen(false);
    setRequestToDelete(null);
  };

  const handleOpenCreateQuotationModal = (request) => {
    setSelectedRequest(request);
    setIsCreateQuotationModalOpen(true);
  };

  const handleCloseCreateQuotationModal = () => {
    setIsCreateQuotationModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Requisições de Compra</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md mb-8" role="alert">
          <strong className="font-bold">Erro:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <button 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        onClick={handleCreateRequest}
      >
        Criar Nova Requisição
      </button>

      {creatingRequest && (
        <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Nova Requisição de Compra</h2>
          
          <select
            value={newRequestProductId}
            onChange={(e) => setNewRequestProductId(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
          >
            <option value="">Selecione o Produto</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>

          <select
            value={newRequestSupplierId}
            onChange={(e) => setNewRequestSupplierId(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
          >
            <option value="">Selecione o Fornecedor</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
            ))}
          </select>

          <input
            type="number"
            value={newRequestPrice}
            onChange={(e) => setNewRequestPrice(e.target.value)}
            placeholder="Preço"
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
          />

          <textarea
            value={newRequestObservations}
            onChange={(e) => setNewRequestObservations(e.target.value)}
            placeholder="Observações"
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
          />

          <button 
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            onClick={handleSubmitRequest}
          >
            Enviar Requisição
          </button>
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
                <div>
                  <div className="text-lg font-semibold text-gray-800">{request.name}</div>
                  <div className="text-sm text-gray-500">{request.date}</div>
                  <div className="text-sm text-gray-500">{request.productName}</div>
                  <div className="text-sm text-gray-500">{request.observations}</div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition"
                    onClick={() => handleViewDetails(request)}
                  >
                    Ver Detalhes
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                    onClick={() => handleOpenCreateQuotationModal(request)}
                  >
                    Criar Cotação
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                    onClick={() => handleOpenConfirmationDialog(request.id)}
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="py-4 px-6 text-center text-gray-500">Nenhuma requisição encontrada.</li>
          )}
        </ul>
      </div>

      {isDetailsModalOpen && selectedRequest && (
        <QuotationDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetails}
          requestId={selectedRequest.id}
        />
      )}

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseConfirmationDialog}
        onConfirm={handleDeleteRequest}
        message="Você tem certeza que deseja deletar esta requisição de compra?"
      />

      {isCreateQuotationModalOpen && (
        <CreateQuotationModal
          isOpen={isCreateQuotationModalOpen}
          onClose={handleCloseCreateQuotationModal}
          request={selectedRequest}
        />
      )}
    </div>
  );
};

export default RequisicoesDeCompra;
