import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { IoArrowBack, IoArrowForward, IoSettings} from "react-icons/io5"
import { FaChartPie } from "react-icons/fa6";
import { BsBriefcaseFill,BsClipboard2CheckFill, BsChatRightDotsFill,BsBellFill, BsPersonFill } from "react-icons/bs";
import main_logo from '../../assets/main-logo.png'
import { TbLogout } from "react-icons/tb";

const RecruiterSidebar = () => {

  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: <FaChartPie />, path: '/home/dashboard' },
    { title: "Jobs", src: <BsBriefcaseFill />, gap: true, path: '/home/jobs' },
    { title: "Candidates", src: <BsPersonFill />, path: '/home/candidates' },
    { title: "Applications", src: <BsClipboard2CheckFill />, path: '/home/applications' },
    { title: "Interviews", src: <BsChatRightDotsFill />, path: '/home/interviews' },
    { title: "Notifications", src: <BsBellFill />, gap: true, path: '/home/notifications' },
    { title: "Settings", src: <IoSettings />, path: '/home/settings' },
    // { title: "Log Out", src: <TbLogout />, gap: true, isLogout: true, path: '/logout' },
  ]

  const titles = ["RECRUITMENT", "ORGANIZATION", ""];

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`${open ? 'w-72' : 'w-20'} sticky top-0 h-screen bg-primary duration-700 p-5 pt-8`}>

      <div className="absolute cursor-pointer -right-4 top-9 w-9 h-9 flex justify-center items-center bg-white border-[2.5px] rounded-full border-primary transition-transform duration-300 transform hover:scale-90" onClick={() => setOpen(!open)}>
        {open ? <IoArrowBack className="text-2xl"/> : <IoArrowForward className="text-2xl"/>}
      </div>
      <div className={`flex gap-x-3 items-center duration-300 ${!open && 'scale-0'}`}>
        <div className={`w-8 h-8 border-[2.5px] border-white rounded-full cursor-pointer duration-500`}>
          <img src={main_logo}/>
        </div>
        <h1 className={`text-white origin-left font-semibold text-2xl`}>Recruit<span className="text-black">Ease</span></h1>
      </div>

      <div className="flex-col items-end justify-between ">
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <>
              {/* heading */}
              {menu.gap && titles[Math.floor(index / 3)] && (
                <li 
                  key={`gap-${index}`}
                  className={`${!open && 'hidden'} text-secondary text-base font-semibold mt-5 origin-left duration-300`}>
                  {titles[Math.floor(index / 3)]}
                </li>
              )}
              {/* actual items */}
              <li 
                onClick={ () => navigate(menu.path)}
                key={index}
                className={`cursor-pointer flex gap-x-2 mt-2 px-2 py-3 items-center w-full min-w-full text-white text-base font-semibold hover:bg-primary-light rounded-lg ${location.pathname === menu.path ? 'bg-primary-light' : ''} ${!open && "text-xl"} ${!open && menu.gap && "mt-9"}`}>
                {menu.src}
                <span className={`${!open && 'hidden'} origin-left duration-300`}>{menu.title}</span>
              </li>
            </>
          ))}
        </ul>
        <div className={`cursor-pointer flex gap-x-2 mt-5 px-2 py-3 items-center w-full min-w-full text-white text-base font-semibold hover:bg-primary-light rounded-lg ${!open && "text-xl"}`}>
         <TbLogout/>
         <span className={`${!open && 'hidden'} origin-left duration-300`}>Logout</span>
        </div>
      </div>
    </div>
  )
}

export default RecruiterSidebar
