import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

type FormFields = {
  interviewDate: Date;
  location: string;
  interviewer: string;
}

type ScheduleInterviewModalProps = {
  onClose: () => void;
}

const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({ onClose }) => {

  const divClasses = 'bg-gray-200 w-full py-2 rounded-lg flex gap-x-2 h-3/5';
  const inputClasses = 'border-none ml-2 flex-1 outline-none bg-gray-200 text-sm';

  const location = useLocation();
  const applicationId = location.state?.applicationId;
  console.log(applicationId);

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<FormFields>();

  const convertStringToList = (input: string) => {
    return input.split(',')
                .map(item => item.trim())
                .filter(item => item !== "");
  }

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const interviewers = convertStringToList(data.interviewer);
      const interviewDetails = {
        application: applicationId,
        interviewDate: new Date(data.interviewDate),
        location: data.location,
        interviewer: interviewers
      };
      const response = await axios.post("http://localhost:5000/api/interviews", interviewDetails);
      if(response.status === 201){
        toast.success("Successfully scheduled interview.");
      } else {
        throw new Error("Server error.");
      }
    } catch (e) {
      toast.error(e + " Try again later.");
    } finally {
      onClose();
    }
  }

  return (
    <Dialog open={true} onClose={onClose} fullWidth>
      <DialogTitle>
        <div className='flex items-center justify-between'>
          Schedule Interview
          <IoClose className='cursor-pointer' onClick={onClose}/>
        </div>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-x-4 gap-y-4'>

            {/* Interview Date */}
            <div>
              <span className='text-sm text-gray-500'>Interview Date</span>
              <div className={divClasses}>
                <input 
                  {...register("interviewDate", {
                    required: "Interview date is required*",
                    validate: value => {
                      const selectedDate = new Date(value);
                      const currentDate = new Date();
                      currentDate.setHours(0, 0, 0, 0); // Reset hours to compare only the date
                      return selectedDate > currentDate || "Please enter a date after today.";
                    }
                  })}
                  type="date" 
                  className={inputClasses}/>
              </div>
              {errors.interviewDate && <div className="mt-1 text-error text-sm text-left">{errors.interviewDate.message}</div>}
            </div>

            {/* Location field */}
            <div>
              <div className={divClasses}>
                <input 
                  {...register("location", {
                    required: "Location is required*",
                    validate: value => value.trim() !== "" || "Add a valid location"
                  })}
                  type="text" 
                  className={inputClasses} 
                  placeholder="Interview Location"/>
              </div>
              {errors.location && <div className="mt-1 text-error text-sm text-left">{errors.location.message}</div>}
            </div>

            {/* Interviewers field */}
            <div>
              <div className={divClasses}>
                <input 
                  {...register("interviewer", {
                    required: "Interviewer names are required*",
                    validate: value => value.trim() !== "" || "Add valid interviewer names"
                  })}
                  type="text" 
                  className={inputClasses} 
                  placeholder="Interviewer names (comma-separated)"/>
              </div>
              {errors.interviewer && <div className="mt-1 text-error text-sm text-left">{errors.interviewer.message}</div>}
            </div>
          </div>

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

export default ScheduleInterviewModal;
