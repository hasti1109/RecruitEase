import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  
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

  const titles = ['Name', 'Score', 'Resume', 'Status'];

  const showPdf = (pdf:String|undefined) => {
    window.open(`http://localhost:5000/${pdf}`, "_blank", "noreferrer");
  }

  const handleApplicationClick = (applicant: Applicant) => {
    // console.log(applicant);
    // navigate(`/home/applications/${appli._id}`, {
    //   state: { applicant }
    // });
  }

  const scoreRanges = [0, 20, 40, 60, 80, 100]; // Define the score ranges
  const applicationScores = applications.map((application: any) => application.score);

  // Create bins for the score ranges
  const scoreDistribution = scoreRanges.map((range, index) => {
    const nextRange = scoreRanges[index + 1];
    return applicationScores.filter(score => score >= range && (nextRange ? score < nextRange : true)).length;
  });

  // Pie Chart Data
  const scorePieChartData = {
    labels: scoreRanges.slice(0, -1).map((range, index) => `${range}-${scoreRanges[index + 1]}`), // Create range labels
    datasets: [
      {
        label: 'Application Scores Distribution',
        data: scoreDistribution,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-5 pt-0">
      {/* Application Score Distribution (Pie Chart) */}
      {applications.length > 0 ? (
        <div className="bg-white rounded-lg border border-slate-300 p-5 flex flex- justify-start items-center h-80 w-full mb-5">
        <h2 className="text-base font-semibold mb-4 text-center w-1/3">Applications Score Summary</h2>
        <div className="w-2/3 h-60 self-center">
          <Pie data={scorePieChartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
      ) : ( 
        <></>
      )}
  
      <div>
        {applications.length > 0 ? (
          <div className='md:w-full border rounded-md border-slate-300 mt-6 md:mt-0'>
            {/* Items header */}
            <div className="flex w-full justify-around gap-x-5 py-2 text-sm border-b border-slate-300 bg-slate-300 pl-3">
              {titles.map((title, index) => (
                <span key={index} className="flex-1 text-left">{title}</span>
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
                    <span className="flex-1 text-left text-blue-500 cursor-pointer" onClick={() => showPdf(application.resume)}>View</span>
                    <span className={`flex-1 font-semibold text-left ${application.status === "Accepted" ? 'text-green-500' : application.status === "Rejected" ? 'text-red-500' : application.status === "Under review" ? 'text-yellow-500' : 'text-blue-500'}`}>{application.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="py-2 text-center mt-10 font-semibold text-md text-error">No applications yet for this job.</p>
        )}
      </div>
    </div>
  );
  
}

export default ApplicationDetails
