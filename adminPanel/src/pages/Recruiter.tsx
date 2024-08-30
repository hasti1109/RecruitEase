import axios from "axios";
import { useEffect, useState } from "react";

type Recruiter = {
  _id: string;
  name: string;
  username: string;
};

const Recruiters = () => {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<Recruiter | null>(null);
  const [newRecruiter, setNewRecruiter] = useState({ name: "", username: "", password: "" });

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get<Recruiter[]>('http://localhost:5000/api/recruiters');
        setRecruiters(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiters();
  }, []);

  const handleCreateRecruiter = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/recruiters', newRecruiter);
      setRecruiters([...recruiters, response.data]);
      setShowCreateDialog(false);
      setNewRecruiter({ name: "", username: "", password: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const handleDeleteRecruiter = async (recruiterId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/recruiters/${recruiterId}`);
      setRecruiters(recruiters.filter((recruiter) => recruiter._id !== recruiterId));
      setShowDeleteDialog(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen mt-16">
      <h2 className="text-2xl font-semibold mb-6">Recruiters</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">ID</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">Name</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">Username</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.map((recruiter) => (
                  <tr key={recruiter._id}>
                    <td className="py-2 px-4 border-b border-gray-300">{recruiter._id}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{recruiter.name}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{recruiter.username}</td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => setShowDeleteDialog(recruiter)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setShowCreateDialog(true)}
          >
            Create Recruiter
          </button>

          {/* Create Recruiter Dialog */}
          {showCreateDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Create New Recruiter</h3>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    value={newRecruiter.name}
                    onChange={(e) => setNewRecruiter({ ...newRecruiter, name: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    value={newRecruiter.username}
                    onChange={(e) => setNewRecruiter({ ...newRecruiter, username: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    value={newRecruiter.password}
                    onChange={(e) => setNewRecruiter({ ...newRecruiter, password: e.target.value })}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
                    onClick={() => setShowCreateDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleCreateRecruiter}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Recruiter Confirmation Dialog */}
          {showDeleteDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
                <p>Are you sure you want to delete recruiter <strong>{showDeleteDialog.name}</strong>?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
                    onClick={() => setShowDeleteDialog(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDeleteRecruiter(showDeleteDialog._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Recruiters;
