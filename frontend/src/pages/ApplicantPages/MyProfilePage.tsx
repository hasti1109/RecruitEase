import axios from "axios";
import { useEffect, useState } from "react"
import { IoPersonCircleOutline, IoCallSharp, IoMail, IoLocation } from "react-icons/io5"
import { useNavigate } from "react-router-dom";

type Applicant = {
  _id: string;
  name: string;
  header: string;
  description: string;
  email: string;
  resume: string[];
  interestedRoles: string[];
  phoneNumber: string;
  city: string;
}

const MyProfilePage = () => {

  const [applicant,setApplicant] = useState<Applicant>();
  const applicantId = sessionStorage.getItem('applicantId');

  const [isResumeSelected, IsResumeSelected] = useState<Boolean>(false);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const response = await axios.get<Applicant>(`http://localhost:5000/api/applicants/${applicantId}`);
        if (response.status == 200){
          setApplicant(response.data);
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

  const showPdf = (pdf:string|undefined) => {
    window.open(`http://localhost:5000/${pdf}`, "_blank", "noreferrer");
  }

  const navigate = useNavigate();

  const logout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed){
      sessionStorage.setItem('applicantId','');
      navigate('/', { replace: true });
      window.location.reload();
    }
  }

  return (
    <div className=" flex flex-col justify-center items-center mx-6 px-6 md:mx-0 mt-32">

      {/* profile container */}
      <div className="w-full md:w-4/5 lg:w-3/5 p-3 lg:p-10 border rounded-md border-slate-300 bg-white md:mt-0">

        {/* name, header */}
        <div className="flex flex-row justify-start items-start">
          <IoPersonCircleOutline className="text-4xl text-gray-700 mr-2"/>
          <div className="flex flex-col">
            <h1 className='text-xl lg:text-3xl font-semibold text-gray-700'>{applicant?.name}</h1>
            <h4 className="text-gray-500 text-sm md:text-base">{applicant?.header}</h4>
          </div>
        </div>

        <h4 className="w-full mt-5 text-base">{applicant?.description}</h4>

        {/*phone, email, location  */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 align-start mt-5'>
          <div className='mt-2'>
            <p className='font-normal text-gray-500 text-sm md:text-md flex items-center'><IoCallSharp className="mr-2"/>Phone </p>
            <span className='text-xs md:text-sm font-semibold'>
              {applicant?.phoneNumber}
            </span>
          </div>
          <div className='mt-2'>
            <p className='font-normal text-gray-500 text-sm md:text-md  flex items-center'><IoMail className="mr-2"/>Email </p>
            <span className='text-xs md:text-sm font-semibold'>
              {applicant?.email}
            </span>
          </div>
          <div className='mt-2'>
            <p className='font-normal text-gray-500 text-sm md:text-md flex items-center'><IoLocation className="mr-2"/>Location </p>
            <span className='text-xs md:text-sm font-semibold'>
              {applicant?.city}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-sm md:text-md text-gray-500 font-normal">Interested jobs</h3>
          <div className="flex gap-x-3 mt-2">
            {applicant?.interestedRoles.map((role:String) => (
              <p className="border-2 bg-gray-200 p-1 text-sm md:text-md rounded-md">{role}</p>
            ))}
          </div>
        </div>

        {/* resume button */}
        <div className="flex justify-end items-center w-full mt-5">
          <button
            className="flex items-center bg-primary  gap-1 px-4 py-2 text-sm md:text-base cursor-pointer text-white font-semibold tracking-wide rounded-md hover:bg-primary-light duration-300 hover:gap-2 hover:translate-x-2"
            onClick={()=>showPdf(applicant?.resume[0])}
          >
            View Resume
            <svg
              className="w-5 h-5"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke-linejoin="round"
              stroke-linecap="round"/>
            </svg>
          </button>
        </div>

      </div>

      <div className="self-end px-5 pb-2 mb-2 md:mt-0 mt-2" onClick={logout}>
        <button
          className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-300 shadow-lg hover:w-32 hover:rounded-full active:translate-x-1 active:translate-y-1"
        >
          <div
            className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
          >
            <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
              <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
              ></path>
            </svg>
          </div>
          <div
            className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          >
            Logout
          </div>
        </button>
      </div>
    </div>
  )
}

export default MyProfilePage
