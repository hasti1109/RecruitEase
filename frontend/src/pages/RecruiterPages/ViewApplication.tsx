import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ScheduleInterviewModal from "../../components/Recruiter/ScheduleInterviewModal";
import ApplicationStatusSelector from "../../components/Recruiter/ApplicationStatusSelector";

type Application = {
  _id: string,
  applicant: {
    name: String;
  },
  jobPosition: {
    title: String;
  },
  status: 'Accepted' | 'Rejected' | 'Under review';
  score: number,
  resume: String;
  interviewSchedule: [{
    interviewDate: Date
  }];
};

const ViewApplication = () => {
  const location = useLocation();
  const applicationId = location.state?.applicationId;
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<String | null>(null);
  const [application, setApplication] = useState<Application>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get<Application>(
          `http://localhost:5000/api/applications/${applicationId}`
        );
        if (response.status === 200) {
          setApplication(response.data);
        } else throw new Error("Internal error");
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    };
    fetchApplication();
  }, [applicationId]);


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 flex-col flex-grow overflow-y-auto min-h-screen bg-slate-100 w-full m-0">
      {/* header */}
      <div className="text-center text-3xl font-bold text-gray-800 mb-8">
        Application Details
      </div>

      <div className="flex flex-col lg:flex-row gap-x-5 gap-y-5 justify-center">
        {/* details container */}
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
              <div className='flex justify-between items-end'>
              {/* job status */}
              <div className='flex flex-col'>
                <p className='font-bold text-gray-800 text-lg'>Application status</p>
                <ApplicationStatusSelector
                  key={application._id}
                  applicationId={application._id}
                  initialStatus={application.status}
                />
              </div>

            </div>
            
            {/* scheduled intereviews */}
            <div>
            <p className="text-lg font-medium text-gray-600">
                <span className="font-bold text-gray-800">Scheduled Interviews:</span>
              </p>
              {application.interviewSchedule.length > 0 ? (
                application.interviewSchedule.map(interview => (
                  <div>
                    <p>{new Date(interview.interviewDate).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p>No scheduled interviews.</p> // Message when there are no scheduled interviews
              )}
            </div>

              {/* Schedule interview */}
              <div>
              <button className='flex items-center bg-primary hover:text-primary border-[1.5px] hover:border-primary px-3 py-2 rounded-xl hover:bg-transparent text-white focus:outline-none' onClick={handleOpenModal}>
                <span className='ml-2'>Schedule an interview</span>
              </button>
              {isModalOpen && <ScheduleInterviewModal onClose={handleCloseModal}/>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewApplication;
