import axios from 'axios';
import { useEffect, useState } from 'react';

type Application = {
  _id: String,
  applicant: String,
  jobPosition: String,
  status: String,
  score: Number
}

const ApplicationsPage = () => {

  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get<Application[]>('http://localhost:5000/api/applications');
        setApplications(response.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred'); 
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div>
      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {applications.length > 0 ? (
        applications.map(applicant => (
          <p>{applicant._id}</p>
        ))
      ) 
      : (<p>no applicant found</p>)
    }
    </div>
  )
}

export default ApplicationsPage
