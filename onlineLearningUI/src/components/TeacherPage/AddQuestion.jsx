import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddQuestion() {
  const [examName, setExamName] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      ans: "",
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      // Add new question at the end
      setQuestions([
        ...questions,
        {
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          ans: "",
        },
      ]);
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const fetch =async()=>{
    try {
        await api.post(`${localStorage.getItem("role")}/addQuestion` , {examName,questions})
    } catch (error) {
        toast.error("Something went wrong...!")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch()
    navigate("/teacherPage")
    
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Create Exam
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="examName"
            className="block mb-2 font-semibold text-gray-700"
          >
            Exam Name
          </label>
          <input
            id="examName"
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Exam Name"
          />
        </div>

        <div className="border rounded-md p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Question {currentIndex + 1}
          </h2>

          <div className="mb-4">
            <label
              htmlFor={`question-${currentIndex}`}
              className="block mb-1 font-medium text-gray-600"
            >
              Question
            </label>
            <textarea
              id={`question-${currentIndex}`}
              value={questions[currentIndex].question}
              onChange={(e) =>
                handleQuestionChange(currentIndex, "question", e.target.value)
              }
              required
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              placeholder="Enter question here..."
            />
          </div>

          {["option1", "option2", "option3", "option4"].map((opt, idx) => (
            <div key={opt} className="mb-3">
              <label
                htmlFor={`${opt}-${currentIndex}`}
                className="block mb-1 font-medium text-gray-600"
              >
                Option {idx + 1}
              </label>
              <input
                id={`${opt}-${currentIndex}`}
                type="text"
                value={questions[currentIndex][opt]}
                onChange={(e) =>
                  handleQuestionChange(currentIndex, opt, e.target.value)
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Enter option ${idx + 1} here`}
              />
            </div>
          ))}

          <div className="mb-4">
            <label
              htmlFor={`ans-${currentIndex}`}
              className="block mb-1 font-medium text-gray-600"
            >
              Correct Answer (a, b, c or d)
            </label>
            <input
              id={`ans-${currentIndex}`}
              type="text"
              maxLength={1}
              pattern="[a-dA-D]"
              title="Answer must be one of a, b, c, or d"
              value={questions[currentIndex].ans}
              onChange={(e) =>
                handleQuestionChange(
                  currentIndex,
                  "ans",
                  e.target.value.toLowerCase()
                )
              }
              required
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="a"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-6 py-2 rounded-md font-medium text-white ${
              currentIndex === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          {currentIndex < questions.length - 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Next
            </button>
          )}

          {currentIndex === questions.length - 1 && (
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 rounded-md font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Add Question
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

