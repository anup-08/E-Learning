import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import QuizCard from "./QuizCard";
import toast from "react-hot-toast";

export default function StartExam() {
    const [question, setQuestion] = useState([]);
    const [currIdx, setCurrIdx] = useState(0)
    const [answer, setAnswer] = useState({})
    const [timer, setTimer] = useState(10)
    

    const navigate = useNavigate()

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await api.get(`/student/getQuestions`);

                const transformed = res.data.map(q => ({
                    id: q.questionId,
                    question: q.questionText,
                    option: [q.option1, q.option2, q.option3, q.option4]
                }));
                setQuestion(transformed);

            } catch (error) {
                toast.error("Unable to load exam questions. Please try again later.");
                navigate("/studentPage")
            }
        };
        fetchQuestions()
    }, [])

    useEffect(() => {
        if (currIdx >= question.length) return;

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) {
                    handleNext();
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            })
        }, 1000)
        return () => clearInterval(interval);
    }, [currIdx, question])

    const handleNext = () => {
        if (currIdx < question.length - 1) {
            setCurrIdx(currIdx + 1);
            setTimer(10)
        } else {
            handleSubmit()
        }
    }

    const handleSubmit = async () => {
        try {
            const formattedAnswers = Object.entries(answer).reduce((acc, [key, value]) => {
                acc[parseInt(key)] = value;
                return acc;
            }, {});

            console.log("Submitting answers:", formattedAnswers);
            const token = localStorage.getItem("accessToken"); // or sessionStorage.getItem

            if (!token) {
                toast.error("You are not logged in. Please log in again.");
                navigate("/login"); // Or your login route
                return;
            }

            await api.post(`/student/submit?examName=${examName}`, formattedAnswers);
            toast.success("Exam submitted.");
            navigate("/studentPage");
        }
        catch (error) {
            toast.error("Submission failed. Please try again.",error.respose);
            navigate("/studentPage")
        }

    }

    const handleOptionSelect = (qId, option) => {
        setAnswer({ ...answer, [qId]: option })
    }

    if (question.length === 0) return <div>Loading questions...</div>;


    const currentQuestion = question[currIdx];
    const progressPercent = ((currIdx + 1) / question.length) * 100;


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-blue-500 to-teal-500 text-white p-4">
            <div className="w-full max-w-md mb-4">
                <div className="text-lg mb-1">
                    Question {currIdx + 1} of {question.length}
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2.5 mb-2">
                    <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
                <div className="text-sm mb-2 ">Time Left: <span className="text-red-400">{timer}</span>s</div>
            </div>

            <QuizCard
                question={currentQuestion}
                onSelect={handleOptionSelect}
                selected={answer[currentQuestion.id]}
            />

            <button
                onClick={handleNext}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded"
            >
                Next
            </button>

        </div>
    )
}