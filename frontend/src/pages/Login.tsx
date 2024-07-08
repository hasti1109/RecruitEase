import { useState } from "react";
import { IoEye, IoEyeOff, IoKey, IoMail } from "react-icons/io5"
import  login_logo  from "../assets/login_logo.png";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async() => {

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex  lg:w-2/3 sm:w-full md:w-full max-w-4xl">

          {/* Sign in section */}
          <div className="sign-in w-3/5 p-5">

            <div className="text-left text-lg font-bold">
              <span className="text-primary">Recruit</span>Ease
            </div>

            <div className="py-10 w-full">
              <h2 className="text-primary font-semibold lg:text-2xl sm:text-lg">Sign in to your account</h2>
              <div className="border-2 w-20 border-primary inline-block mb-2 mt-3"></div>

              {/* email and password inputs */}
              <div className="flex flex-col items-center py-2 mt-5">
                <form onSubmit={handleSubmit}>

                  {/* email */}
                  <div className="bg-gray-200 w-80 py-4 rounded-lg flex gap-x-2">
                    <IoMail className="text-lg text-gray-400 ml-2 mr-1"/>
                    <input 
                      type="text" 
                      className="border-none mr-2 flex-1 outline-none bg-gray-200 text-sm" 
                      placeholder="Email"/>
                  </div>
                  
                  {/* password */}
                  <div className="bg-gray-200 w-80 py-4 rounded-lg flex gap-x-2 mt-3">
                    <IoKey className="text-gray-400 ml-2 mr-1 text-lg"/>
                    <input 
                      type={showPassword? "text" : "password"} 
                      className="text-sm border-none flex-1 outline-none bg-gray-200"
                      placeholder="Password"/>
                    <div onClick={() => setShowPassword(!showPassword)}>
                      { showPassword ? <IoEye className="mr-3 text-gray-400"/>: <IoEyeOff className="text-gray-400 mr-3"/>}
                    </div>
                  </div>

                  {/* forgot password */}
                  <div className="flex w-full justify-end text-sm text-gray-400 mt-3">
                    <a href="#" className="cursor-pointer">Forgot password?</a>
                  </div>

                  <div className="mt-7">
                    <input 
                      type="submit" 
                      value="Sign In" 
                      className="border-2 cursor-pointer border-primary rounded-full bg-primary text-white lg:px-12 sm:px-5 lg:py-2 sm:text-sm lg:text-lg inline-block font-semibold hover:bg-white hover:text-primary hover:border-primary w-full" />
                  </div>
                  <div className="flex w-full justify-center text-sm text-gray-600 mt-3">
                    Don't have an account?<span className="ml-2 text-blue-500 text font-semibold cursor-pointer">Sign Up</span>
                  </div>
                </form>
              </div>


            </div>
          </div>

          {/* sign up section  */}

          <div className="w-2/5 bg-primary text-white rounded-2xl rounded-bl-[60px] rounded-tl-[60px] py-20 px-12">
            <h2 className="lg:text-3xl sm:text-lg font-bold mb-2">Welcome back!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2 "></div>
            <p className="mb- lg:text-[16px] sm:text-sm">We are here to simplify your job application journey.</p>
            {/* <button className="border-2 border-white rounded-full lg:px-12 sm:px-5 lg:py-2 sm:text-sm lg:text-lg inline-block font-semibold hover:bg-white hover:text-primary">Sign Up</button> */}
            <img src={login_logo} className="mb-0 bg-none"/>
          </div>
        </div>
     </main>
    </div>
  )
}

export default Login;