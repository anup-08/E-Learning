import { Link } from 'react-router-dom';
import ResultButton from "../Result/ResultButton"
import api from "../../api";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';



// ExamCard Component
function Card() {
    const [examGiven, setExamGiven] = useState();

    useEffect(() => {
        const isGiven = async () => {
            try {
                const res = await api.get("/student/isGivenExam");
                setExamGiven(res.data);
            } catch (error) {
                toast.error("Error fetching exam status:");
            }
        };
        isGiven()
    }, [])

    return (
        <div >
            <div className="max-w-xs mx-10 bg-white rounded-2xl shadow-lg overflow-hidden transform mb-5">
                {/* Image Section */}
                <img
                    src="https://university.blueprism.com/assets/uploads/images/Associate-Developer-Cert-Exam-Update-Thumbnail-20230724-JR-01-1.png" // Replace with your image URL
                    alt="Exam"
                    className="w-full h-48 object-cover"
                />
                {/* Card Body */}
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">Ready to Start?</h2>
                    <div className="text-gray-600 mb-4">
                        Finish the Exam within the time Period or else you will not get another chance!
                    </div>

                    <div className="w-full">
                        <Link to={"/startExam"} className="block w-full p-3 text-black font-semibold rounded-2xl bg-gray-200 text-center">
                            {examGiven ? <ResultButton /> : "Start Exam"}
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Card;

