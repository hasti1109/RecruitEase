import axios from "axios";
import { useEffect, useState } from "react";

type Job = {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  timestamp: string;
  lastDateToApply: string;
  noOfOpenings: number;
  noOfApplicants: number;
  salary: string;
  status: 'open' | 'closed' | 'paused';
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>('http://localhost:5000/api/jobs');
        const sortedJobs = response.data.sort((a, b) => {
          const dateA = new Date(a.timestamp).getTime();
          const dateB = new Date(b.timestamp).getTime();
          return dateB - dateA; // Sort jobs by timestamp in descending order
        });
        setJobs(sortedJobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const thClasses = 'py-2 px-4 border-b border-gray-300 text-left';
  const tdClasses = 'py-2 px-4 border-b border-gray-300';

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Jobs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className={thClasses}>Location</th>
              <th className={thClasses}>Status</th>
              <th className={thClasses}>Openings</th>
              <th className={thClasses}>Applicants</th>
              <th className={thClasses}>Status</th>
              <th className={thClasses}>Last Date to Apply</th>
              <th className={thClasses}>Title</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td className={tdClasses}>{job.location}</td>
                <td className={tdClasses}>{job.title}</td>
                <td className={tdClasses}>{job.status}</td>
                <td className={tdClasses}>{job.noOfOpenings}</td>
                <td className={tdClasses}>{job.noOfApplicants}</td>
                <td className={tdClasses}>{job.status}</td>
                <td className={tdClasses}>{new Date(job.lastDateToApply).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Jobs;
