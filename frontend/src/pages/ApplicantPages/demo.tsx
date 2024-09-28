<div className="w-64 h-fit p-[6px] text-black border border-slate-300 rounded-2xl transform transition-transform duration-300 hover:scale-105 cursor-pointer">
  <div className={`p-3 ${bgColors[(index)%bgColors.length]} flex flex-col rounded-xl`}>
    {/* date and save option */}
    <div className="flex flex-row justify-between items-center ">
      <div className='bg-slate-50 rounded-2xl w-auto p-2 text-xs'>{new Date(job.timestamp).toLocaleDateString()}</div>
        <div className='cursor-pointer text-black rounded-full border bg- bg-slate-50 p-2 text-[15px]' onClick={isJobSaved ? removeSavedJob : saveJob}>
        {isJobSaved ? <IoBookmark className="text-gray-700"/> : <IoBookmarkOutline />}
      </div>
    </div>

    {/*  job title*/}
    <div className="h-20 font-semibold text-xl py-4">
      {job.title}
    </div>

    {/*skills */}
    <div className="flex flex-wrap justify-start gap-x-2 gap-y-2">
      {job.requirements.slice(0,4).map(skill => (
        <span className="border border-slate-500 rounded-2xl p-[6px] text-xs">{skill}</span>
      ))}
    </div>

  </div>

  {/* location and pay */}
  <div className="py-3 px-3 flex flex-row items-center justify-between">
    <div className="flex flex-col">
      <span className="text-[15px] font-semibold">{job.salary}</span>
      <span className="text-[12px] text-gray-500 font-medium">{job.location}, India</span>
    </div>
    <button className='bg-black font-medium text-sm  text-white border-[1.5px] border-black px-3 py-2 rounded-3xl hover:bg-white hover:text-black focus:outline-none' onClick={onDetailsClick}>Details</button>
  </div>
</div>