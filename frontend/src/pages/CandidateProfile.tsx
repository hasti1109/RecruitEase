import { useState } from "react";
import InputField from "../components/ui/InputField"
import GenderButtons from "../components/ui/GenderButtons";

const CandidateProfile = () =>{

  const [name, setName] = useState('');
  const [phone_no, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);

  const handleNameChange = (value: string) => {
      setName(value);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const handleCityChange = (value: string) => {
    setCity(value);
  };

  const handleGenderChange = (value: string) => {
    console.log(value);
    setGender(value)
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setYears(value);
    }
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setMonths(value);
    }
  };

  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-xl shadow-xl lg:w-3/5 sm:w-full md:w-full max-w-4xl flex flex-col">

          <div className="w-full h-2/5 py-5 bg-primary font-semibold text-white text-[20px] rounded-tr-xl rounded-tl-xl">
            <h2>Let's Get Started!</h2>
          </div>

          <div className="w-full h-3/5">
            <div className="flex flex-col justify-start items-start">
              <InputField
                label="Full name"
                value={name}
                placeholder="Enter your full name"
                onChange={handleNameChange}
                required={true}
              />
              <InputField
                label="Phone number"
                value={phone_no}
                placeholder="Enter your phone number"
                onChange={handlePhoneChange}
                required={false}
              />


            <div className="p-3 flex flex-col justify-start items-start">
              <h1>Gender <span className="text-red-500">*</span></h1>

              <GenderButtons
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                  { label: 'Prefer not to say', value: 'no' },
                ]}
                  onChange={handleGenderChange}
              />
            </div>

            <InputField
              label="Current location"
              required={true}
              placeholder="Enter your current city"
              value={city}
              onChange={handleCityChange}
            />

          <div className='flex flex-col justify-start items-start p-3 w-2/4'>
            <label>Enter total experience <span className="text-red-500">*</span></label>
            <div className="flex flex-row">
            <input
                type="number"
                min={0}
                max={50}
                value={years}
                placeholder="Years"
                required={true}
                onChange={handleYearChange}
                className='py-2 border-[1px] border-gray-400 rounded-md placeholder:text-sm text-sm px-2 focus:border-black focus:outline-none w-auto'
            />
            <input
                type="number"
                min={0}
                max={12}
                value={months}
                placeholder="Months"
                required={true}
                onChange={handleMonthChange}
                className='py-2 border-[1px] border-gray-400  rounded-md placeholder:text-sm text-sm px-2 focus:border-black focus:outline-none focus:border-[1.5px] w-auto ml-3'
            />

            </div>
        </div>
              
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default CandidateProfile