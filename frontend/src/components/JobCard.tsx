import React from 'react';
import { MdEdit } from 'react-icons/md';
import { IoLocationOutline, IoPersonOutline, } from 'react-icons/io5';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FaArrowRight } from 'react-icons/fa6';
import { BsPinAngle } from 'react-icons/bs';

interface JobCardProps {
  title: string;
  description: string[];
  location: string;
  noOfOpenings: number;
  status: 'open' | 'closed' | 'paused';
  salary: string,
  timestamp: string;
  lastDateToApply: string;
  onDetailsClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  location,
  noOfOpenings,
  salary,
  status,
  timestamp,
  onDetailsClick,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-3 mb-4 border border-gray-200 ">
      <div className='flex justify-between items-center'>
        <div className='bg-slate-200 rounded-lg w-auto p-2 text-xs'>{new Date(timestamp).toLocaleDateString()}</div>
        <div className='cursor-pointer'><MdEdit/></div>
      </div>

      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>

      <div className='flex justify-start text-sm mt-1 items-center'>
        <div><IoLocationOutline/></div>
        <p className='px-2'>{location}</p>
      </div>

      <div className='flex justify-start text-sm mt-1 items-center'>
        <div><RiMoneyRupeeCircleLine /></div>
        <p className='px-2'>{salary}</p>
      </div>

      <div className='flex justify-start text-sm  mt-1 items-center'>
        <div><IoPersonOutline/></div>
        <p className='px-2'>{noOfOpenings} openings</p>
      </div>

      <div className='text-sm flex justify-between items-center'>
        <p className={`${status === 'open' ? 'text-green-600' : status === 'closed' ? 'text-red-600' : status === 'paused' ? 'text-blue-600' : ''} font-semibold flex items-center`}><BsPinAngle/><span className='ml-1'>{status}</span></p>
        <button className='flex items-center bg-transparent text-primary border-[1.5px] border-primary px-4 py-2 rounded-xl hover:bg-primary hover:text-white focus:outline-none' onClick={onDetailsClick}>
          <span className='mr-2'>Details</span>
          <FaArrowRight />
        </button>
      </div>
      
    </div>
  );
};

export default JobCard;
