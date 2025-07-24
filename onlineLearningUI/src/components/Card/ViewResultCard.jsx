import { Link } from "react-router-dom"

export default function ViewResultCard(){
    return(
         <div >
            <div className="max-w-xs mx-10 bg-white rounded-2xl shadow-lg overflow-hidden transform mb-5">
                {/* Image Section */}
                <img
                    src="https://static.vecteezy.com/system/resources/previews/016/131/843/non_2x/financial-statement-icon-in-comic-style-result-cartoon-illustration-on-white-isolated-background-report-splash-effect-business-concept-vector.jpg" // Replace with your image URL
                    alt="Result"
                    className="w-full h-fit object-cover"
                />
                {/* Card Body */}
                <div className="p-4 mb-3 ">
                    <h2 className="text-xl font-bold mb-2">Result of Students</h2>
                    <p className="text-gray-600 mb-5">
                        click the button to see students result
                    </p>
                    {/* Button */}
                    <Link to={"/viewResult"} type="button" className="w-full p-3 text-black font-semibold rounded-2xl bg-blue-400">
                        See Results
                    </Link>
                </div>
            </div>
        </div>
    )
}