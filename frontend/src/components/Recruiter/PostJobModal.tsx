import {Dialog, DialogTitle, DialogContent} from '@mui/material';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';

type FormFields = {
  title: string;
  description: string;
  salary: string;
  requirements: string;
  location: string;
  lastDateToApply: Date;
  noOfOpenings: number;
}

type PostJobModalProps = {
  onClose: () => void;
}

const PostJobModal:React.FC<PostJobModalProps> = ({onClose}) => {

  const divClasses = 'bg-gray-200 w-full py-2 rounded-lg flex gap-x-2 h-3/5';
  const inputClasses = 'border-none ml-2 flex-1 outline-none bg-gray-200 text-sm';

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
    } = useForm<FormFields>();

  const convertStringToList = (input: string) =>{
    return input.split(',')
                .map(item => item.trim())
                .filter(item => item !== "");
  }

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const reqs = convertStringToList(data.requirements);
      const newJob = {
        title: data.title,
        description: data.description,
        salary: data.salary,
        requirements: reqs,
        location: data.location,
        lastDateToApply: new Date(data.lastDateToApply),
        noOfOpenings: data.noOfOpenings
      };
      console.log(newJob);
      const response= await axios.post("http://localhost:5000/api/jobs", newJob);
      if(response.status == 201){
        toast.success("Successfully added new job posting.");
      }
      else{
        throw new Error("Server error.");
      }
    } catch (e) {
      toast.error(e + "Try again later.");
    }
    finally{
      onClose();
    }
  }

  return (
    <Dialog open={true} onClose={onClose} fullWidth>
      <DialogTitle>
        <div className='flex items-center justify-between'>
          Post a job
          <IoClose className='cursor-pointer' onClick={onClose}/>
        </div>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 grid-rows-3 gap-x-4 gap-y-2'>

            <div>
              <div className={divClasses}>
                <input 
                  {... register("title", {
                    required: "Title is required*",
                    validate: value => value.trim() !== "" || "Add an valid title"
                  })}
                  type="text" 
                  className={inputClasses} 
                  placeholder="Job Title"/>
              </div>
              {errors.title && <div className="mt-1 text-error text-sm text-left">{errors.title.message}
              </div>}
            </div>
            
            <div>
              <div className={divClasses}>
                <input 
                  {... register("salary", {
                    required: "Salary is required*",
                    validate: value => value.trim() !== "" || "Add a valid salary"
                  })}
                  type="text" 
                  className={inputClasses} 
                  placeholder="Salary"/>
              </div>
              {errors.salary && <div className="mt-1 text-error text-sm text-left">{errors.salary.message}
              </div>}
            </div>

            <div>
            <div className={divClasses}>
              <input 
                {... register("location", {
                  required: "Location is required*",
                  validate: value => value.trim() !== "" || "Add a valid loccation"
                })}
                type="text" 
                className={inputClasses} 
                placeholder="Job location"/>
            </div>
            {errors.location && <div className="mt-1 text-error text-sm text-left">{errors.location.message}
            </div>}
            </div>

            <div>
            <div className={divClasses}>
              <input 
                {... register("requirements", {
                  required: "requirements is required*",
                  validate: value => value.trim() !== "" || "Add valid requirements"
                })}
                type="text" 
                className={inputClasses} 
                placeholder="Job requirements"/>
            </div>
            {errors.requirements && <div className="mt-1 text-error text-sm text-left">{errors.requirements.message}
            </div>}
            </div>

            <div>
            <span className='text-sm text-gray-500'>Last date to apply</span>
            <div className={divClasses}>
              <input 
                {... register("lastDateToApply", {
                  required: "last date is required*",
                })}
                type="date" 
                className={inputClasses}/>
            </div>
            {errors.lastDateToApply && <div className="mt-1 text-error text-sm text-left">{errors.lastDateToApply.message}
            </div>}
            </div>

            <div>
            <div className={`${divClasses} mt-6`}>
              <input 
                {... register("noOfOpenings", {
                  required: "no of openings is required*",
                })}
                type="number" 
                className={inputClasses}
                placeholder='No. of openings'/>
            </div>
            {errors.noOfOpenings && <div className="mt-1 text-error text-sm text-left">{errors.noOfOpenings.message}
            </div>}
            </div>
          </div>

          {/* job description */}
          <div className={`${divClasses} mt-6`}>
              <textarea 
                {... register("description", {
                  required: "Job description is required*",
                })}
                className={inputClasses}
                placeholder='Job Description'/>
            </div>
            {errors.description && <div className="mt-1 text-error text-sm text-left">{errors.description.message}
            </div>}

          <div className="mt-7">
              <input 
                type="submit" 
                value={isSubmitting ? "Submitting.." : "Submit"} 
                className="border-2 cursor-pointer border-primary rounded-full bg-primary text-white lg:px-12 sm:px-5 lg:py-2 py-2 sm:text-sm lg:text-lg inline-block font-semibold hover:bg-white hover:text-primary hover:border-primary w-full" />
            </div>
          </form>
      </DialogContent>
      <Toaster position='bottom-center'/>
    </Dialog>
  )
}

export default PostJobModal
