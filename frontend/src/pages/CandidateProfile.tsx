const CandidateProfile = () =>{
  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl lg:w-2/3 sm:w-full md:w-full max-w-4xl flex flex-col">

          <div className="w-full h-2/5 py-5 bg-primary font-semibold text-white text-[20px]">
            <h2>Let's Get Started!</h2>
          </div>

          <div className="w-full h-3/5">
            <div className="grid grid-cols-2">
              <input type="text" placeholder="First Name"/>
              <input type="text" placeholder="Last Name"/>
              <input type="radio" placeholder="Female"/>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default CandidateProfile