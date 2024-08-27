import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 text-center fixed bottom-0 left-0 right-0">
    &copy; {new Date().getFullYear()} Leonardo Muniz. Todos os direitos reservados.
  </footer>
);

export default Footer;
