import { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from '../../components/Recruiter/JobCard';
import JobDetail from '../../components/Recruiter/JobDetail';
import { FaPlus } from 'react-icons/fa6';
import PostJobModal from '../../components/Recruiter/PostJobModal';
import ApplicationDetails from '../../components/Recruiter/ApplicationDetails';
import { IoLocationOutline } from 'react-icons/io5';

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

const JobsPage = () => {

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);
  const [selectedJob, setSelectedJob] = useState<Job|null>(null);
  const [toggleState, setToggleState] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const toggleTab = (index: number) => {
    setToggleState(index);
  }

  return (
    <div className="p-4 flex-col flex-grow overflow-y-auto  min-h-screen bg-slate-100 w-full m-0">

      {/* header */}
      <div className='flex items-center justify-between mb-5'>
        <div className='font-semibold text-gray-700 font-secondary text- text-3xl p-3'>All Jobs</div>
        <button className='flex items-center bg-primary hover:text-primary border-[1.5px] hover:border-primary px-3 py-2 rounded-xl hover:bg-transparent text-white focus:outline-none' onClick={handleOpenModal}>
          <FaPlus />
          <span className='ml-2'>Post a Job</span>
        </button>
        {isModalOpen && <PostJobModal onClose={handleCloseModal}/>}
      </div>

      <div className='flex'>
        {/* all jobs section */}
        <div className={`w-2/5 px-2`}>
          {loading && <p>Loading jobs...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {jobs.length > 0 ? (
            <ul>
              {jobs.map(job => (
                <JobCard
                  key={job._id}
                  _id={job._id}
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

        {/* job detail and applications tabs */}
        <div className={` w-3/5 bg-white shadow-md rounded-lg p-3 mb-4 border border-gray-200 sticky top-0 h-screen overflow-y-auto`}>
          <div className='bloc-tabs flex flex-row justify-around font-bold text-lg text-primary cursor-pointer mb-5'>
            <div className={`${toggleState === 1 ? 'border-b-4 border-primary' : ''}`} onClick={() => toggleTab(1)}>Details</div>
            <div className={`${toggleState === 2 ? 'border-b-4 border-primary' : ''}`} onClick={() => toggleTab(2)}>Applications</div>
          </div>

          <div className='content-tabs'>
            <div className={`${toggleState === 1 ? 'block' : 'hidden'}`}>
              {
              selectedJob ? (
                <JobDetail job = {selectedJob}/>
              ) : (
                <p>Select a job to see details</p>
              )
            }
            </div>

            {/* aplications tab */}
            <div className={`${toggleState === 2 ? 'block' : 'hidden'}`}>
              {
                selectedJob ? (
                  <>
                    <div className='mb-2 p-2 flex justify-between items-center border-t-2'>
                      <h1 className='md:text-xl font-semibold text-gray-700 px-5 pt-2'>{selectedJob.title}</h1>
                      <span className='text-xs md:text-sm font-semibold text-gray-500 flex items-center'>{selectedJob.location}<IoLocationOutline/></span>
                    </div>
                  <ApplicationDetails job = {selectedJob}/>
                  </>
                ) : (
                  <p>Select a job to see applications</p>
                )
              }
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default JobsPage;
