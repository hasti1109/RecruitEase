import axios from "axios";
import { useEffect, useState } from "react";
import JobCard from "../../components/Applicant/JobCard";

type Job = {
  _id: string;
  title: string;
  requirements: string[];
  location: string;
  noOfOpenings: number;
  status: 'open' | 'closed' | 'paused';
  salary: string,
  timestamp: string;
  lastDateToApply: string;
  desciption: string
}

const SavedJobsPage = () => {

  const applicantId = sessionStorage.getItem('applicantId');
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get<Job[]>(`http://localhost:5000/api/applicants/${applicantId}/savedJobs`);
        if(response.status == 200){
          setSavedJobs(response.data);
        }
        else{
          throw new Error("Error fetching saved jobs.");
        }
      } catch (err) {
        console.log(err);
        setError(err as string);
        setLoading(false);
      } finally{
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center mx-6 md:mx-0'>
      {/* header */}
      <div className='flex w-full md:w-3/5'>
        <div className='font-semibold text-gray-700 font-secondary mt-20 text-xl md:text-3xl py-3 self-start'>Saved Jobs</div>
      </div>
      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className='min-w-max px-5 md:px-8 lg:px-5 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-2 gap-y-3 gap-x-5 mx-5 md:mx-0'>
      {savedJobs.length > 0 ? (
        <>
          {savedJobs.map((job,index) => (
            <JobCard
              key={job._id}
              index={index}
              job={job}
              applicantId={applicantId ?? ''}
            />
          ))}
        </>
        ) : (
          !loading && <p>No jobs available.</p>
      )}
      </div>
    </div>
  )
}

export default SavedJobsPage
