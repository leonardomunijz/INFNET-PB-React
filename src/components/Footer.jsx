import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 text-center fixed bottom-0 left-0 right-0 bg-opacity-80 backdrop-filter backdrop-blur-md">
    &copy; {new Date().getFullYear()} ACME. Todos os direitos reservados.
  </footer>
);

export default Footer;
