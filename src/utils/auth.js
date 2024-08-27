// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return !!token; // Retorna verdadeiro se o token existir
  };
  
  // Função para obter o token de autenticação
  export const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };
  
  // Função para definir o token de autenticação
  export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  
  // Função para remover o token de autenticação
  export const removeAuthToken = () => {
    localStorage.removeItem('authToken');
  };
  