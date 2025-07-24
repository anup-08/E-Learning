import { Link } from "react-router-dom"

export default function ShowStudent(){
    return(
         <div >
            <div className="max-w-xs mx-10 bg-white rounded-2xl shadow-lg overflow-hidden transform mb-5">
                {/* Image Section */}
                <img
                    src="https://img.freepik.com/premium-vector/happy-diverse-group-school-kids-smiling-together-cartoon-style_657438-32397.jpg" // Replace with your image URL
                    alt="List of Student"
                    className="w-full h-fit object-cover"
                />
                {/* Card Body */}
                <div className="p-4 mb-3 ">
                    <h2 className="text-xl font-bold mb-2">List of Students</h2>
                    <p className="text-gray-600 mb-5">
                        click the button to see List of students.
                    </p>
                    {/* Button */}
                    <Link to={"/listOfStudent"} type="button" className="w-full p-3 text-black font-semibold rounded-2xl bg-blue-400">
                        CLICK HERE
                    </Link>
                </div>
            </div>
        </div>
    )
}