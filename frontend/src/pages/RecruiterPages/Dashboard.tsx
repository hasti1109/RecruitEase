import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Doughnut, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const [applicants, setApplicants] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicantsRes = await axios.get('http://localhost:5000/api/applicants');
        const applicationsRes = await axios.get('http://localhost:5000/api/applications');
        const jobsRes = await axios.get('http://localhost:5000/api/jobs');

        setApplicants(applicantsRes.data);
        setApplications(applicationsRes.data);
        setJobs(jobsRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Application Status Distribution (Pie Chart)
  const applicationStatusCounts = applications.reduce((acc: any, application: any) => {
    acc[application.status] = (acc[application.status] || 0) + 1;
    return acc;
  }, { 'Pending': 0, 'Under review': 0, 'Accepted': 0, 'Rejected': 0 });

  const applicationStatusData = {
    labels: ['Pending', 'Under review', 'Accepted', 'Rejected'],
    datasets: [
      {
        label: 'Application Status',
        data: Object.values(applicationStatusCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Top 5 Most Popular Jobs (Pie Chart)
  const topJobs = jobs.sort((a: any, b: any) => b.noOfApplicants - a.noOfApplicants).slice(0, 5);
  const topJobsPieData = {
    labels: topJobs.map((job: any) => job.title),
    datasets: [
      {
        label: 'Top 5 Jobs by Applicants',
        data: topJobs.map((job: any) => job.noOfApplicants),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Application Score Distribution (Histogram)
  const applicationScores = applications.map((application: any) => application.score);
  const scoreHistogramData = {
    labels: Array.from({ length: 11 }, (_, i) => `${i * 10}-${(i + 1) * 10}`),
    datasets: [
      {
        label: 'Application Scores',
        data: applicationScores.reduce((bins: number[], score: number) => {
          const bin = Math.min(Math.floor(score / 10), 10); // Ensure scores are binned correctly
          bins[bin] = (bins[bin] || 0) + 1;
          return bins;
        }, Array(11).fill(0)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Jobs by Status (Pie Chart or Donut Chart)
  const jobStatusCounts = jobs.reduce(
    (acc: any, job: any) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    },
    { open: 0, closed: 0, paused: 0 }
  );
  const jobStatusData = {
    labels: ['Open', 'Closed', 'Paused'],
    datasets: [
      {
        label: 'Jobs by Status',
        data: Object.values(jobStatusCounts),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8 spacce-y-8 flex-col flex-grow overflow-y-auto min-h-screen bg-slate-100 w-full m-0">
      {/* header */}
      <div className='flex items-center justify-between mb-5'>
        <div className='font-semibold text-gray-700 font-secondary text- text-3xl p-3'>Dashboard</div>
      </div>
      <div className="flex flex-wrap gap-8">

        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-start items-center">
          <h2 className="text-xl font-semibold mb-4 text-center">Top 5 Most Applied For Jobs</h2>
          <div className="w-full h-full self-center">
            <Pie data={topJobsPieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Application Score Distribution (Line Chart) */}
        <div className="bg-white p-4 rounded-lg shadow-md ">
          <h2 className="text-xl font-semibold mb-4 text-center">Resume Scores Distribution</h2>
          <Bar data={scoreHistogramData} />
        </div>

        {/* Jobs by Status (Donut Chart) */}
        <div className="flex flex-col justify-start items-center bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Job count by status</h2>
          <div className="w-full h-full self-center">
            <Doughnut data={jobStatusData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Application Status Distribution (Pie Chart) */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-start items-center">
          <h2 className="text-xl font-semibold mb-4 text-center">Application Status Distribution</h2>
          <div className="w-full h-full self-center">
            <Pie data={applicationStatusData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
