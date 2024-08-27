import { useLocation } from "react-router-dom"
import Navbar2 from "../../components/Applicant/Navbar2";
import { IoHourglassOutline, IoLocationOutline, IoPersonOutline } from "react-icons/io5";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BiShoppingBag } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";

const JobDetailsPage = () => {
  const location = useLocation();
  const job = location.state || 'no job available due to some error.';

  return (
    <div>
      <Navbar2/>
      <div className=" flex justify-center items-center my-10">
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


        </div>
      </div>
    </div>
  )
}

export default JobDetailsPage
