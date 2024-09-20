import JobCard from '../../components/Applicant/JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TitleFilter from '../../components/Applicant/TitleFilter';

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

type Applicant = {
  _id: string;
  name: string;
  email: string;
  resume: string;
}

export const JobsPage = () => {

  const applicantId = sessionStorage.getItem('applicantId') ?? '';
  console.log(applicantId);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applicant,setApplicant] = useState<Applicant>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);
  const [selectedTitles, setSelectedTitles] = useState<String[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {

    const fetchApplicant = async () => {
      try {
        const response = await axios.get<Applicant>(`http://localhost:5000/api/applicants/${applicantId}`);
        if (response.status == 200){
          setApplicant(response.data);
        }
        else{
          console.log('Error fetching applicant:', response.data);
        }
      } catch (error) {
        console.log('Error fetching applicant:', error);
      }
    }

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
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicant();
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [selectedTitles, jobs]);

  const filterJobs = () => {
    let filtered = jobs;

    if (selectedTitles.length > 0) {
      filtered = filtered.filter(job => 
        selectedTitles.some(selectedTitle =>
          selectedTitle.toLowerCase() === job.title.toLowerCase()
        )
      );
    }

    setFilteredJobs(filtered);
  };

  const handleTitleFilterChange = (titles: String[]) => {
    setSelectedTitles(titles);
  };

  return (
    <div className='main-div flex flex-col md:flex-row'>
      {/* filters div */}
      <div className='w-full md:w-1/5 mt-24 md:sticky top-0 h-5/6 border rounded-lg mx-8 md:mr-4'>
        <TitleFilter onFilterChange={handleTitleFilterChange}/>
      </div>

      {/* all jobs and filtered jobs */}
      <div className='w-full md:w-4/5'>
        <h1 className='font-semibold text-black mt-5 md:mt-24 py-0 px-10 text-lg md:text-3xl flex '>Recommended Jobs for {applicant?.name || 'Loading...'}
          <span className='bg-transparent font-semibold text-sm  text-black border border-slate-400 px-3 py-2 rounded-full ml-3'>{filteredJobs.length}</span>
        </h1>
        <div className='min-w-max px-5 md:px-8 lg:px-5 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-2 gap-y-3 gap-x-5 mx-5 md:mx-0'>
        {loading && <p>Loading jobs...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {filteredJobs.length > 0 ? (
          <>
            {filteredJobs.map((job,index) => (
              <JobCard
                key={job._id}
                index={index}
                job={job}
                applicantId={applicantId}
              />
            ))}
          </>
        ) : (
          !loading && <p>No jobs available.</p>
        )}
      </div>
      </div>
    </div>
  )
}

