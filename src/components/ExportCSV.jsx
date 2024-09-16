// src/components/ExportCSV.jsx
import React from 'react';

const ExportCSV = ({ csvData, fileName }) => {
  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(csvData[0]).join(",") + "\n" + 
      csvData.map(row => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link); // Requerido para o Firefox
    link.click();
  };

  return (
    <button 
      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      onClick={handleDownload}
    >
      Exportar CSV
    </button>
  );
};

export default ExportCSV;
