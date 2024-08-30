import { useLocation } from "react-router-dom"
import Navbar2 from "../../components/Applicant/Navbar";
import { IoHourglassOutline, IoLocationOutline, IoPersonOutline } from "react-icons/io5";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BiShoppingBag } from "react-icons/bi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

type Applicant = {
  _id: string;
  name: string;
  email: string;
  resume: string;
  appliedPositions : string[];
}

const JobDetailsPage = () => {
  const location = useLocation();
  const [applicant,setApplicant] = useState<Applicant>();
  const job = location.state || 'no job available due to some error.';
  const applicantId = sessionStorage.getItem('applicantId');
  console.log(applicantId);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const response = await axios.get<Applicant>(`http://localhost:5000/api/applicants/${applicantId}`);
        if (response.status == 200){
          setApplicant(response.data);
          console.log(applicant);
          console.log(response.data);
        }
        else{
          console.log('Error fetching applicant:', response.data);
        }
      } catch (error) {
        console.log('Error fetching applicant:', error);
      }
    }

    fetchApplicant();
  },[]);

  const applyForJob = async() => {
    const confirmed = window.confirm("Are you sure you want to apply for this job?");

    if (confirmed) {
      const data = {
        applicant : applicant?._id || '66c1a6130be083a37011e20c',
        jobPosition: job._id,
        resume: applicant?.resume[0] || 'HastiGabani.pdf',
        keywords: job.keywords.slice(0,(job.keywords.length/2)+5)
      }
      console.log(job.keywords);
      console.log(data);
      try {
        //throw new Error('Server down try again later.');
        const response = await axios.post(`http://localhost:5000/api/applications`, data);
        console.log(response.status);
        if (response.status === 201) {
          toast.success(response.data.message);   
        } 
        else{
          toast.error(response.data.message);
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    }
  }

  const hasAlreadyApplied = () => {
    if(applicant?.appliedPositions.includes(job._id)){
      return true;
    }
    return false;
  }

  return (
    <div>
      <Navbar2/>
      <div className=" flex justify-center items-center my-10 mx-5 md:mx-20 lg:mx-0">
        <div className="w-full mx-2 lg:w-3/5 border border-slate-300 rounded-xl mt-20 px-8 py-6 my-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-black">{job.title}</h1>

          {/* location */}
          <span className="flex items-center text-gray-500 text-sm mt-3">
            <IoLocationOutline className="mr-2"/>{job.location}
          </span>

          {/* ctc, apply by, posted on */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4">
            <div>
              <h3 className='font-semibold text-sm mt-5 flex items-center gap-x-2'>
                <FaClockRotateLeft/>Posted on</h3>
              <p className='text-gray-500 text-sm mt-1'>{new Date(job.timestamp).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className='font-semibold text-sm mt-5 flex items-center gap-x-2'>
                <IoHourglassOutline/>Apply by</h3>
              <p className='text-gray-500 text-sm mt-1'>{new Date(job.lastDateToApply).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className='font-semibold text-sm mt-5 flex items-center gap-x-2'>
                <RiMoneyRupeeCircleLine/>CTC(Annual)</h3>
              <p className='text-gray-500 text-sm mt-1'>{job.salary}</p>
            </div>
          </div>

          {/* divider */}
          <div className="w-full border mt-2"></div>

          {/* job desc */}
          <p className='font-semibold text-base md:text-lg mt-5'>About the job:</p>
          <p className='text-gray-500 text-sm mt-1'>{job.description}</p>

          {/* requirements */}
          <p className='font-semibold text-base md:text-lg  mt-5'>Skills required:</p>
          <div className='text-gray-500 text-sm mt-1'>
            <ul className='list-disc px-5'>
              {job.requirements.map((requirement:string) => (
                <li>{requirement}</li>
              ))}
            </ul>
          </div>

          {/* divider */}
          <div className="w-full border mt-2"></div>

          {/* no of applicants and opening */}
          <div className='grid grid-cols-2 gap-x-4'>
            <div>
              <h3 className='font-semibold text-sm mt-5 flex items-center gap-x-2'>
                <BiShoppingBag/>Number of openings</h3>
              <p className='text-gray-500 text-sm mt-1'>{job.noOfOpenings}</p>
            </div>
            <div>
              <h3 className='font-semibold text-sm mt-5 flex items-center gap-x-2'>
                <IoPersonOutline/>Total applicants</h3>
              <p className='text-gray-500 text-sm mt-1'>{job.noOfApplicants}</p>
            </div>
          </div>
          
          {/* apply now button*/}
          {hasAlreadyApplied() ? (
              <div className="flex justify-center items-center my-6">
                <span className="transition-all bg-gray-500 text-white px-6 py-2 rounded-lg border-gray-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                  Already applied
                </span>
              </div>
          ) : (
              <div className="flex justify-center items-center my-6">
                <button className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" onClick={applyForJob}>
                Apply now
                </button>
            </div>
          )}

        </div>
        <Toaster position='bottom-center'/>
      </div>
    </div>
  )
}

export default JobDetailsPage
