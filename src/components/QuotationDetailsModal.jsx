import React, { useEffect, useState } from 'react';
import { db } from '../auth/firebaseConfig'; // Ajuste o caminho conforme necessário
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import ExportCSV from './ExportCSV'; // Importa o componente de exportação CSV

const QuotationDetailsModal = ({ request, onClose }) => {
  const [quotations, setQuotations] = useState([]);
  const [requestStatus, setRequestStatus] = useState('Cotada');
  const [isLoading, setIsLoading] = useState(false); // Estado para controle de loading

  useEffect(() => {
    if (request && request.id) {
      fetchQuotationsAndStatus();
    }
  }, [request]); // Dependência no `request`

  const fetchQuotationsAndStatus = async () => {
    setIsLoading(true); // Inicia o loading
    try {
      // Buscar o status da requisição
      const requestDoc = doc(db, 'purchaseRequests', request.id);
      const requestSnapshot = await getDocs(requestDoc);
      const requestData = requestSnapshot.data();
      setRequestStatus(requestData?.status || 'Aberta');
  
      // Buscar as cotações relacionadas à requisição
      const quotationsQuery = query(
        collection(db, 'quotations'),
        where('requestId', '==', request.id)
      );
      const querySnapshot = await getDocs(quotationsQuery);
      const fetchedQuotations = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      setQuotations(fetchedQuotations);
    } catch (error) {
      console.error('Erro ao buscar cotações e status:', error);
    } finally {
      setIsLoading(false); // Finaliza o loading
    }
  };

  const handleRequestStatusChange = async (newStatus) => {
    if (request && request.id) {
      setIsLoading(true); // Inicia o loading
      try {
        // Atualiza o status da requisição no Firestore
        await updateDoc(doc(db, 'purchaseRequests', request.id), { status: newStatus });
        // Atualiza o estado local para refletir a mudança
        setRequestStatus(newStatus);
      } catch (error) {
        console.error('Erro ao atualizar o status da requisição:', error);
      } finally {
        setIsLoading(false); // Finaliza o loading
      }
    }
  };

  if (!request) return null;

  const statusColor = {
    Aberta: 'text-green-600',
    'Em Cotação': 'text-yellow-600',
    Cotada: 'text-blue-600'
  }[requestStatus] || 'text-gray-600';

  const csvData = [
    {
      Produto: request.productName || 'N/A',
      Fornecedor: request.supplierName || 'N/A',
      Preço: request.price || 'N/A',
      'Data de Solicitação': request.requestDate || 'N/A',
      Observações: request.observations || 'Nenhuma',
      Status: requestStatus || 'N/A'
    }
  ];

  // Cotações fictícias
  const fictitiousQuotations = {
    Aberta: [
      {
        id: '1',
        supplierName: 'Fornecedor A',
        price: 100.00,
        observations: 'Observação sobre a cotação A'
      }
    ],
    'Em Cotação': [
      {
        id: '1',
        supplierName: 'Fornecedor A',
        price: 100.00,
        observations: 'Observação sobre a cotação A'
      },
      {
        id: '2',
        supplierName: 'Fornecedor B',
        price: 120.00,
        observations: 'Observação sobre a cotação B'
      }
    ],
    Cotada: [
      {
        id: '1',
        supplierName: 'Fornecedor A',
        price: 100.00,
        observations: 'Observação sobre a cotação A'
      },
      {
        id: '2',
        supplierName: 'Fornecedor B',
        price: 120.00,
        observations: 'Observação sobre a cotação B'
      },
      {
        id: '3',
        supplierName: 'Fornecedor C',
        price: 110.00,
        observations: 'Observação sobre a cotação C'
      }
    ]
  };

  // Substitui cotações reais por fictícias baseadas no status
  const displayedQuotations = fictitiousQuotations[requestStatus] || [];

  // Dados fictícios para a requisição
  const fakeRequest = {
    productName: 'Produto Exemplo',
    supplierName: 'Fornecedor Exemplo',
    price: 150.00,
    requestDate: '2024-09-15',
    observations: 'Observações fictícias para demonstração.'
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Detalhes da Requisição</h2>
        <p><strong>Produto:</strong> {fakeRequest.productName || 'N/A'}</p>
        <p><strong>Fornecedor:</strong> {fakeRequest.supplierName || 'N/A'}</p>
        <p><strong>Preço:</strong> R$ {fakeRequest.price || 'N/A'}</p>
        <p><strong>Data de Solicitação:</strong> {fakeRequest.requestDate || 'N/A'}</p>
        <p><strong>Observações:</strong> {fakeRequest.observations || 'Nenhuma'}</p>

        {/* Dropdown para o status da requisição */}
        <p>
          <strong>Status da Requisição:</strong>
          <select
            value={requestStatus}
            onChange={(e) => handleRequestStatusChange(e.target.value)}
            className="ml-2 border border-gray-300 rounded-lg p-1"
            disabled={isLoading} // Desabilita o select enquanto o loading está ativo
          >
            <option value="Aberta">Aberta</option>
            <option value="Em Cotação">Em Cotação</option>
            <option value="Cotada">Cotada</option>
          </select>
        </p>

        {/* Seção para exibir as cotações */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Cotações</h3>
          {displayedQuotations.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {displayedQuotations.map(quotation => (
                <li key={quotation.id} className="py-2">
                  <p><strong>Fornecedor:</strong> {quotation.supplierName || 'N/A'}</p>
                  <p><strong>Preço:</strong> R$ {quotation.price !== undefined ? quotation.price : 'N/A'}</p>
                  <p><strong>Observações:</strong> {quotation.observations || 'Nenhuma'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Nenhuma cotação encontrada.</p>
          )}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={onClose}
          >
            Fechar
          </button>
          <ExportCSV csvData={csvData} fileName="detalhes_requisicao.csv" />
        </div>
      </div>
    </div>
  );
};

export default QuotationDetailsModal;
