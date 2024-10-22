import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Application = {
  _id: String,
  applicant: {
    name: String;
  },
  jobPosition: {
    _id: string;
    title: String;
    noOfApplicants: number
  },
  status: String,
  score: number,
  resume: String;
  timestamp : Date;
}

const MyApplicationsPage = () => {

  const applicantId = sessionStorage.getItem('applicantId');
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get<Application[]>(`http://localhost:5000/api/applications/applicant/${applicantId}`, {
          validateStatus: (status) => {
          return status < 500;
        }});
        if(response.status === 404){
          setError(null);
        }
        setApplications(response.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred'); 
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleApplicationClick = (applicationId: String) => {
    navigate(`/user/myapplications/${applicationId}`, {state: applicationId});
  }

  const titles = ['PROFILE', 'APPLIED ON', 'APPLICATION STATUS', 'NUMBER OF APPLICANTS']

  return (
    <div className='flex flex-col justify-center items-center mx-6 md:mx-0'>

      {/* header */}
      <div className='flex w-full md:w-3/5'>
        <div className='font-semibold text-gray-700 font-secondary mt-20 text-xl md:text-3xl py-3 self-start'>My Applications</div>
      </div>

      <div className='w-full md:w-3/5 border rounded-md border-slate-300 mx-5 mt-2'>
        {applications.length > 0 ? (
          <div className="flex w-full justify-around gap-x-5 py-2 text-xs md:text-sm border-b border-slate-300 bg-slate-100 pl-3">
            {titles.map((title, index) => (
              <span key={index} className="flex-1 text-left ">{title}</span>
            ))}
          </div>
        ) : (
          <p className="py-2 text-center mt-10 font-semibold text-md text-error">You have no applications yet.</p>
        )}

      {loading && <p className="py-2 text-center">Loading applications...</p>}
      {error && <p className="text-red-500 py-2">Error: {error}</p>}
      {applications.length > 0 ? (
        <div className="flex flex-col">
          {applications.map((application, index) => (
            <div key={index} className="flex justify-around gap-x-5 py-2 border-b border-slate-300 cursor-pointer pl-3 text-xs md:text-sm" onClick={() => handleApplicationClick(application._id)}>
              <span className="flex-1 text-left">{application.jobPosition.title || 'Fetching...'}</span>
              <span className="flex-1 text-left">{new Date(application.timestamp).toLocaleDateString() || 'Fetching...'}</span>
              <span className={`flex-1 font-semibold text-left ${application.status=="Accepted" ? 'text-green-500' : application.status=="rejected" ? 'text-red-500' : application.status=="Under Review" ? 'text-yellow-500' : 'text-blue-500'}`}>{application.status}</span>
              <span className="flex-1 text-left cursor-pointer">{application.jobPosition.noOfApplicants}</span>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="py-2 text-center text-sm text-gray-500">Apply to jobs to track your applications here.</p>
      )}
      </div>
    </div>
  )
}

export default MyApplicationsPage
