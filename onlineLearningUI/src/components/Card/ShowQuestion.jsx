import { Link , useNavigate} from "react-router-dom";
import api from "../../api"
import toast from "react-hot-toast";


export default function ShowQuestion() {
    const navigate = useNavigate()

    const fetch = async()=>{
        try {
            const res = await api.get(`${localStorage.getItem("role")}/removeQuestion`)
            toast.success(res.data)
            navigate("/teacherPage")
            
        } catch (error) {
            toast.error(error)
        }
    }

    const handleClick = ()=>{
        fetch()
    }


    return (
        <div >
            <div className="max-w-xs mx-10 bg-white rounded-2xl shadow-lg overflow-hidden transform mb-5">
                {/* Image Section */}
                <img
                    src="https://img.freepik.com/premium-vector/check-mark-paper-clipboard-isometric-illustration_999616-4027.jpg" // Replace with your image URL
                    alt="Question"
                    className="w-full h-71 object-cover"
                />
                {/* Card Body */}
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">Question List</h2>
                    <p className="text-gray-600 mb-4">
                        You can see all question of question bank
                    </p>
                    {/* Button */}

                    <div className="flex items-center justify-between ">
                        <Link
                            to="/getAllQuestion"
                            className="px-4 py-2 bg-blue-400 text-black font-semibold rounded-xl"
                        >
                            See Question
                        </Link>
                        <button  onClick={handleClick}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3221/3221897.png"
                                className="h-8 w-8 "
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}