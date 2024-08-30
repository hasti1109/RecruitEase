import axios from "axios";
import { useEffect, useState } from "react"
import { IoPersonCircleOutline, IoCallSharp, IoMail, IoLocation } from "react-icons/io5"

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

  return (
    <div className="flex flex-col justify-center items-center mx-6 md:mx-0">

      {/* header */}
      <div className='font-semibold text-gray-700 font-secondary text-lg lg:text-3xl border-slate-300 border-b-2 mb-4 lg:mb-8 w-fit mx-4 mt-24'>My Profile</div>

      {/* details container */}
      <div className="w-full lg:w-3/5 p-3 lg:p-10 border rounded-md border-slate-300 bg-white mt-6 md:mt-0">

        {/* name, header, description */}
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

      </div>
    </div>
  )
}

export default MyProfilePage
