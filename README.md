# Sistema de Compras ACME

Este é o sistema de compras ACME, desenvolvido como parte do Projeto de Bloco (PB) da disciplina de Front-End com Frameworks na instituição Infnet. O sistema é construído com ReactJS e Firebase Firestore para facilitar a criação de cotações e requisições de compras.

## Funcionalidades

- **Cotações e Requisições de Compras**: 
  - O colaborador pode abrir requisições de compras.
  - O status da requisição muda automaticamente de acordo com o número de cotações criadas:
    - Após a primeira e segunda cotação, o status é atualizado para "Em aberto".
    - Na terceira cotação, o status da requisição muda para "Fechado".
  
- **Gerenciamento de Usuários**:
  - **Colaboradores**: 
    - Apenas podem abrir requisições de compras.
  - **Administradores**: 
    - Podem cadastrar fornecedores, contatos e produtos.
    - Têm acesso a um painel de administração para gerenciar o sistema.

## Tecnologias Utilizadas

- **ReactJS**: Biblioteca JavaScript para a construção da interface do usuário.
- **Firebase**: 
  - **Firebase Authentication**: Usado para autenticação de usuários (admin e colaborador).
  - **Firestore**: Usado para armazenar os dados das requisições, cotações, fornecedores, contatos e produtos.

## Estrutura de Conta

O sistema possui dois tipos de conta:

- **Colaborador**: 
  - Pode abrir novas requisições de compras e acompanhar o status de suas requisições.
  
- **Administrador**: 
  - Tem permissões para gerenciar fornecedores, contatos e produtos.
  - Pode acessar o painel de administração para visualizar e editar informações do sistema.

## Configuração do Projeto

1. Clone o repositório:

```bash
https://github.com/leonardomunijz/INFNET-PB-React.git
