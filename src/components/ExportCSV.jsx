import React from 'react';
import { CSVLink } from 'react-csv';

const ExportCSV = ({ data, filename }) => (
  <CSVLink data={data} filename={filename}>
    Exportar CSV
  </CSVLink>
);

export default ExportCSV;
