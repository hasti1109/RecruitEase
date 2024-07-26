import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { IoArrowBack, IoArrowForward, IoSettings} from "react-icons/io5"
import { FaChartPie } from "react-icons/fa6";
import { BsBriefcaseFill,BsClipboard2CheckFill, BsChatRightDotsFill,BsBellFill, BsPersonFill } from "react-icons/bs";
import main_logo from '../assets/main-logo.png'
import { TbLogout } from "react-icons/tb";

const RecruiterSidebar = () => {

  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: <FaChartPie />, path: '/dashboard' },
  { title: "Jobs", src: <BsBriefcaseFill />, gap: true, path: '/jobs' },
  { title: "Candidates", src: <BsPersonFill />, path: '/candidates' },
  { title: "Applications", src: <BsClipboard2CheckFill />, path: '/applications' },
  { title: "Interviews", src: <BsChatRightDotsFill />, path: '/interviews' },
  { title: "Notifications", src: <BsBellFill />, gap: true, path: '/notifications' },
  { title: "Settings", src: <IoSettings />, path: '/settings' },
  { title: "Log Out", src: <TbLogout />, gap: true, isLogout: true, path: '/logout' },
  ]

  const titles = ["RECRUITEMENT", "ORGANIZATION", ""];

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`${open ? 'w-72' : 'w-20'} h-auto bg-primary relative duration-700 p-5 pt-8`}>

      <div className="absolute cursor-pointer -right-4 top-9 w-9 h-9 flex justify-center items-center bg-white border-[2.5px] rounded-full border-primary transition-transform duration-300 transform hover:scale-90" onClick={() => setOpen(!open)}>
        {open ? <IoArrowBack className="text-2xl"/> : <IoArrowForward className="text-2xl"/>}
      </div>
      <div className={`flex gap-x-4 items-center duration-300 ${!open && 'scale-0'}`}>
        <div className={`w-8 h-8 border-[2.5px] border-white rounded-full cursor-pointer duration-500`}>
          <img src={main_logo}/>
        </div>
        <h1 className={`text-white origin-left font-semibold text-2xl`}>Recruit<span className="text-black">Ease</span></h1>
      </div>
      <ul className="pt-6">
        {Menus.map((menu, index) => (
          <>
          {menu.gap && titles[Math.floor(index / 3)] && (
        <li 
          key={`gap-${index}`}
          className={`${!open && 'hidden'} text-secondary text-base font-semibold mt-5 origin-left duration-300`}>
          {titles[Math.floor(index / 3)]}
        </li>
      )}
          <li 
          onClick={ () => navigate(menu.path)}
            key={index}
            className={`cursor-pointer flex gap-x-2 mt-2 px-2 py-3 items-center text-white text-base font-semibold hover:bg-primary-light rounded-lg ${location.pathname === menu.path ? 'bg-primary-light' : ''} ${!open && "text-xl"} ${!open && menu.gap && "mt-9"} ${menu.isLogout && 'mt-9'}`}>
            {menu.src}
            <span className={`${!open && 'hidden'} origin-left duration-300`}>{menu.title}</span>
          </li>
        </>
        ))}
      </ul>
    </div>
  )
}

export default RecruiterSidebar
