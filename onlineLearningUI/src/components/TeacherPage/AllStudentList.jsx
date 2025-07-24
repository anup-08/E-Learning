import { useEffect, useState } from "react"
import api from "../../api"
import toast from "react-hot-toast"

export default function AllStudentlist() {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetch = async() => {
            try {
                const res = await api.get(`${localStorage.getItem("role")}/getStudentDetails`)
                setData(res.data)
            } catch (error) {
                toast.error("Something went Wrong...!")
            }
        }
        fetch()
    }, [])

    return (
        <div className="w-full h-fit p-3">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-black">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white overflow-hidden shadow-xl rounded-lg transform transition-all hover:scale-105 duration-200"
                    >
                        <div className="p-6">
                            <div className="flex items-baseline mb-4">
                                <span className="inline-block px-2 py-1 text-xs font-semibold tracking-wide text-blue-800 uppercase bg-blue-100 rounded-full">
                                    Enrollment: {item.enrollment}
                                </span>
                            </div>

                            <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                                Name: {item.name}
                            </h4>

                            <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                                Email: {item.email}
                            </h4>

                            <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                                Phone-No: {item.phoneNo}
                            </h4>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}