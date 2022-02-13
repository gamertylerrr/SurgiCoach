import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/Logo.svg';

export default function Header() {
  const handleToggle = () => {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('hidden');
  };

  return (
    <>
      <nav className="bg-gray-100 bg-transparent p-4 md:py-8 lg:px-16">
        <div className="mx-auto ">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <Link to="#" className="hidden md:block">
                  <img src={Logo} alt="" />
                </Link>
              </div>

              <div className="hidden md:flex items-center space-x-1"></div>
            </div>

            <div className="hidden md:flex items-center  lg:space-x-12">
              <Link
                to=""
                className="py-5 px-3 uppercase font-black text-sm lg:text-lg "
              >
                My Procedure
              </Link>
              <Link
                to=""
                className="py-5 px-3 uppercase font-black text-sm lg:text-lg "
              >
                My Patients
              </Link>
              <Link
                to=""
                className="py-5 px-3 uppercase font-black text-sm lg:text-lg "
              >
                Login
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button className="mobile-menu-button" onClick={handleToggle}>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mobile-menu hidden md:hidden">
          <Link
            to=""
            className="block py-2 px-4 text-sm hover:bg-gray-200 uppercase font-black text-lg "
          >
            My Procedure
          </Link>
          <Link
            to=""
            className="block py-2 px-4 text-sm hover:bg-gray-200 uppercase font-black text-lg "
          >
            My Patients
          </Link>
          <Link
            to=""
            className="block py-2 px-4 text-sm hover:bg-gray-200 uppercase font-black text-lg "
          >
            Login
          </Link>
        </div>
      </nav>
    </>
  );
}