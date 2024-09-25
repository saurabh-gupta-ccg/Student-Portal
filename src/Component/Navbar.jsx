import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <>
   
    {/* // <nav className=''>
    // <div className='bg-slate-500'>
  
    //     <ul className="flex flex-row">    
    //     <NavLink to="/" ><li>Home</li></NavLink>
    //     <NavLink to="/contact" ><li>Contact</li></NavLink>
    //     <NavLink to="/student" ><li>Student</li></NavLink>
    //     <NavLink to="/teacher" ><li>Teacher</li></NavLink>
    //     <NavLink to="/result" ><li>Result</li></NavLink>
    //     </ul>
     
    // </div>
    // </nav> */}
    <header class="lg:px-16 px-4 bg-gradient-to-r from-blue-200 to-cyan-200 flex flex-wrap items-center py-4 shadow-md">
    <div class="flex-1 flex justify-between items-center">
        <a href="#" class="text-xl">Student Portal</a>
    </div>

    <label for="menu-toggle" class="pointer-cursor md:hidden block">
      <svg class="fill-current text-gray-900"
        xmlns="https://img.icons8.com/?size=100&id=XKedzxVhRNPR&format=png&color=000000" width="20" height="20" viewBox="0 0 20 20">
        <title>menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        
      </svg>
    </label>
    <input class="hidden" type="checkbox" id="menu-toggle" />

    <div class="hidden md:flex md:items-center md:w-auto w-full" id="menu">
        <nav>
            <ul class="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
               <li> <NavLink className="md:p-4 py-3 px-0 block" to="/" >Home</NavLink></li>
               <li> <NavLink className="md:p-4 py-3 px-0 block" to="/student" >Student</NavLink></li>
               <li> <NavLink className="md:p-4 py-3 px-0 block" to="/teacher" >Teacher</NavLink></li>
               <li> <NavLink className="md:p-4 py-3 px-0 block" to="/result" >Result</NavLink></li>
            
            </ul>
        </nav>
    </div>
</header>
    </>
  )
}

export default Navbar
