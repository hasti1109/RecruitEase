import { useLocation } from 'react-router-dom'
import Navbar2 from '../../components/Applicant/Navbar2';
import JobCard from '../../components/Applicant/JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Job = {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  timestamp: string; 
  lastDateToApply: string; 
  noOfOpenings: number;
  noOfApplicants: number;
  salary: string,
  status: 'open' | 'closed' | 'paused';
}

export const HomePage = () => {

  const location = useLocation();
  const applicantData = location.state || 'no data';
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);
  //console.log(applicantData);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>('http://localhost:5000/api/jobs');
        const sortedJobs = response.data.sort((a, b) => {
          const dateA = new Date(a.timestamp).getTime();
          const dateB = new Date(b.timestamp).getTime();
          return dateB - dateA; // Descending order
        });
        setJobs(sortedJobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred'); // Set error message if request fails
      } finally {
        setLoading(false); // Set loading to false once request is complete
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar2/>
      <div className='main-div flex'>
        <div className='w-1/5 bg-pink-300 mt-20 text-white'>
          hellow orld
        </div>
        <div className='w-4/5'>
          <h1 className='font-semibold text-black mt-24 py-0 px-10 text-3xl flex '>Recommended Jobs
            <span className='bg-transparent font-semibold text-sm  text-black border border-slate-400 px-3 py-2 rounded-full ml-3'>{jobs.length}</span>
          </h1>
          <div className='px-5 md:px-14 lg:px-10 py-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-2 gap-y-3 gap-x-5'>
          {loading && <p>Loading jobs...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {jobs.length > 0 ? (
            <>
              {jobs.map((job,index) => (
                <JobCard
                  key={job._id}
                  index={index}
                  job={job}
                />
              ))}
            </>
          ) : (
            !loading && <p>No jobs available.</p>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}

