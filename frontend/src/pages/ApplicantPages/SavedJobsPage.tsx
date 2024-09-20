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
    <div className='mt-40 gap-x-4 gap-y-4 flex justify-center items-center'>
      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
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
  )
}

export default SavedJobsPage
