import { IoLocationOutline } from "react-icons/io5"

type Applicant = {
  _id: String,
  name: String,
  header: String,
  email: String,
  phoneNumber: String,
  city: String,
  resume: [String],
  status: String
}

type ApplicantProps = {
  applicant: Applicant
}

const CandidateCard : React.FC<ApplicantProps> = ({applicant}) => {
  return (
    <div className="flex-col p-2">
      {/* name and city*/}
      <div className='flex justify-between items-center'>
        <h1 className='md:text-xl font-semibold text-gray-700'>{applicant.name}</h1>
        <span className='text-xs md:text-sm font-semibold text-gray-500 flex items-center'>{applicant.city}<IoLocationOutline/></span>
      </div>
    </div>
  );
}

export default CandidateCard
