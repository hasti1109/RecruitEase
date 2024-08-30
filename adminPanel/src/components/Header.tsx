import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white h-16 px-6 fixed top-0 left-64 w-full flex justify-start items-center">
      <h1 className='font-semibold text-xl'>Admin</h1>
        <button className="bg-white hover:bg-gray-100 text-black hover:text-black py-2 px-4 ml-[60rem] rounded">Logout</button>
    </header>
  );
};

export default Header;
