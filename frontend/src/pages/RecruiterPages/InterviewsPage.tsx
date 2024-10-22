import { useEffect, useState } from "react";
import axios from "axios";

type Interview = { 
  _id: string;
  application: {
    _id: string;
    jobPosition: {
      _id: string;
      title: string;
    };
    applicant: {
      _id: string;
      name: string;
    };
  };
  interviewer: string[];
  interviewDate: Date;
  location: string;
};

const InterviewsPage = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/interviews'); // Adjust this URL to your actual API endpoint
        if (response.status === 200) {
          setInterviews(response.data); // Assuming the response data is an array of interviews
        } else {
          throw new Error('Failed to fetch interviews.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) {
    return <div className='w-full flex justify-center items-center'>Loading...</div>;
  }

  if (error) {
    return <div className='w-full flex justify-center items-center text-red-500'>{error}</div>;
  }

  return (
    <div className="p-6 flex-col flex-grow overflow-y-auto min-h-screen bg-slate-100 w-full m-0">
      <div className='font-semibold text-gray-700 font-secondary text- text-3xl p-3 py-5'>All Interviews</div>
      <div className='md:w-4/6 border rounded-md border-slate-300 ml-2 mt-6 md:mt-0'>
        {interviews.length > 0 ? (
          interviews.map((interview) => (
            <div key={interview._id} className='border p-4 mb-4 rounded-md shadow-md'>
              <h2 className='text-xl font-semibold'>{interview.application.jobPosition.title}</h2>
              <p><strong>Applicant:</strong> {interview.application.applicant.name}</p>
              <p><strong>Interview Date:</strong> {new Date(interview.interviewDate).toLocaleString()}</p>
              <p><strong>Location:</strong> {interview.location}</p>
              <p><strong>Interviewer(s):</strong> {interview.interviewer.join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No scheduled interviews found.</p>
        )}
      </div>
    </div>
  );
};

export default InterviewsPage;
