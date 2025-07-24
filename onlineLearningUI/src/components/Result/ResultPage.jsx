import { useNavigate } from "react-router-dom"
import api from "../../api"
import { useEffect,useState } from "react";
import toast from "react-hot-toast";

export default function ResultPage() {

    
    const [result, setResult] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const score = async () => {
            try {
                const result = await api.get("/student/getResult")
                setResult(result.data)
            } catch (error) {
                toast.error("unable to load Result..")
                navigate(-1)
            }
        }
        score()
    }, [navigate])

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-400 bg-opacity-10 z-50 pointer-events-none">
            <div className="w-1/2 p-6  rounded-2xl transform scale-105 shadow-lg pointer-events-auto">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-black hover:cursor-pointer transform hover:scale-105"
                    onClick={() => navigate(-1)}
                >
                    ❌
                </button>
                <h1 className="text-3xl font-bold text-center">
                    {result ? result : "Loading..."}
                </h1>
            </div>
        </div>
    );
}