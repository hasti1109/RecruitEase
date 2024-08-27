import { IoIosMenu,IoMdClose } from "react-icons/io";
import { useState } from 'react';
import logo from '../../assets/main-logo.png';
import { Link } from "react-router-dom";
const Navbar2 = () => {
  const [toggle, setToggle] = useState(false);
  const navLinks = [
    {
      link: "/homepage",
      title: "home"
    },
    {
      link: "/jobs",
      title: "find jobs"
    },
    {
      link: "/myapplications",
      title: "my applications"
    },
    {
      link: "/profile",
      title: "my profile"
    }
  ];

  return (
    <nav className='w-full flex z-[999] shadow-lg fixed top-0 py-6 justify-between items-center navbar bg-black mb-10 lg:mb-2 h-[65px] lg:h-[75px] text-white'>

      <div className="flex justify-start items-center">
        <img src={logo} alt='Logo' width='20' height='20' className='w-[28px] h-[28px] lg:w-[50px] lg:h-[50px] ml-5 lg:ml-10 border-2 rounded-full border-white mr-2'/>
        <h1 className={`text-white origin-left font-semibold text-sm lg:text-2xl`}>Recruit<span className="text-primary">Ease</span></h1>
      </div>

        {/* desktop navbar */}
        <ul className='list-none sm:flex max-md:hidden justify-end items-center flex-1'>
          {navLinks.map( (nav,index) => (
            <Link  to={nav.link}>
              <li
                key={nav.link}
                className={`font-secondary font-semibold cursor-pointer text-base lg:text-[18px]
                ${index===navLinks.length-1 ? `mr-10 lg:mr-20`: `mr-10`} hover:border-b-[3px] hover:border-b-white hover:transition-all hover:duration-500 hover:ease-in-out py-2`}
              >
                {nav.title}
              </li>
            </Link>
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

export default Navbar2
