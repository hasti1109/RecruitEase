import React, { useEffect, useState } from 'react';
import RecruiterSidebar from "../../components/RecruiterSidebar";
import axios from 'axios';
import JobCard from '../../components/JobCard';
import JobDetail from '../../components/JobDetail';

// Define the shape of a job object
interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  timestamp: string; 
  lastDateToApply: string; 
  noOfOpenings: number;
  salary: string,
  status: 'open' | 'closed' | 'paused';
}

const JobsPage: React.FC = () => {
  // State to store job data
  const [jobs, setJobs] = useState<Job[]>([]);
  // State to handle loading and error
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);

  const [selectedJob, setSelectedJob] = useState<Job|null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Replace with your API URL
        const response = await axios.get<Job[]>('http://localhost:5000/api/jobs');
        console.log(response.status);
        setJobs(response.data); // Store jobs in state
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred'); // Set error message if request fails
      } finally {
        setLoading(false); // Set loading to false once request is complete
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex">
      <RecruiterSidebar />
      <div className="p-7 flex-col h-screen bg-slate-100 w-full">
        <div className='font-semibold text-xl'>All Jobs</div>
        <div className='flex'>
          {/* all jobs section */}
        <div className='w-3/5 px-2'>
          {loading && <p>Loading jobs...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {jobs.length > 0 ? (
            <ul>
              {jobs.map(job => (
                <JobCard
                  key={job._id}
                  title={job.title}
                  description={job.requirements}
                  location={job.location}
                  noOfOpenings={job.noOfOpenings}
                  status={job.status}
                  salary={job.salary}
                  timestamp={job.timestamp}
                  lastDateToApply={job.lastDateToApply}
                  onDetailsClick={() => setSelectedJob(job)}
                />
              ))}
            </ul>
          ) : (
            !loading && <p>No jobs available.</p>
          )}
        </div>

        {/* job detail section */}
        <div className='w-2/5 bg-white shadow-md rounded-lg p-3 mb-4 border border-gray-200'>
          <h2 className='font-bold text-lg text-primary '>Details</h2>
          <div className="border-2 w-full border-primary inline-block mb-2 mt-3"></div>
          {
            selectedJob ? (
              <JobDetail job = {selectedJob}/>
            ) : (
              <p>Select a job to see details</p>
            )
          }
        </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
