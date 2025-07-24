import { useState , useEffect } from "react";
import api from "../../api"
import StudentDetails from "./StudentDetails"
import toast from "react-hot-toast";

const ViewResult = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const role = localStorage.getItem("role")
            try {
                const response = await api.get(`${role}/getAllResult`)
                setData(response.data);
            }
            catch (err) {
                toast.error("Something went wrong..!");
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-fit  py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Search Results
                    </h1>
                    <p className="mt-3 text-xl text-gray-500">
                        {data.length} items found
                    </p>
                </div>

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
                                    Exam Name: {item.examName}
                                </h4>

                                <div className="mt-1">
                                    <span className="text-gray-600 text-sm">
                                        Score: {item.score}
                                    </span>
                                </div>

                                <div className="mt-6" >
                                    <StudentDetails enroll={ item.enrollment } />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ViewResult;
