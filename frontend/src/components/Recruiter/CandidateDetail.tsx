import axios from "axios";
import { useEffect, useState } from "react";
import { IoPersonCircleOutline,IoCallSharp,IoMail, IoLocation, IoStatsChart } from "react-icons/io5";
import { useLocation } from "react-router-dom";

type Job = {
  _id:  String;
  title : String;
  location: String;
}

const CandidateDetail = () => {
  
  const location = useLocation();
  const applicant = location.state?.applicant;
  //console.log(`Applicant object :` , applicant);
  const [positions,setPositions] = useState<Job[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<String|null>(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get<Job[]>(`http://localhost:5000/api/applicants/${applicant._id}/jobs`);
        if(response.status == 200){
          setPositions(response.data);
          console.log(response.data);
          //setPositions(response.data);
        }
        else throw new Error("Internal error");
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred'); 
      }
    };
    fetchPositions();
  }, []);

  console.log(positions.length);
  
  return (
    <div className="p-6 flex-col flex-grow overflow-y-auto min-h-screen bg-slate-100 w-full m-0">

      {/* header */}
      <div className='font-semibold text-gray-700 font-secondary text-lg lg:text-2xl border-slate-300 border-b-2 mb-4 lg:mb-8 w-fit mx-4'>Candidate Details</div>

      <div className='flex flex-col lg:flex-row gap-x-5 gap-y-5'>

        {/* details container */}
        <div className="w-full lg:w-3/5 p-3 lg:p-10 border rounded-md border-slate-300 bg-white mt-6 md:mt-0">

          {/* name, header, description */}
          <div className="flex flex-row justify-start items-start">
            <IoPersonCircleOutline className="text-4xl text-gray-700 mr-2"/>
            <div className="flex flex-col">
              <h1 className='text-xl lg:text-3xl font-semibold text-gray-700'>{applicant.name}</h1>
              <h4 className="text-gray-500 text-sm md:text-base">{applicant.header}</h4>
            </div>
          </div>

          <h4 className="w-full mt-5 text-base">{applicant.description}</h4>

          {/*phone, email, location  */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 align-start mt-5'>
            <div className='mt-2'>
              <p className='font-normal text-gray-500 text-sm md:text-md flex items-center'><IoCallSharp className="mr-2"/>Phone </p>
              <span className='text-xs md:text-sm font-semibold'>
                {applicant.phoneNumber}
              </span>
            </div>
            <div className='mt-2'>
              <p className='font-normal text-gray-500 text-sm md:text-md  flex items-center'><IoMail className="mr-2"/>Email </p>
              <span className='text-xs md:text-sm font-semibold'>
                {applicant.email}
              </span>
            </div>
            <div className='mt-2'>
              <p className='font-normal text-gray-500 text-sm md:text-md flex items-center'><IoLocation className="mr-2"/>Location </p>
              <span className='text-xs md:text-sm font-semibold'>
                {applicant.city}
              </span>
            </div>
            <div className='mt-2'>
              <p className='font-normal text-gray-500 text-sm md:text-md flex items-center'><IoStatsChart className="mr-2"/>Status </p>
              <span className='text-xs md:text-sm font-semibold'>
                {applicant.status}
              </span>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-sm md:text-md text-gray-500 font-normal">Interested jobs</h3>
            <div className="flex gap-x-3 mt-2">
              {applicant.interestedRoles.map((role:String) => (
                <p className="border-2 bg-gray-200 p-1 text-sm md:text-md rounded-md">{role}</p>
              ))}
            </div>
          </div>

        </div>

        {/* applied for container */}
        <div className="w-full lg:w-2/4 p-3 lg:p-10 border rounded-md border-slate-300 bg-white mt-6 md:mt-0 flex flex-col">
          <h1 className="text-gray-500 font-semibold text-lg border-b-2 border-gray-300 w-fit">Positions applied for</h1>
          {positions.length > 0 ? (
            <div>
              {positions.map((position) => (
                <div className="flex justify-between items-center">
                  <p className="mt-5">{position.title}</p>
                  <p className="mt-5 flex items-center justify-center text-gray-600 gap-x-2"><IoLocation/>{position.location}</p>
                </div>
              ))}
            </div>
          ) : (<p className="">No positions available</p>)}
        </div>
      </div>
    </div>
  );
}

export default CandidateDetail
