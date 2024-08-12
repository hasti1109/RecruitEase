import React, { useState } from 'react';

interface JobStatusSelectorProps {
  initialStatus: 'open' | 'closed' | 'paused'; // Prop for initial status value
  onStatusChange: (status: 'open' | 'closed' | 'paused') => void; // Callback to handle status change
}

const JobStatusSelector: React.FC<JobStatusSelectorProps> = ({ initialStatus, onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState<'open' | 'closed' | 'paused'>(initialStatus);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.value as 'open' | 'closed' | 'paused';
    setSelectedStatus(newStatus);
    onStatusChange(newStatus); // Notify parent component of status change
  };

  return (
    <div className="flex flex-wrap justify-center mt-2">
      <label className={`cursor-pointer ${selectedStatus === 'open' ? 'bg-green-500 text-white shadow-lg' : 'bg-white text-gray-700'} border border-gray-300 rounded-l-md px-3 py-1 transition-all duration-500 text-sm`}>
        <input
          type="radio"
          name="status"
          value="open"
          checked={selectedStatus === 'open'}
          onChange={handleStatusChange}
          className="sr-only"
        />
        <span>Open</span>
      </label>
      <label className={`cursor-pointer ${selectedStatus === 'closed' ? 'bg-red-500 text-white shadow-lg' : 'bg-white text-gray-700'} border border-gray-300 px-3 py-1 transition-all duration-500 text-sm`}>
        <input
          type="radio"
          name="status"
          value="closed"
          checked={selectedStatus === 'closed'}
          onChange={handleStatusChange}
          className="sr-only"
        />
        <span>Closed</span>
      </label>
      <label className={`cursor-pointer ${selectedStatus === 'paused' ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-gray-700'} border border-gray-300 rounded-r-md px-3 py-1 transition-all duration-500 text-sm`}>
        <input
          type="radio"
          name="status"
          value="paused"
          checked={selectedStatus === 'paused'}
          onChange={handleStatusChange}
          className="sr-only"
        />
        <span>Paused</span>
      </label>
    </div>
  );
};

export default JobStatusSelector;
