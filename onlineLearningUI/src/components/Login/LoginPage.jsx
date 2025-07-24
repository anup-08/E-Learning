import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Service/auth";
import useIsAuthenticated from "../../MyContext/IsAuth";
import Input from "../Input/Input";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";


export default function LoginPage(){
    const[userName , setUserName] = useState("");
    const[pass , setPass] = useState("");
    const navigate = useNavigate()
    const { setLoggedIn } = useIsAuthenticated();
    const {pending} = useFormStatus()
    
    const nameRef = useRef()
    const passRef = useRef()

    const handleSubmit =  async(e)=>{
       
        e.preventDefault()
        try {

            const data = await login(userName,pass)
            
            if (data && data.accessToken) {
                setLoggedIn(true);
                if(localStorage.getItem("role") == "/student"){ 
                    navigate("/studentPage")
                }
                else if(localStorage.getItem("role") == "/teacher"){
                    navigate("/teacherPage")
                }else{
                    toast.error("Unknown role. Please try logging in again.")
                }
            } 
            
        }catch(error){
            toast.error("Login failed. Please check your credentials.")
            // navigate("/getoption")
        }
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="h-91 flex justify-center mt-20 ">
                <div className="border-1 rounded-2xl md:w-1/4 p-5 bg-slate-200">
                    <h1 className="font-extrabold text-3xl text-center mt-5">Login</h1>
                    <div className="flex flex-col items-center mt-5 gap-2.5">
                        <Input type="text" placeholder="Username" className={`border-1 rounded-sm mt-2 h-10 w-2xs p-2 bg-white`}
                            value={userName} onChange={(e) => setUserName(e.target.value)} required ref={nameRef}/>
                        <Input type="password" placeholder="password" className={`border-1 rounded-sm mt-2 h-10 w-2xs p-2 bg-white`}
                            value={pass} onChange={(e) => setPass(e.target.value)} required ref={passRef}/>
                    </div>
                    <div className="flex justify-end">
                        <Link to="/signup" className="mr-10 mt-2 text-blue-800">SignUp?</Link>
                    </div>
                    <div className=" w-full h-40 flex justify-center">
                        <button  className="bg-violet-500 text-white font-semibold w-25 h-10 rounded-2xl my-10 hover:bg-purple-500 hover:cursor-pointer" disabled={pending}>
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}