import React, { useState, ChangeEvent, MouseEvent } from "react";
import { IoEye, IoEyeOff, IoKey, IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const RecruiterLogin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if the credentials are correct
    if (username === 'test123' && password === 'test123') {
      // Redirect to /home if credentials are valid
      navigate('/home');
    } else {
      // Set validation state to false and show error message
      setIsValid(false);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-xl shadow-xl lg:w-2/5 sm:w-full md:w-full max-w-4xl flex flex-col">
          {/* Sign in section */}
          <div className="sign-in w-full p-4">
            <div className="text-left lg:text-lg font-bold">
              <span className="text-primary">Recruit</span>Ease
            </div>
            <div className="py-10 w-full">
              <h2 className="text-primary font-semibold lg:text-2xl sm:text-lg">Login as Recruiter</h2>
              <div className="border-2 w-20 border-primary inline-block mb-2 mt-3"></div>

              {/* email and password inputs */}
              <div className="flex flex-col items-center py-2 px-20 mt-5">
                <form onSubmit={handleLogin}>
                  {/* username */}
                  <div className="bg-gray-200 w-80 lg:py-4 sm:py-2 rounded-lg flex gap-x-2">
                    <IoPerson className="text-lg text-gray-400 ml-2 mr-1"/>
                    <input 
                      type="text"
                      className="border-none mr-2 flex-1 outline-none bg-gray-200 text-sm"
                      placeholder="Username"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </div>

                  {/* password */}
                  <div className="bg-gray-200 w-80 lg:py-4 sm:py-2 rounded-lg flex gap-x-2 mt-3">
                    <IoKey className="text-gray-400 ml-2 mr-1 text-lg"/>
                    <input 
                      type={showPassword ? "text" : "password"}
                      className="text-sm border-none flex-1 outline-none bg-gray-200"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <div onClick={togglePasswordVisibility}>
                      { showPassword ? <IoEye className="mr-3 text-gray-400"/> : <IoEyeOff className="text-gray-400 mr-3"/>}
                    </div>
                  </div>

                  {/* forgot password */}
                  <div className="flex w-full justify-end lg:text-sm sm:text-xs md:text-xs text-gray-400 mt-3">
                    <a href="#" className="cursor-pointer">Forgot password?</a>
                  </div>

                  {/* sign in button */}
                  <div className="mt-7">
                    <button 
                      type="submit"
                      className="border-2 cursor-pointer border-primary rounded-full bg-primary text-white lg:px-12 sm:px-5 lg:py-2 sm:py-1 sm:text-sm lg:text-lg inline-block font-semibold hover:bg-white hover:text-primary hover:border-primary w-full">
                        Login
                    </button>
                  </div>

                  {!isValid && <div className="text-error text-sm text-center pt-5">Incorrect username or password</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RecruiterLogin;
