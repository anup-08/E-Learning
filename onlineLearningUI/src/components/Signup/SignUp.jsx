import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../Service/auth";
import useIsAuthenticated from "../../MyContext/IsAuth";
import Input from "../Input/Input";



export default function SignUp(){ 
    const[email,setEmail] = useState("");
    const[pass,setPass] = useState("");
    const[mobile,setMobile] = useState("");
    const[enroll,setEnroll] = useState("");
    const[name,setName] = useState("");
    const navigate = useNavigate()
    const {setLoggedIn , isLoggedIn} = useIsAuthenticated()
    
    const emailRef = useRef();
    const passRef = useRef();
    const mobileRef = useRef();
    const enrollRef = useRef();
    const nameRef = useRef();

    const userData = {
        name:name,
        email:email,
        idNo:enroll,
        phoneNo:mobile,
        password:pass
    }

    const handleSubmission = async(e)=>{
        e.preventDefault()
        
        console.log(userData);
        
        const data = await register(userData)
        console.log(data?.data);
        
        setLoggedIn(true)
        
        if(localStorage.getItem("role") === "/student"){
            navigate("/studentPage")
        }
        else if(localStorage.getItem("role") === "/teacher"){
            navigate("/teacherPage")
        }
        

    }

    return(
        <form onSubmit={handleSubmission}>
            <div className="h-91 flex justify-center mt-10 ">
                <div className="border-1 rounded-2xl md:w-1/4 p-5 h-fit bg-slate-200">
                    <h1 className="font-extrabold text-3xl text-center mt-5">SignUp</h1>
                    <div className="flex flex-col items-center mt-5 gap-2.5">
                        <Input type="text" placeholder="Full Name" required className={`border-1 rounded-sm mt-2 h-10 w-2xs p-2 bg-white`}
                            value={name} onChange={(e)=>setName(e.target.value)} ref = {nameRef} />
                        <Input type="text" placeholder="Enter your ID" required className={`border-1 rounded-sm mt-2 h-10 w-2xs p-2 bg-white`}
                            value={enroll} onChange={(e)=>setEnroll(e.target.value)} ref = {enrollRef}/>
                        <Input type="text" placeholder="Email" required className={`border-1 rounded-sm mt-2 h-10 w-2xs p-2 bg-white`}
                            value={email} onChange={(e)=>setEmail(e.target.value)} ref = {emailRef}/>
                        <Input type="text" inputMode="numeric" placeholder="Phone no" required maxLength={10} className={`border-1 rounded-sm mt-2 h-10 w-2xs p-2 bg-white appearance`}
                            value={mobile} onChange={(e)=>setMobile(e.target.value)} ref = {mobileRef}/>
                        <Input type="password" placeholder="password" required className={`border-1 rounded-sm mt-2 h-10 w-2xs p-2 bg-white`}
                            value={pass} onChange={(e)=>setPass(e.target.value)} ref = {passRef}/>
                    </div>
                    <div className="flex justify-end">
                        <Link to="/login" className="mr-10 mt-2 text-blue-800">Login?</Link>
                    </div>
                    <div className=" w-full h-30 flex justify-center">
                        <button className="bg-violet-500 text-white font-semibold w-25 h-10 rounded-2xl my-10 hover:bg-purple-500 hover:cursor-pointer">
                            SIGNUP
                        </button>
                    </div>
                </div>
            
            </div>
        </form>
    )
}
