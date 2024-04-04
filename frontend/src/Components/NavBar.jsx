import React, { useEffect } from 'react';
import logo from './logo.png'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { RiDashboardFill } from "react-icons/ri";
import { BsListCheck } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";
import { BiCodeBlock } from "react-icons/bi";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";

function Navbar() {
  const usenavigate = useNavigate();
  let username;
  useEffect(() => {
    username = sessionStorage.getItem('username');
    if (username === '' || username === null) {
      usenavigate('/login');
    }
    else {
      usenavigate('/')
    }
  }, []);

  return (
    <div>
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
      <div className="bg-white">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200">
            <div className="bg-white h-16 justify-between items-center mx-auto px-4 flex flex-wrap md:flex-nowrap">
              <div className='mr-20'>
                <img src={logo} className="block btn- h-10  w-12" alt="" />
              </div>
              <div className="flex justify-start items-start space-x-5 md:space-x-10">
                <Link to='/' className='mr-5'>
                  <div className="relative">
                    <p className="nav-link"> {/* Add nav-link class */}
                      <span className="flex items-center">
                        <RiDashboardFill size={20} className="mr-1" />
                        DashBoard
                      </span>
                    </p>
                  </div>
                </Link>
                <Link to='/kanban' className='mr-5'>
                  <div className="relative">
                    <p className="nav-link"> {/* Add nav-link class */}
                      <span className="flex items-center">
                        <BsListCheck size={20} className="mr-1" />
                        Tasks
                      </span>
                    </p>
                  </div>
                </Link>
                <Link to='/members' className='mr-5'>
                  <div className="relative">
                    <p className="nav-link"> {/* Add nav-link class */}
                      <span className="flex items-center">
                        <IoPeopleSharp size={20} className="mr-1" />
                        Members
                      </span>
                    </p>
                  </div>
                </Link>
                <Link to='/ccode' className='mr-5'>
                  <div className="relative">
                    <p className="nav-link"> {/* Add nav-link class */}
                      <span className="flex items-center">
                        <BiCodeBlock size={20} className="mr-1" />
                        Community Code
                      </span>
                    </p>
                  </div>
                </Link>
                <Link to='/contact'>
                  <div className="relative">
                    <p className="nav-link"> {/* Add nav-link class */}
                      <span className="flex items-center">
                        <MdOutlineConnectWithoutContact size={20} className="mr-1" />
                        Contact
                      </span>
                    </p>
                  </div>
                </Link>
              </div>
              <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3">
                <Link to='/msg'>
                  <div className="relative">
                    <p className="pt-1 pr-1 pb-1 pl-1 bg-white text-gray-700 rounded-full transition-all duration-200
                  hover:text-gray-900 focus:outline-none hover:bg-gray-100">
                      <span className="justify-center items-center flex">
                        <span className="justify-center items-center flex">
                          <span className="items-center justify-center flex">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4
                          0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6
                          0H9"/></svg>
                          </span>
                        </span>
                      </span>
                    </p>
                    <p className="px-1.5 py-0.5 font-semibold text-xs items-center bg-indigo-600 text-white rounded-full inline-flex
                  absolute -top-px -right-1">2</p>
                  </div>
                </Link>
                <Link to='/login'>
                  <div className="relative">
                    <p className="pt-1 pr-1 pb-1 pl-1 bg-white text-gray-700 rounded-full transition-all duration-200
                  hover:text-gray-900 focus:outline-none hover:bg-gray-100">
                      <span className="justify-center items-center flex">
                        <span className="justify-center items-center flex">
                          <span className="flex flex-col items-center justify-center flex">
                            <AiOutlineLogout size={20} className="mr-1" />
                            LogOut
                          </span>
                        </span>
                      </span>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
