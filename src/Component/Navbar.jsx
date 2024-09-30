import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/authContext'
import { useToast } from "../context/ToastContext";
function Navbar() {
const { addToast } = useToast();
const {logout} = useAuth();
  const handleLogout = (e) => {
    e.preventDefault();
	addToast('Successfully logged out!', 'success');
    logout();
  };

  return (
    <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <div className="text-indigo-500 md:order-1">
          <img src="https://img.icons8.com/?size=100&id=XKedzxVhRNPR&format=png&color=000000" alt="student portal" className="h-10 w-10" />
        </div>
        <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
          <ul className="flex font-semibold justify-between">
            <li className="md:px-4 md:py-2 hover:text-indigo-400"><NavLink to="/">Home</NavLink></li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400"><NavLink to="/student">Student</NavLink></li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400"><NavLink to="/teacher">Teacher</NavLink></li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400"><NavLink to="/result">Result</NavLink></li>
          </ul>
        </div>
        <div className="order-2 md:order-3">
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
