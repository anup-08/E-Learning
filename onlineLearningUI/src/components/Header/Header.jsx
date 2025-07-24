import { Link, NavLink } from "react-router-dom";
import { FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa'; // Importing icons
import useIsAuthenticated from "../../MyContext/IsAuth";
import { useEffect } from "react";
import ProfileCard from "../Profile/ProfileCard";


export default function Header() {
  const { isLoggedIn, setLoggedIn } = useIsAuthenticated()
 
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])


  const onClick = () => {
    localStorage.setItem("role", "/student");
  }
  


  return (
    <header className='flex p-5 justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500  shadow-lg '>
      <img src="https://www.nicepng.com/png/full/794-7946773_e-learning-logo-png.png" alt="Logo" className='w-[120px] md:w-[350px] transition-transform duration-300 transform hover:scale-105' />
      <div>
        <div className='hidden md:block'>
          <div className='flex gap-10 py-6 mr-20 hover:cursor-pointer'>
            <NavLink to="/" className={({ isActive }) =>
              `flex items-center py-2 pr-4 pl-3 duration-200 ${isActive ? "text-white" : "text-gray-200"} border-b border-gray-100 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0
                  hover:text-white lg:p-0`
            }>
              <FaHome className='mr-2' /> HOME
            </NavLink>

            <NavLink to="/about" className={({ isActive }) =>
              `flex items-center py-2 pr-4 pl-3 duration-200 ${isActive ? "text-white" : "text-gray-200"} border-b border-gray-100 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0
                  hover:text-white lg:p-0`
            }>
              <FaInfoCircle className='mr-2' /> ABOUT US
            </NavLink>

            <NavLink to="/contact" className={({ isActive }) =>
              `flex items-center py-2 pr-4 pl-3 duration-200 ${isActive ? "text-white" : "text-gray-200"} border-b border-gray-100 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0
                  hover:text-white lg:p-0`
            }>
              <FaEnvelope className='mr-2' /> CONTACT
            </NavLink>
          </div>
        </div>
      </div>
      {!isLoggedIn && (
        <div className='mr-10 mt-1 hidden md:block'>
          <Link to={"/login"}>
            <button
            type="button" onClick={onClick} className='bg-yellow-500 text-white font-semibold rounded-2xl h-12 py-3 px-6 transition duration-300 hover:bg-yellow-600 hover:shadow-lg'>
               Give Exam
            </button>
          </Link>
        </div>
      )
      }
      {
        isLoggedIn && <ProfileCard />
      }
      <div className="md:hidden">
        <a className="text-4xl cursor-pointer hover:cursor-pointer" href="#">&#8801;</a>
      </div>
    </header>
  )
}
