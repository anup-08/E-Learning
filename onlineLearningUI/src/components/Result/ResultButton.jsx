import { Link } from "react-router-dom";


export default function ResultButton(){
    //  const [showResult, setShowResult] = useState(false);
    return (
        <div className="relative">
            <Link to={"/getResult"} type="button"
                //onClick={() => setShowResult(true)}
                className="w-full p-3 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-yellow-600"
            > Show Result
            </Link>
        </div>
    );
}