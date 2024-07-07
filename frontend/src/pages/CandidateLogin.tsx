import { IoEye, IoEyeOff, IoKey, IoMail,IoLockClosed } from "react-icons/io5";
import {useState} from 'react'

const CandidateLogin = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async() => {

  }

  return (
    <div className="conatiner relative w-full min-h-lvh bg-background">
      <div className="forms-container absolute w-full h-full top-0 left-0">
        <div className="signup-signin flex items-center justify-center flex-col">
          
          <form onSubmit={handleSubmit} className="signin-form">
            <h2 className="title text-4xl font-primary font-bold text-primary mb-3">Sign In</h2>

            <div className="input-field flex items-center justify-center py-3 gap-y-3">
              <IoMail className="icon ml-0 mr-4"/>
              <input
                type="text"
                placeholder="Email address"/>
            </div>

            <div className="input-field flex items-center justify-center py-3 gap-y-3 mt-5">
              <IoLockClosed className="icon ml-4 mr-3"/>
              <input
                type={`${showPassword? 'text' : 'password'}`}
                placeholder="Password"/>
                  <div onClick={() => setShowPassword(!showPassword)}>
                    { showPassword ? <IoEye className="icon mr-3"/>: <IoEyeOff className="icon mr-3"/>}
                  </div>
            </div>

            <div className="submit">
              <input type="submit" value={"SignIn"}/>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default CandidateLogin