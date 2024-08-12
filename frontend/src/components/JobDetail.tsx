import React, { useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import JobStatusSelector from './JobStatusSelector';

interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  timestamp: string; 
  lastDateToApply: string; 
  noOfOpenings: number;
  noOfApplicants: number;
  salary: string;
  status: 'open' | 'closed' | 'paused';
}

interface JobCardProps {
  job : Job;
}

const JobDetail: React.FC<JobCardProps> = ({
  job
}) => {

  const formattedDescription = job.description.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br/>
    </React.Fragment>
  ));
  
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleStatusChange = (jobId: string, newStatus: 'open' | 'closed' | 'paused') => {
    console.log(jobId);
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job._id === jobId ? { ...job, status: newStatus } : job
      )
    );
    // Optionally, send the status change to the server
  };

  return (
    <div className="flex-col p-2">
      {/* job title and location */}
      <div className='flex justify-between items-center'>
        <h1 className='md:text-xl font-semibold text-gray-700'>{job.title}</h1>
        <span className='text-xs md:text-sm font-semibold text-gray-500 flex items-center'>{job.location}<IoLocationOutline/></span>
      </div>

      {/* job desc */}
      <p className='font-semibold text-sm md:text-md mt-4'>About the job:</p>
      <p className='text-gray-500 text-xs md:text-sm mt-1'>{formattedDescription}</p>

      {/* requirements */}
      <p className='font-semibold text-sm md:text-md mt-4'>Skills required:</p>
      <div className='text-gray-500 text-xs md:text-sm mt-1'>
        <ul className='list-disc px-5'>
          {job.requirements.map(requirement => (
            <li>{requirement}</li>
          ))}
        </ul>
      </div>

      {/* salary */}
      <p className='font-semibold text-sm md:text-md mt-3'>CTC : <span className='text-xs md:text-sm font-normal text-gray-500'>{job.salary}</span></p>

      {/* no of applicants and opening */}
      <p className='font-semibold text-sm md:text-md mt-2'>Total openings : <span className='text-xs md:text-sm font-normal text-gray-500'>{job.noOfOpenings}</span></p>
      <p className='font-semibold text-sm md:text-md mt-2'>Total applicants : <span className='text-xs md:text-sm font-normal text-gray-500'>{job.noOfApplicants}</span></p>

      {/* job status */}
      <JobStatusSelector
        key={job._id}
        initialStatus={job.status}
        onStatusChange={(newStatus) => handleStatusChange(job._id,newStatus)}
      />

    </div>
  );
};

export default JobDetail;
