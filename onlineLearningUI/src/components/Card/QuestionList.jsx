import { useEffect, useState } from "react"
import api from "../../api"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function QuestionList() {
    const [data, setData] = useState([])
    const [examName, setExamName] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get(`${localStorage.getItem("role")}/getAllQuestion`)

                if (Array.isArray(res.data) && res.data.length > 0) {
                    setData(res.data)
                    setExamName(res.data[0]?.examName);
                }
                else {
                    toast.success("No questions found.");
                    navigate("/teacherPage");
                }
            } catch (error) {
                const msg = error?.response?.data?.message || "Something went wrong!";
                toast.error(msg);   
                navigate("/teacherPage");
            }
        }
        fetch()
    }, [])

    return (
        <div className="w-full h-fit p-5">
            <div className="items-baseline mb-4">
                <span className="px-3 py-1 font-semibold tracking-wide  uppercase bg-blue-100 rounded-full text-2xl">
                    Exam name: {examName}
                </span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2  xl:grid-cols-4 text-black">

                {
                    data.map((iteam, index) => (
                        <div key={index}
                            className="bg-white overflow-hidden shadow-xl rounded-lg transform transition-all hover:scale-105 duration-200"
                        >
                            <div className="p-6">
                                <div className="flex items-baseline mb-4">
                                    <span className="inline-block px-2 py-1 text-xl font-semibold tracking-wide text-blue-800 uppercase bg-blue-100 rounded-full">
                                        Question: {iteam.question}
                                    </span>
                                </div>

                                <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                                    option1 : {iteam.option1}
                                </h4>

                                <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                                    option2 : {iteam.option2}
                                </h4>

                                <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                                    option3 : {iteam.option3}
                                </h4>

                                <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                                    option4 : {iteam.option4}
                                </h4>

                                <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                                    Answer : {iteam.ans}
                                </h4>

                            </div>

                        </div>
                    ))
                }

            </div>
        </div>
    )
}