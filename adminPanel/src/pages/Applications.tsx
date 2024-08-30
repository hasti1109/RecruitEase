import axios from "axios";
import { useEffect, useState } from "react";

type Application = {
  _id: string,
  applicant: {
    name: string;
  },
  jobPosition: {
    title: string;
  },
  status: string,
  score: number,
  resume: string;
}

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get<Application[]>('http://localhost:5000/api/applications');
        setApplications(response.data);
      } catch (err) {
        console.log('error:', err);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="ml-64 p-6 mt-16 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Name</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Position</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Status</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Score</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Resume</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="py-2 px-4 border-b border-gray-300">{app.applicant.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">{app.jobPosition.title}</td>
                <td className="py-2 px-4 border-b border-gray-300">{app.status}</td>
                <td className="py-2 px-4 border-b border-gray-300">{app.score}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <a href={app.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Resume
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Applications;
