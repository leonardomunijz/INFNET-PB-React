import React from 'react';

const RequisitionStatus = ({ status }) => {
  let statusColor = 'text-green-600';

  if (status === 'Fechado') {
    statusColor = 'text-red-600';
  } else if (status === 'Aprovada') {
    statusColor = 'text-blue-600';
  }

  return (
    <div className={`font-semibold ${statusColor}`}>
      {status}
    </div>
  );
};

export default RequisitionStatus;