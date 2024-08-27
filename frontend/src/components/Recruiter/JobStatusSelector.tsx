import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface JobStatusSelectorProps {
  jobId : string;
  initialStatus: 'open' | 'closed' | 'paused'; 
}

const JobStatusSelector: React.FC<JobStatusSelectorProps> = ({ initialStatus, jobId}) => {
  const [selectedStatus, setSelectedStatus] = useState<'open' | 'closed' | 'paused'>(initialStatus);

  const handleStatusChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.value as 'open' | 'closed' | 'paused';
    try {
      //throw new Error("jaan much ke error");
      const response = await axios.put(`http://localhost:5000/api/jobs/changeStatus/${jobId}`, {status: newStatus});
      console.log(response.status);
      if (response.status == 200){
        setSelectedStatus(newStatus); //only update state if success
        toast.success(response.data.message);   
      } 
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An unknown error occurred'); // toast error message if request fails
    }
  };

  return (
    <div className="flex flex-wrap justify-start mt-2">
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

      <Toaster position='bottom-center'/>
    </div>
  );
};

export default JobStatusSelector;
