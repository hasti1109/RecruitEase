import axios from "axios";
import { useEffect, useState } from "react";

type Application = {
  _id: String,
  applicantId: String,
  jobPosition: String,
  status: String,
  score: Number,
  resume: String;
  applicant?: Applicant;
}

type Applicant = {
  name: String;
}

type Job = {
  _id: string;
  title: string;
  location: string;
}

type ApplicationProps = {
  job: Job;
}

const ApplicationDetails: React.FC<ApplicationProps> = ({job}) => {

  const [applications, setApplications] = useState<Application[]> ([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get<Application[]>(`http://localhost:5000/api/jobs/${job._id}/applications`);
        const applicationsData = response.data;

        // Fetch applicant details for each application
        const updatedApplications = await Promise.all(
          applicationsData.map(async (application) => {
            const applicantResponse = await axios.get<Applicant>(`http://localhost:5000/api/applications/${application._id}/applicant`);
            return {
              ...application,
              applicant: applicantResponse.data,
            };
          })
        );

        setApplications(updatedApplications);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [job._id]);

  const titles = ['Name', 'Score', 'Status', 'Resume'];

  return (
    <>
      {applications.length > 0 ? (
        <div className='md:w-full border rounded-md border-slate-300 mt-6 md:mt-0'>
          {/* Items header */}
          <div className="flex w-full justify-around gap-x-5 py-2 text-sm border-b border-slate-300 bg-slate-300 pl-3">
            {titles.map((title, index) => (
              <span key={index} className="flex-1 text-left ">{title}</span>
            ))}
          </div>

          {loading && <p className="py-2">Loading jobs...</p>}
          {error && <p className="text-red-500 py-2">Error: {error}</p>}
          {applications.length > 0 && (
            <div className="flex flex-col">
              {applications.map((application, index) => (
                <div key={index} className="flex justify-around gap-x-5 py-2 border-b border-slate-300 cursor-pointer pl-3 text-sm">
                  <span className="flex-1 text-left">{application.applicant?.name || 'Fetching...'}</span>
                  <span className="flex-1 text-left text-gray-500">{application.score.toString()}</span>
                  <span className="flex-1 text-left text-blue-500 cursor-pointer">{application.resume}</span>
                  <span className={`flex-1 font-semibold text-left ${application.status=="Accepted" ? 'text-green-500' : application.status=="rejected" ? 'text-red-500' : application.status=="Under Review" ? 'text-yellow-500' : 'text-blue-500'}`}>{application.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="py-2 text-center mt-10 font-semibold text-md text-error">No applications available for job.</p>
      )}
    </>
  )
}

export default ApplicationDetails
