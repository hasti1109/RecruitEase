import main_logo from '../assets/main-logo.png';

const Logo = () => {
  return (
    <div className="text-white font-bold text-left flex items-center lg:text-lg sm:text-sm lg:ml-14 sm:ml-8">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white flex justify-center items-center bg-white text-primary font-semibold mr-1">
        <img src={main_logo} alt="Main Logo" />
      </div>
      Recruit<span className="text-black">Ease</span>
    </div>
  )
}

export default Logo
