import { IoIosMenu,IoMdClose } from "react-icons/io";
import { useState } from 'react';
import logo from '../../assets/main-logo.png';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navLinks = [
    {
      link: "/user/jobs",
      title: "find jobs"
    },
    {
      link: "/user/saved",
      title: "saved jobs"
    },
    {
      link: "/user/myapplications",
      title: "my applications"
    },
    {
      link: "/user/myprofile",
      title: "my profile"
    }
  ];
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className='w-full flex z-[999] shadow-lg fixed top-0 py-6 justify-between items-center navbar bg-black mb-10 lg:mb-2 h-[65px] lg:h-[75px] text-white'>

      <div className="flex justify-start items-center">
        <img src={logo} alt='Logo' width='20' height='20' className='w-[28px] h-[28px] lg:w-[50px] lg:h-[50px] ml-5 lg:ml-10 border-2 rounded-full border-white mr-2'/>
        <h1 className={`text-white origin-left font-semibold text-sm lg:text-2xl`}>Recruit<span className="text-primary">Ease</span></h1>
      </div>

        {/* desktop navbar */}
        <ul className='list-none sm:flex max-md:hidden justify-end items-center flex-1'>
          {navLinks.map( (nav,index) => (
              <li
                key={nav.link}
                onClick={ () => navigate(nav.link)}
                className={`font-secondary font-semibold cursor-pointer text-sm md:text-base lg:text-[18px]
                ${index===navLinks.length-1 ? `mr-10 lg:mr-20`: `mr-10`} ${location.pathname === nav.link ? 'border-b-[3px] border-b-white' : ''} hover:transition-all hover:duration-500 hover:ease-in-out py-2 transform transition-transform duration-300 hover:scale-105`}
              >
                {nav.title}
              </li>
          ))}
        </ul>

        {/* mobile navbar */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <span onClick={() => setToggle( (prev) => !prev)}>
            {toggle 
              ? <IoMdClose className='w-[28px] h-[28px] mr-5'/>
              : <IoIosMenu className='w-[28px] h-[28px] mr-5'/>
            }
          </span>
          <div className={`${toggle ? `flex` : `hidden`} p-6 bg-black absolute top-20 right-0 mx-4 my-2 min-w[140px] rounded-xl sidebar`}>
            <ul className='list-none flex flex-col justify-start items-start flex-1'>
              {navLinks.map( (nav,index) => (
                <Link  to={nav.link} className='py-2 px-3 hover:text-white hover:bg-slate-900 rounded-md text-white'>
                  <li
                    key={nav.link}
                    className={`block font-secondary font-semibold cursor-pointer text-[18px]
                    ${index===navLinks.length-1 ? `mb-5`: `mb-5`}`}
                  >{nav.title}
                  </li>
                </Link>
                ))}
            </ul>
          </div>
        </div>
    </nav>
  )
}

export default Navbar
