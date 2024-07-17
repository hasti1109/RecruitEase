import { useState } from "react";
import { IoEye, IoEyeOff, IoKey, IoMail } from "react-icons/io5"
import  login_logo  from "../assets/login_logo.png";
import { Link } from "react-router-dom";
//import { Toaster } from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { 
    register, 
    handleSubmit, 
    getValues,
    formState: { errors, isSubmitting } 
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async(data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex  lg:w-2/3 sm:w-full md:w-full max-w-4xl">

          {/* desc section  */}

          <div className="w-2/5 bg-primary text-white rounded-2xl rounded-br-[60px] rounded-tr-[60px] py-20 px-12">
            <h2 className="lg:text-3xl sm:text-lg font-bold mb-2">Hello!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2 "></div>
            <p className="mb- lg:text-[16px] sm:text-sm">We are here to simplify your job application journey.</p>
            <img src={login_logo} className="mb-0 bg-none"/>
          </div>

          {/* Sign up section */}
          <div className="sign-in w-3/5 p-5">

            <div className="text-right text-lg font-bold">
              <span className="text-primary">Recruit</span>Ease
            </div>

            <div className="py-10 w-full">
              <h2 className="text-primary font-semibold lg:text-2xl sm:text-lg">Create an account</h2>
              <div className="border-2 w-20 border-primary inline-block mb-2 mt-3"></div>

              {/* email and password inputs */}
              <div className="flex flex-col items-center py-2 mt-5">
                <form onSubmit={handleSubmit(onSubmit)}>

                  {/* email */}
                  <div className="bg-gray-200 w-80 py-4 rounded-lg flex gap-x-2">
                    <IoMail className="text-lg text-gray-400 ml-2 mr-1"/>
                    <input 
                      {...register("email",{
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
                  <div className="bg-gray-200 w-80 py-4 rounded-lg flex gap-x-2 mt-3">
                    <IoKey className="text-gray-400 ml-2 mr-1 text-lg"/>
                    <input 
                      {...register("password",{
                        required: "Password is required*",
                        minLength: {
                          value: 8,
                          message: "Password must have atleast 8 characters"
                        },
                      })}
                      type={showPassword? "text" : "password"} 
                      className="text-sm border-none flex-1 outline-none bg-gray-200"
                      placeholder="Password"/>
                    <div onClick={() => setShowPassword(!showPassword)}>
                      { showPassword 
                      ? <IoEye className="mr-3 text-gray-400 cursor-pointer"/>
                      :<IoEyeOff className="text-gray-400 mr-3 cursor-pointer"/>}
                    </div>
                  </div>
                  {errors.password && <div className="mt-1 text-error text-sm text-left">{errors.password.message}</div>}

                  {/* confirm password */}
                  <div className="bg-gray-200 w-80 py-4 rounded-lg flex gap-x-2 mt-3">
                    <IoKey className="text-gray-400 ml-2 mr-1 text-lg"/>
                    <input 
                      {...register("confirmPassword", {
                        required: "Enter password again",
                        validate: (value) => {
                          const password = getValues("password")
                          if(errors.password) {return true;}
                          return value === password || "Passwords do not match";
                        }
                      })}
                      type={showConfirmPassword? "text" : "password"} 
                      className="text-sm border-none flex-1 outline-none bg-gray-200"
                      placeholder="Confirm Password"/>
                    <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      { showConfirmPassword 
                      ? <IoEye className="mr-3 text-gray-400 cursor-pointer"/>
                      : <IoEyeOff className="text-gray-400 cursor-pointer mr-3"/>}
                    </div>
                  </div>
                  {errors.confirmPassword && <div className="mt-1 text-error text-sm text-left">{errors.confirmPassword.message}</div>}

                  <div className="mt-7 border-2 cursor-pointer border-primary rounded-full bg-primary text-white lg:px-12 sm:px-5 lg:py-2 sm:text-sm lg:text-lg inline-block font-semibold hover:bg-white hover:text-primary hover:border-primary w-full">
                    <input
                      type="Submit"
                      value={isSubmitting ? "Signing up.." : "Sign Up"}
                    />
                  </div>

                  <div className="flex w-full justify-center text-sm text-gray-600 mt-3">
                    Already have an account?<Link to="/login" replace className="ml-2 text-blue-500 font-semibold cursor-pointer">Sign In</Link>
                  </div>

                </form>
              </div>


            </div>
          </div>
        </div>
        {/* <div><Toaster position="bottom-center"/></div> */}
     </main>
    </div>
  )
}

export default SignUp;