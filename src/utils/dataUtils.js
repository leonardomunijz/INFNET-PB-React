// Função para formatar datas
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Função para ordenar uma lista de objetos por uma propriedade
  export const sortByProperty = (list, property) => {
    return list.slice().sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  };
  
  // Outras funções auxiliares podem estar aqui
  