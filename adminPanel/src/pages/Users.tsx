import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Applicant = {
  name: string;
  header: string;
  email: string;
  city: string;
  phoneNumber: string
};

const Users: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get<Applicant[]>('http://localhost:5000/api/applicants');
        setApplicants(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <main className="ml-64 mt-16 p-6">
      <h2 className="text-3xl font-semibold mb-4">Users</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Name</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Header</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Phone</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Email</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">City</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.email}>
                  <td className="py-2 px-4 border-b border-gray-300">{applicant.name}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{applicant.header}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{applicant.phoneNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{applicant.email}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{applicant.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default Users;
