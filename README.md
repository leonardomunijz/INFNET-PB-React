# Projeto de Bloco: Front-End com Frameworks

## Projeto de Gerenciamento de Cotações

## Aluno:
- **Nome**: Leonardo da Conceição Muniz
- **Curso**: Engenharia de Software (EAD / Live)
- **Período**: 3º Período 

## Descrição
Este projeto é um aplicativo de gerenciamento de cotações desenvolvido em React. Ele permite que os usuários visualizem detalhes de requisições, gerenciem cotações de fornecedores e acompanhem o status de suas requisições.

## Funcionalidades
- **Visualização de Detalhes da Requisição**: Os usuários podem visualizar detalhes específicos de uma requisição, incluindo informações sobre fornecedores e produtos.
- **Gerenciamento de Cotações**: Os usuários podem ver cotações com base no status selecionado (Aberta, Em Cotação, Cotada).
- **Autenticação de Usuário**: O sistema utiliza Firebase Authentication para gerenciar o login e a segurança dos dados dos usuários.
- **Integração com Firebase**: Os dados são armazenados e recuperados utilizando o Firebase Firestore.
- **Controle de Acesso**:
  - **Admin**: Usuários com privilégios de administrador podem realizar operações CRUD (Criar, Ler, Atualizar e Deletar) em fornecedores, contatos e produtos. Além disso, têm acesso a todas as requisições, podendo gerenciar informações sensíveis e realizar ações administrativas.
  - **Colaborador**: Usuários com privilégios de colaborador têm acesso restrito, podendo visualizar apenas requisições de compras. Isso garante que possam interagir com o sistema sem comprometer a segurança e a integridade dos dados.

## Tecnologias Utilizadas
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Firebase**: Plataforma para autenticação e armazenamento de dados.
- **React Router**: Gerenciamento de rotas no aplicativo.
