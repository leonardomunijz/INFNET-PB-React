import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth'; // Importando a autenticação do Firebase

const QuotationDetailsModal = ({ isOpen, onClose, requestId }) => {
  const [quotationDetails, setQuotationDetails] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Aberta'); // Status inicial
  const [userEmail, setUserEmail] = useState(''); // Estado para o e-mail do usuário
  const [fictitiousQuotes, setFictitiousQuotes] = useState([]); // Estado para cotações fictícias

  useEffect(() => {
    const loadQuotationDetails = async () => {
      if (requestId) {
        try {
          const auth = getAuth(); // Obtendo a instância de autenticação
          const user = auth.currentUser; // Obtendo o usuário atual

          // Se o usuário estiver logado, pegar o e-mail
          if (user) {
            setUserEmail(user.email);
          }

          // Dados fictícios da cotação
          const fictitiousData = {
            requestId: requestId,
            supplierName: "Fornecedor Exemplo",
            productName: "Produto Exemplo",
            price: "R$ 150,00",
            observations: "Observações sobre a requisição",
            status: "Aberta",
            email: userEmail // Adicionando o e-mail ao objeto
          };
          setQuotationDetails(fictitiousData);
        } catch (error) {
          setError('Erro ao buscar detalhes da cotação: ' + error.message);
        }
      }
    };

    loadQuotationDetails();
  }, [requestId, userEmail]); // Adicionando userEmail como dependência

  // Atualiza as cotações fictícias com base no status
  useEffect(() => {
    const generateFictitiousQuotes = () => {
      switch (status) {
        case 'Aberta':
          setFictitiousQuotes([]); // Não mostra cotações
          break;
        case 'Em Cotação':
          setFictitiousQuotes([
            { id: 1, supplier: "Fornecedor Alpha", price: "R$ 110,00", observations: "Cotação em processo. Validade até 10 dias." },
            { id: 2, supplier: "Fornecedor Gama", price: "R$ 115,00", observations: "Cotação em processo. Necessário confirmar disponibilidade." }
          ]);
          break;
        case 'Cotada':
          setFictitiousQuotes([
            { id: 1, supplier: "Fornecedor Alpha", price: "R$ 110,00", observations: "Cotação aceita. Entrega programada para 5 dias." },
            { id: 2, supplier: "Fornecedor Gama", price: "R$ 115,00", observations: "Cotação aceita. Inclui garantia de 1 ano." },
            { id: 3, supplier: "Fornecedor Zeta", price: "R$ 150,00", observations: "Cotação aceita. Condições especiais para pagamento." }
          ]);
          break;
        default:
          setFictitiousQuotes([]);
      }
    };

    generateFictitiousQuotes();
  }, [status]); // Atualiza cotações quando o status mudar

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-lg font-semibold mb-4">Detalhes da Requisição</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            <strong className="font-bold">Erro:</strong>
            <span className="block">{error}</span>
          </div>
        )}

        {quotationDetails ? (
          <div>
            <p><strong>ID da Requisição:</strong> {quotationDetails.requestId}</p>
            <p><strong>Fornecedor:</strong> {quotationDetails.supplierName}</p>
            <p><strong>Produto:</strong> {quotationDetails.productName}</p>
            <p><strong>Preço:</strong> {quotationDetails.price}</p>
            <p><strong>Observações:</strong> {quotationDetails.observations}</p>
            <p><strong>Autor da Requisição:</strong> {quotationDetails.email}</p>

            <div className="mt-4">
              <label className="block mb-2"><strong>Status:</strong></label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              >
                <option value="Aberta">Aberta</option>
                <option value="Em Cotação">Em Cotação</option>
                <option value="Cotada">Cotada</option>
              </select>
            </div>

            <div className="mt-4">
              <h3 className="text-md font-semibold">Cotações:</h3>
              <ul>
                {fictitiousQuotes.map(quote => (
                  <li key={quote.id} className="border p-2 mt-2">
                    <p><strong>Fornecedor:</strong> {quote.supplier}</p>
                    <p><strong>Preço:</strong> {quote.price}</p>
                    <p><strong>Observações:</strong> {quote.observations}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>Carregando detalhes...</p>
        )}

        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default QuotationDetailsModal;
