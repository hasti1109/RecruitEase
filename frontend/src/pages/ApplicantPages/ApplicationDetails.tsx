import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Application = {
  _id: string;
  applicant: {
    name: string;
  };
  jobPosition: {
    title: string;
  };
  status: 'Accepted' | 'Rejected' | 'Under review';
  score: number;
  resume: string;
  interviewSchedule: {
    interviewDate: Date;
  }[];
};

const ApplicationDetails = () => {
  const location = useLocation();
  const applicationId = location.state;
  console.log(`Aplication id:`, applicationId)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get<Application>(
          `http://localhost:5000/api/applications/${applicationId}`
        );
        if (response.status === 200) {
          setApplication(response.data);
          console.log(application);
        } else {
          throw new Error("Internal error");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [applicationId]);

  return (
    <div className="p-6 flex-col flex-grow overflow-y-auto min-h-screen bg-slate-100 w-full m-0">
      {/* Header */}
      <div className="text-center text-3xl font-bold text-gray-800 mb-8">
        Application Details
      </div>

      <div className="flex flex-col lg:flex-row gap-x-5 gap-y-5 justify-center">
        {/* Details Container */}
        <div className="w-full lg:w-3/5 p-6 rounded-lg shadow-lg bg-white">
          {loading && <p className="py-2 text-lg text-gray-500">Loading application...</p>}
          {error && <p className="text-red-500 py-2">Error: {error}</p>}
          {application && (
            <div className="space-y-4">
              <p className="text-lg font-medium text-gray-600">
                <span className="font-bold text-gray-800">Name:</span> {application.applicant.name}
              </p>
              <p className="text-lg font-medium text-gray-600">
                <span className="font-bold text-gray-800">Applied for:</span> {application.jobPosition.title}
              </p>
              <p className="text-lg font-medium text-gray-600">
                <span className="font-bold text-gray-800">Score:</span> {application.score}%
              </p>
              <p className="text-lg font-medium text-blue-600">
                <a
                  href={`http://localhost:5000/${application.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  View Resume
                </a>
              </p>

              {/* Application Status */}
              <p className="font-bold text-gray-800 text-lg">
                Application Status: <span className="text-gray-600">{application.status}</span>
              </p>

              {/* Scheduled Interviews */}
              <div>
                <p className="text-lg font-medium text-gray-600">
                  <span className="font-bold text-gray-800">Scheduled Interviews:</span>
                </p>
                {application.interviewSchedule.length > 0 ? (
                  application.interviewSchedule.map((interview, index) => (
                    <div key={index} className="py-1">
                      <p>{new Date(interview.interviewDate).toLocaleDateString()}</p>
                    </div>
                  ))
                ) : (
                  <p>No scheduled interviews.</p> // Message when there are no scheduled interviews
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
