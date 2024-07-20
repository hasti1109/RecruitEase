import { useState } from "react"
import { IoArrowBack, IoArrowForward} from "react-icons/io5"
import { FaChartPie } from "react-icons/fa6";
import { BsBriefcaseFill,BsClipboard2CheckFill, BsChatRightDotsFill,BsBellFill } from "react-icons/bs";
import main_logo from '../assets/main-logo.png'

const RecruiterSidebar = () => {

  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: <FaChartPie/>},
    { title: "Jobs", src: <BsBriefcaseFill/>},
    { title: "Applications", src: <BsClipboard2CheckFill/>},
    { title: "Interviews", src: <BsChatRightDotsFill/>},
    { title: "Notifications", src: <BsBellFill/>},
  ]

  return (
    <div className={`${open ? 'w-72' : 'w-20'} h-screen bg-primary relative duration-700 p-5 pt-8`}>

      <div className="absolute cursor-pointer -right-4 top-9 w-9 h-9 flex justify-center items-center bg-white border-[2.5px] rounded-full border-primary transition-transform duration-300 transform hover:scale-90" onClick={() => setOpen(!open)}>
        {open ? <IoArrowBack className="text-2xl"/> : <IoArrowForward className="text-2xl"/>}
      </div>
      <div className={`flex gap-x-4 items-center duration-300 ${!open && 'scale-0'}`}>
        <div className={`w-8 h-8 border-[2.5px] border-white rounded-full cursor-pointer duration-500`}>
          <img src={main_logo}/>
        </div>
        <h1 className={`text-white origin-left font-bold text-xl`}>Recruit<span className="text-black">Ease</span></h1>
      </div>
      <ul className="pt-6">
        {Menus.map((menu, index) => (
          <li key={index}>
            <div className=" cursor-pointer flex gap-x-2 mt-2 px-2 py-3 items-center text-white font-semibold hover:bg-primary-light rounded-lg">{menu.src}
              <span>{menu.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecruiterSidebar
