import axios from "axios";
import { useEffect, useState } from "react";
import StatusFilter from "../../components/Recruiter/StatusFilter";
import TitleFilter from "../../components/Recruiter/TitleFilter";
import { useNavigate } from "react-router-dom";

type Applicant = {
  _id: String,
  name: String,
  header: String,
  description: String;
  email: String,
  phoneNumber: String,
  city: String,
  resume: [String],
  status: String,
  interestedRoles: [String];
  appliedPositions: [String];
}

const CandidatesPage = () => {

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<String|null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<String[]>([]);
  const [selectedTitles, setSelectedTitles] = useState<String[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get<Applicant[]>('http://localhost:5000/api/applicants');
        setApplicants(response.data);
        setFilteredApplicants(response.data);
        setLoading(false);
        console.log(applicants)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred'); 
      }
    };

    fetchApplicants();
  }, []);

  useEffect(() => {
    filterApplicants();
  }, [selectedStatuses, selectedTitles, applicants]);

  const titles = ["Name", "Location", "Title", "Status"];

  const filterApplicants = () => {
    let filtered = applicants;

    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(applicant => selectedStatuses.includes(applicant.status));
    }

    if (selectedTitles.length > 0) {
      filtered = filtered.filter(applicant => selectedTitles.includes(applicant.header));
    }

    setFilteredApplicants(filtered);
  };

  const handleStatusFilterChange = (statuses: String[]) => {
    setSelectedStatuses(statuses);
  };

  const handleTitleFilterChange = (titles: String[]) => {
    setSelectedTitles(titles);
  };

  const handleApplicantClick = (applicant: Applicant) => {
    console.log(applicant);
    navigate(`/home/candidates/${applicant._id}`, {
      state: { applicant }
    });
  }

  return (
    <div className="p-6 flex-col flex-grow overflow-y-auto min-h-screen bg-slate-100 w-full m-0">

      <div className='font-semibold text-gray-700 font-secondary text- text-3xl p-3 py-5'>All Candidates</div>
      <div className='flex flex-col md:flex-row'>

        {/* filters */}
        <div className='w-full md:w-3/12 bg-white py-2 px-3 border rounded-md border-slate-300 ml-2 mr-5 md:sticky top-0 h-5/6'>
          <h2 className='font-bold text-lg text-primary mt-2'>Filters</h2>
          <div className="border-2 w-full border-primary inline-block mb-2 mt-3"></div>

          <div className="flex md:flex-col gap-x-3">
            <StatusFilter onFilterChange={handleStatusFilterChange}/>
            
            {/* spacer */}
            <div className="mt-6"></div>

            <TitleFilter onFilterChange={handleTitleFilterChange}/>
          </div>
        </div>

        {/* all candidates section */}
        <div className='md:w-4/6 border rounded-md border-slate-300 ml-2 mt-6 md:mt-0'>
          {/* Items header */}
          <div className="flex w-full justify-around gap-x-5 py-2 text-sm border-b border-slate-300 bg-slate-300 pl-3">
            {titles.map((title, index) => (
              <span key={index} className="flex-1 text-left ">{title}</span>
            ))}
          </div>

          {loading && <p className="py-2">Loading applicants...</p>}
          {error && <p className="text-red-500 py-2">Error: {error}</p>}
          {filteredApplicants.length > 0 ? (
            <div className="flex flex-col">
              {filteredApplicants.map((applicant, index) => (
                <div key={index} className="flex justify-around gap-x-5 py-2 border-b border-slate-300 cursor-pointer pl-3 text-sm">
                  <span className="flex-1 text-left" onClick={() => handleApplicantClick(applicant)}>{applicant.name}</span>
                  <span className="flex-1 text-left text-gray-500">{applicant.city}</span>
                  <span className="flex-1 text-left">{applicant.header}</span>
                  <span className={`flex-1 font-semibold text-left ${applicant.status=="hired" ? 'text-green-500' : applicant.status=="rejected" ? 'text-red-500' : 'text-blue-500'}`}>{applicant.status}</span>
                </div>
              ))}
            </div>
          ) : (
            !loading && <p className="py-2 text-center mt-10 font-semibold text-lg text-error">No applicants available for the filter.</p>
          )}
        </div>

      </div>
    </div>
  )
}

export default CandidatesPage
