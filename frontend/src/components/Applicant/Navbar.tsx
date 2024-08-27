import { Link } from "react-router-dom";
import logo from '../../assets/main-logo.png'

const Navbar = () => {

  const nav_links = "text-white flex items-center py-2 px-4 h-full text-base my-1 mx-0 hover:border-b-[3px] hover:border-b-white hover:transition-all hover:duration-500 hover:ease-out";

  return (
    <>
      <nav className="navbar bg-primary flex items-center text-lg top-0 z-[999] w-full h-24">
        <div className="navbar-container text-white relative flex float-left flex-1 items-center min-h-28 w-fit font-secondary text-sm">
          <Link to="/" className="navbar-logo text-white items-center flex">
            <img src={logo} alt="Logo" className="w-16 h-16 justify-end my-0 mx-5 border-2 rounded-full border-white"/>
          </Link>
        </div>

        <div className="menu-icon">
          {/* <Sidebar outerContainerId={'menu-icon'} /> */}
        </div>
        <ul className="nav-menu flex list-none text-enter h-[120px] w-fit items-center justify-evenly pr-10">
          <li className="nav-item h-10 mx-auto my-0">
            <Link to="/jobs" className={nav_links}>
              Jobs
            </Link>
          </li>

          <li className="nav-item h-10 mx-auto my-0">
            <Link to="/profile" className={nav_links}>
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;