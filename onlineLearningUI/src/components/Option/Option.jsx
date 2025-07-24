import { Link, useNavigate } from "react-router-dom";
import useIsAuthenticated from "../../MyContext/IsAuth";
import toast from "react-hot-toast";

export default function Option(){

    const {isLoggedIn} = useIsAuthenticated()
    const navigate = useNavigate()

    const handleStudentClick = (role)=>{
        if(isLoggedIn) {
            if(localStorage.getItem("role") == "/student"){
                navigate("/studentPage")
            }
            else if(localStorage.getItem("role") == "/teacher"){
                navigate("/teacherPage")
            }
            else if(localStorage.getItem("role") == "/admin"){
                toast.error("cant access this file now..!")
                navigate("/getoption")
            }
        }else{
            localStorage.setItem("role" , role);
            navigate("/login")
        }
    }




    return(
        <div className="w-full h-153 bg-gradient-to-r from-blue-500 to-purple-500 lg:pt-20 flex flex-col gap-2 ">
            <h1 className="lg:text-6xl font-extrabold text-center p-10">Who you are ?</h1>
            <div className="place-items-center  py-5 grid grid-cols-1 gap-25 sm:gap-6 sm:grid-cols-3 ">
                <div className= "md:w-1/4 md:h-60 flex flex-col justify-center items-center sm:gap-5 h-10 w-20 gap-3">
                    <img src="https://img.freepik.com/free-vector/illustration-graduation-hat_53876-5920.jpg?semt=ais_hybrid&w=740" 
                    alt="img"  className="md:w-1/1 md:h-35 rounded-2xl"/>
                    <Link onClick={()=>handleStudentClick("/student")}  type="button" className="bg-red-500 w-30 h-15 text-2xl text-white font-semibold rounded-2xl hover:bg-red-600 hover:cursor-pointer
                    text-center p-3 transition duration-200 hover:scale-105 hover:shadow-lg">
                        Student
                    </Link>
                </div>
                <div className="md:w-1/4 md:h-60 flex flex-col justify-center items-center gap-5 h-10 w-20 mt-6 ">
                    <img className="md:w-1/1 md:h-35 rounded-2xl" 
                    src="https://png.pngtree.com/png-vector/20191119/ourmid/pngtree-teacher-vector-illustration-with-black-and-white-design-teacher-icon-png-image_1996068.jpg" alt="img" />
                    <Link onClick={()=>handleStudentClick("/teacher")} type="button" className="text-center p-3 bg-red-500 w-30 h-15 text-2xl text-white font-semibold rounded-2xl hover:bg-red-600 hover:cursor-pointer
                    transition duration-200 hover:scale-105 hover:shadow-lg">
                        Teacher
                    </Link>
                </div>
                <div className="md:w-1/1 md:h-60 flex flex-col justify-center items-center gap-5 h-25 w-20 ">
                    <img 
                    className="md:w-1/3 md:h-35 rounded-2xl"
                    src="https://t4.ftcdn.net/jpg/04/62/88/97/360_F_462889752_tSWP7qDYpUIL6QRlbyIC8v68jaXwVXyx.jpg" alt="img" />
                    <Link  type="button" className="text-center p-3 bg-red-500 w-30 h-15 text-2xl text-white font-semibold rounded-2xl hover:bg-red-600 hover:cursor-pointer
                    transition duration-200 hover:scale-105 hover:shadow-lg">
                        Admin
                    </Link>
                </div>
                
            </div>
        </div>
    )
}