import React, { useState } from 'react';
import CheckBox from './CheckBox';

type StatusFilterProps = {
  onFilterChange: (selectedStatuses: String[]) => void;
};

const StatusFilter: React.FC<StatusFilterProps> = ({onFilterChange}) => {
  const [selectedStatuses, setSelectedStatuses] = useState<String[]>([]);
  const statusOptions = ['applied', 'not applied', 'under review', 'interviewing', 'offered', 'hired', 'rejected'];


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, status: String) => {
    const updatedStatuses = event.target.checked 
      ? [...selectedStatuses, status]
      : selectedStatuses.filter(s => s !== status);

    setSelectedStatuses(updatedStatuses);
    onFilterChange(updatedStatuses);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center font-semibold">Status</div>
      <div className="grid grid-cols-2 mt-1 text-xs bg-transparent">
        {statusOptions.map(status => (
          <CheckBox
            key={status}
            id={`status-${status}`}
            checked={selectedStatuses.includes(status)}
            onChange={(e) => handleCheckboxChange(e, status)}
            label={status}
          />
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
