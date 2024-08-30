import axios from 'axios';
import { useEffect, useState } from 'react';

type Application = {
  _id: String,
  applicant: {
    name: String;
  },
  jobPosition: {
    title: String;
  },
  status: String,
  score: number,
  resume: String;
}

const ApplicationsPage = () => {

  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get<Application[]>('http://localhost:5000/api/applications');
        setApplications(response.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred'); 
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const calculateReady = (score: number): number => 
    score > 90 ? 5 :
    score > 80 ? 4 :
    score > 70 ? 3 :
    score > 60 ? 2 :
    1;

  const titles = ['Name', 'Job', 'Reusme', 'Status', 'Ready', 'Score'];

  return (
    <div className='p-4 flex-col flex-grow overflow-y-auto  min-h-screen bg-slate-100 w-full m-0 md:px-10'>
      {/* header */}
      <div className='flex items-center justify-between'>
        <div className='font-semibold text-gray-700 font-secondary text- text-3xl p-3'>All Applications</div>
      </div>

      {/* all applications */}
      <div className='w-full border rounded-md border-slate-300 ml-2 mt-6 md:mt-0'>
        {/* Items header */}
        {applications.length > 0 ? (
          <div className="flex w-full justify-around gap-x-5 py-2 text-sm border-b border-slate-300 bg-slate-300 pl-3">
            {titles.map((title, index) => (
              <span key={index} className="flex-1 text-left ">{title}</span>
            ))}
          </div>
        ) : (
          <p className="py-2 text-center mt-10 font-semibold text-md text-error">No applications  available for job.</p>
        )}

        {loading && <p className="py-2">Loading jobs...</p>}
        {error && <p className="text-red-500 py-2">Error: {error}</p>}
        {applications.length > 0 ? (
          <div className="flex flex-col">
            {applications.map((application, index) => (
              <div key={index} className="flex justify-around gap-x-5 py-2 border-b border-slate-300 cursor-pointer pl-3 text-sm">
                <span className="flex-1 text-left">{application.applicant.name || 'Fetching...'}</span>
                <span className="flex-1 text-left">{application.jobPosition.title || 'Fetching...'}</span>
                <span className="flex-1 text-left cursor-pointer text-blue-500 underline">{application.resume}</span>
                <span className={`flex-1 font-semibold text-left ${application.status=="Accepted" ? 'text-green-500' : application.status=="rejected" ? 'text-red-500' : application.status=="Under Review" ? 'text-yellow-500' : 'text-blue-500'}`}>{application.status}</span>
                <span className="flex-1 text-left text-blue-500">{`${calculateReady(application.score)}/5`}</span>
                <span className="flex-1 text-left text-blue-500">{application.score.toString()}%</span>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="py-2 text-center mt-10 font-semibold text-md text-error">No applications  available for job.</p>
        )}
      </div>
    </div>
  )
}

export default ApplicationsPage
