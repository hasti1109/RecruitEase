import { SubmitHandler, useForm } from "react-hook-form";
import { IoCloudUploadOutline, IoArrowForward } from "react-icons/io5";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../components/Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type FormFields = {
  resume: string;
  name: string;
  phoneNumber: string;
  city: string;
  header: string;
  description: string;
  job_title_1: string;
  job_title_2: string;
  job_title_3: string;
}

const CandidateProfile = () =>{

  const email = sessionStorage.getItem('email');
  console.log(email);
  const navigate = useNavigate();

  const inputClassnames = "py-2 border-[1px] border-gray-300 rounded-md placeholder:text-sm text-sm px-2 focus:border-black focus:outline-none mt-1 w-full mb-1";

  const buttonClassnames = "cursor-pointer inline-flex items-center justify-center text-white bg-primary hover:bg-primary-variant";

  const [fileName, setFileName] = useState<string>('Choose File');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const selectedFileName = fileInput.files && fileInput.files.length > 0
      ? fileInput.files[0].name
      : 'Choose File';
    setFileName(selectedFileName);
    setValue('resume', selectedFileName);
  };

  const { 
    register, 
    handleSubmit, 
    formState:{errors, isSubmitting},
    setValue,
    getValues
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Combine job titles into an array
      const interestedRoles = [
        data.job_title_1,
        data.job_title_2,
        data.job_title_3,
      ].filter(Boolean); // Remove any empty or undefined values

      const updatedData = {
        name: getValues('name'),
        phoneNumber: getValues('phoneNumber'),
        city: getValues('city'),
        header: getValues('header'),
        description: getValues('description'),
        interestedRoles,
        email,
        resume: fileName
      };
      console.log(updatedData);
      //setValue('email', email);
      const response = await axios.post(
        `http://localhost:5000/api/applicants`,
        updatedData, 
        { headers: {
          'Content-Type': 'application/json',
        }})
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      //console.log(data);
      if(!(response.status == 201))
        throw new Error(response.data.message);
      else {
        const applicantId = response.data;
        console.log(applicantId);
        sessionStorage.setItem('applicantId', applicantId); 
        toast.success("Profile created successfully.");
        navigate('/jobs');
      }
    } catch (e) {
      toast.error(e + ". Try again later.");
    }
  }

  return(
    <div className="min-h-screen">
      <header className="fixed top-0 w-full z-10">
        <div className="flex justify-between items-center bg-primary h-16 px-3 text-white">
          <Logo/>
          
          <div className="flex items-center md:mr-8">
            <h3 className="text-[12px] md:text-sm mr-2">{email}</h3>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white flex justify-center items-center bg-white text-primary font-semibold">{email?.charAt(0)}</div>
          </div>
        </div>
      </header>

      <main className="mt-20 flex justify-center py-5 lg:px-32 px-5 md:px-16 max-w-full">
        <div className="flex flex-col justify-center items-center md:w-3/5 w-full">

          <form onSubmit={handleSubmit(onSubmit)} className="w-full md:px-20 px-5">
            {/* resume uplaod */}
            <div className="mb-3">
              <p className="text-base font-semibold">Upload your Resume/CV <span className="text-red-500">*</span></p>
              <p className="text-xs text-gray-400 mb-3">Only allowed .PDF, .DOC, .DOCX and max 4 MB file size</p>
              <div className="relative inline-block">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                {...register('resume', {
                  //required: 'Resume is required',
                  validate: {
                    // Add custom validations here if needed
                  },
                })}
                onChange={handleFileChange}
              />
              {errors.resume && <p className="text-red-500">{errors.resume.message}</p>}
                <label htmlFor="fileInput" className={`${buttonClassnames} rounded-md px-4 py-2 text-sm font-medium`}>
                  <IoCloudUploadOutline className="mr-2 text-lg"/>{fileName}
                </label>
              </div>

            </div>

            {/* full name */}
            <p className='text-base mt-5 font-semibold'>Full Name <span className="text-red-500">*</span></p>
            <input
            {...register("name", {
              required: "Name is required.",
              validate: (value) => {
                return /^[A-Za-z ]+$/.test(value) || "Name cannot contain special characters or numbers.";
              }
            })}
              type="text"
              placeholder="Enter your full name"
              className={inputClassnames}
            />
            {errors.name && <div className="mt-1 text-error text-sm text-left">{errors.name.message}</div>}

            {/* phoneNumber no */}
            <p className='text-base mt-5 font-semibold'>Phone number <span className="text-red-500">*</span></p>
            <input
            {...register("phoneNumber", {
              required: "Phone number is required.",
              validate: (value) => {
                return /^\d{10}$/.test(value) || "Please enter a valid phoneNumber number.";
              }
            })}
              type="text"
              placeholder="e.g. +91 99999 88888"
              className={inputClassnames}
            />
            {errors.phoneNumber && <div className="mt-1 text-error text-sm text-left">{errors.phoneNumber.message}</div>}

            {/* city */}
            <p className='text-base mt-5 font-semibold'>Current city <span className="text-red-500">*</span></p>
            <input
            {...register("city",{
              required: "City is required.",
              validate: (value) => {
                return /^[a-zA-Z ]+$/.test(value) || "Please enter a valid city name.";
              }
            })}
              type="text"
              placeholder="e.g. Mumbai"
              className={inputClassnames}
            />
            {errors.city && <div className="mt-1 text-error text-sm text-left">{errors.city.message}</div>}

            {/* header */}
            <p className='text-base mt-5 font-semibold'>Header that describes you <span className="text-red-500">*</span></p>
            <input
            {...register("header",{
              required: "Header is required.",
            })}
              type="text"
              placeholder="e.g. Android Developer"
              className={inputClassnames}
            />
            {errors.header && <div className="mt-1 text-error text-sm text-left">{errors.header.message}</div>}

            {/* description */}
            <p className='text-base mt-5 font-semibold'>A brief description about you<span className="text-red-500">*</span></p>
            <textarea
              {...register("description",{
                required: "Description is required.",
              })}
                placeholder="e.g. Type something..."
                className={inputClassnames}
            />
            {errors.description && <div className="mt-1 text-error text-sm text-left">{errors.description.message}</div>}

            {/* job titles */}
            <p className='text-base mt-5 font-semibold'>Tell us 3 positions you are interested in<span className="text-red-500">*</span></p>
            <p className="text-xs text-gray-400 mb-1">Fill in at least 1 posiiton</p>
            <input
            {...register("job_title_1",{
              required: "Please enter at least one job title."
            })}
              type="text"
              placeholder="e.g. Product Manager"
              className={inputClassnames}
            />
            <input
            {...register("job_title_2")}
              type="text"
              placeholder="e.g. Software Engineer"
              className={inputClassnames}
            />
            <input
            {...register("job_title_3")}
              type="text"
              placeholder="e.g. Admin"
              className={inputClassnames}
            />
            {errors.job_title_1 && <div className="mt-1 text-error text-sm text-left mb-2">{errors.job_title_1.message}</div>}

            <input 
              type="submit" 
              className={`${buttonClassnames} px-10 py-3 text-md font-semibold rounded-full w-full mt-5`}
              value={isSubmitting ? 'Creating Profile..' : `Continue`}
              />
            
          </form>
        </div>
        <Toaster position="bottom-center"/>
      </main>
    </div>
  )
}

export default CandidateProfile