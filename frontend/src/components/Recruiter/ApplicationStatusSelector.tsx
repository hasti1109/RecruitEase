import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface ApplicationStatusSelectorProps {
  applicationId: string;
  initialStatus: 'Accepted' | 'Rejected' | 'Under review';
}

const ApplicationStatusSelector: React.FC<ApplicationStatusSelectorProps> = ({ applicationId, initialStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState<'Accepted' | 'Rejected' | 'Under review'>(initialStatus);

  const handleStatusChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.value as 'Accepted' | 'Rejected' | 'Under review';
    try {
      const response = await axios.put(`http://localhost:5000/api/applications/changeStatus/${applicationId}`, { status: newStatus });
      if (response.status === 200) {
        setSelectedStatus(newStatus); // only update state if success
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An unknown error occurred'); // toast error message if request fails
    }
  };

  return (
    <div className="flex flex-wrap justify-start mt-2">
      <label className={`cursor-pointer ${selectedStatus === 'Accepted' ? 'bg-green-500 text-white shadow-lg' : 'bg-white text-gray-700'} border border-gray-300 rounded-l-md px-3 py-1 transition-all duration-500 text-sm`}>
        <input
          type="radio"
          name="status"
          value="Accepted"
          checked={selectedStatus === 'Accepted'}
          onChange={handleStatusChange}
          className="sr-only"
        />
        <span>Accepted</span>
      </label>
      <label className={`cursor-pointer ${selectedStatus === 'Rejected' ? 'bg-red-500 text-white shadow-lg' : 'bg-white text-gray-700'} border border-gray-300 px-3 py-1 transition-all duration-500 text-sm`}>
        <input
          type="radio"
          name="status"
          value="Rejected"
          checked={selectedStatus === 'Rejected'}
          onChange={handleStatusChange}
          className="sr-only"
        />
        <span>Rejected</span>
      </label>
      <label className={`cursor-pointer ${selectedStatus === 'Under review' ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-gray-700'} border border-gray-300 rounded-r-md px-3 py-1 transition-all duration-500 text-sm`}>
        <input
          type="radio"
          name="status"
          value="Under review"
          checked={selectedStatus === 'Under review'}
          onChange={handleStatusChange}
          className="sr-only"
        />
        <span>Under review</span>
      </label>

      <Toaster position='bottom-center' />
    </div>
  );
};

export default ApplicationStatusSelector;
