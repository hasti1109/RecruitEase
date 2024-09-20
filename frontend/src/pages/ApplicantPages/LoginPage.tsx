import { useState } from "react";
import { IoEye, IoEyeOff, IoKey, IoMail } from "react-icons/io5"
import  login_logo  from "../../assets/login_logo.png";
import job_offer from "../../assets/main-logo.png"
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

type FormFields = {
  email: string;
  password: string;
}


const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<FormFields>({
    defaultValues:{
      email: "hastigabani1109@gmail.com", 
    }
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data , {
        validateStatus: (status) => {
          return status < 500;
        }
      });
      if(response.status === 200){
        toast.success('Login successful.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const applicantId = response.data.userId;
        sessionStorage.setItem('applicantId', applicantId);
        navigate('/user/jobs', { state: applicantId });
      }
      else{
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.error(error+ '.');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-lg flex lg:w-2/3 sm:w-full md:w-full max-w-4xl">

          {/* Sign in section */}
          <div className="sign-in w-3/5 p-4 sm:">

            <div className="flex items-center text-left lg:text-lg font-bold">
              <img src={job_offer} className="w-7 h-7 mr-1"/><span className="text-primary">Recruit</span>Ease
            </div>

            <div className="py-10 w-full">
              <h2 className="text-primary font-semibold lg:text-2xl sm:text-lg">Sign in to your account</h2>
              <div className="border-2 w-20 border-primary inline-block mb-2 mt-3"></div>

              {/* email and password inputs */}
              <div className="flex flex-col items-center py-2 mt-5">

                <form onSubmit={handleSubmit(onSubmit)}>

                  {/* email */}
                  <div className=" bg-gray-200 w-80 lg:py-4 sm:py-2 rounded-lg flex gap-x-2">
                    <IoMail className="text-lg text-gray-400 ml-2 mr-1"/>
                    <input 
                      {... register("email", {
                        required: "Email is required*",
                        validate: (value) => {
                          return value.includes('@') || "Invalid email address";
                        }
                      })}
                      type="text" 
                      className="border-none mr-2 flex-1 outline-none bg-gray-200 text-sm" 
                      placeholder="Email"/>
                  </div>
                  {errors.email && <div className="mt-1 text-error text-sm text-left">{errors.email.message}</div>}
                  
                  {/* password */}
                  <div className="bg-gray-200 w-80 lg:py-4 sm:py-2 rounded-lg flex gap-x-2 mt-3">
                    <IoKey className="text-gray-400 ml-2 mr-1 text-lg"/>
                    <input 
                      {...register("password", {
                        required: "Password is required*",
                      })}
                      type={showPassword? "text" : "password"}
                      className="text-sm border-none flex-1 outline-none bg-gray-200"
                      placeholder="Password"/>
                    <div onClick={() => setShowPassword(!showPassword)}>
                      { showPassword ? <IoEye className="mr-3 text-gray-400"/>: <IoEyeOff className="text-gray-400 mr-3"/>}
                    </div>
                  </div>
                  {errors.password && <div className="text-error text-sm text-left mt-1">{errors.password.message}</div>}

                  {/* forgot password */}
                  <div className="flex w-full justify-end lg:text-sm sm:text-xs md:text-xs text-gray-400 mt-3">
                    <a href="#" className="cursor-pointer">Forgot password?</a>
                  </div>

                  {/* sign in button */}
                  <div className="mt-7">
                    <input 
                      type="submit" 
                      value={isSubmitting ? "Signing in.." : "Sign In"} 
                      className="border-2 cursor-pointer border-primary rounded-full bg-primary text-white lg:px-12 sm:px-5 lg:py-2 sm:py-1 sm:text-sm lg:text-lg inline-block font-semibold hover:bg-white hover:text-primary hover:border-primary w-full" />
                  </div>

                  {/* go to sign up */}
                  <div className="flex w-full justify-center text-sm text-gray-600 mt-3 ">
                    Don't have an account?<Link to="/signup" className="ml-2 text-blue-500 text font-semibold cursor-pointer">Sign Up</Link>
                  </div>
                </form>
              </div>


            </div>
          </div>

          {/* description section  */}

          <div className="w-2/5 bg-primary text-white rounded-2xl rounded-bl-[60px] rounded-tl-[60px] py-20 px-12">
            <h2 className="lg:text-2xl sm:text-lg font-bold mb-2">Welcome back!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2 "></div>
            <p className="mb-0 lg:text-[15px] sm:text-sm">We are here to simplify your job application journey.</p>
            <img src={login_logo} className="mb-0 bg-none"/>
          </div>
        </div>

        <div className="mt-10 font-semibold">Are you a recruiter? <span className="text-link cursor-pointer"><Link to='/recruiter-login'>Login as recruiter</Link></span></div>

        <div><Toaster position="bottom-center"/></div>
     </main>
    </div>
  )
}

export default Login;