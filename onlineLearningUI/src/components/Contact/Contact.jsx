import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
    const [name , setname] = useState()
    const [email , setEmail] = useState()
    const [isAgree , setIsAgree] = useState(false)
    const [desc , setDesc] = useState()

    const handleClick = () =>{
        if(!name){
            toast.error("Enter your Name...!")
        }
        else if(!email){
            toast.error("Enter your Email..!")
        }
        else if(!desc){
            toast.error("Enter your Query")
        }
        else if(!isAgree){
            toast.error("Accept the terms and condition...!")
        }

        else{
            alert("Thaks..! for Contacting us..")
            setEmail("")
            setDesc("")
            setname("")
            setIsAgree(false)

        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-blue-500 to-purple-500 text-black overflow-hidden">
            <div className="flex flex-col justify-center p-10 md:w-1/2 w-80 mt-10 mx-auto h-fit bg-white backdrop-blur-lg rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
                <form className="space-y-6">
                    <input
                        type="text"
                        value={name}
                        onChange={(e)=>setname(e.target.value)}
                        name="name"
                        placeholder="Enter your name"
                        className="w-full bg-transparent border-b border-black placeholder-black placeholder-opacity-70 py-2 text-black focus:outline-none focus:ring-0"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Enter a valid email address"
                        required
                        className="w-full bg-transparent border-b border-black placeholder-black placeholder-opacity-70 py-2 text-black focus:outline-none focus:ring-0"
                    />
                    <label className="flex items-center text-sm space-x-2">
                        <input
                            type="checkbox"
                            name="acceptedTerms"
                            onChange={(e)=>setIsAgree(e.target.value)}
                            required
                            className="w-4 h-4 accent-white"
                            checked={isAgree}
                        />
                        <span className="text-black text-opacity-80 cursor-pointer">
                            I accept the Terms of Service
                        </span>
                    </label>
                    <textarea
                        name="message"
                        placeholder="Your message"
                        value={desc}
                        onChange={(e)=>setDesc(e.target.value)}
                        rows="3"
                        className="w-full bg-transparent border-b border-black placeholder-black placeholder-opacity-70 py-2 text-black resize-none focus:outline-none focus:ring-0"
                    />
                    <button
                        type="submit" onClick={handleClick}
                        className="bg-black text-blue-400 font-semibold px-6 py-2 uppercase tracking-wider hover:bg-gray-200 transition rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
