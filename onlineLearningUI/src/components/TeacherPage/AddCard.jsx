import toast from "react-hot-toast";
import api from "../../api"
import { useNavigate } from "react-router-dom";

const AddCard = () => {
  const navigate = useNavigate()

  const fetch = async () => {
    try {
      const res = await api.get(`${localStorage.getItem("role")}/getAllQuestion`)
      if (res.data.length > 0) {
        toast.error("Remove the Previous Question first..!")
        navigate("/teacherPage")
      }
      else {
        navigate("/addQuestion")
      }
    } catch (error) {
      toast.error("Something went wrong..!")
    }
  }

  const handleOnClick = ()=>{
    fetch()
  }

    return (
      <div className="flex items-center justify-center h-64" onClick={handleOnClick}>
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-200">
          <div className="bg-blue-500 text-white rounded-full p-4 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <span className="text-gray-700 font-semibold">Add Questions</span>
        </div>
      </div>
    );
  };

  export default AddCard;
