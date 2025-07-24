import ShowQuestion from "../Card/ShowQuestion";
import ShowStudent from "../Card/ShowStudent";
import ViewResultCard from "../Card/ViewResultCard";
import AddCard from "./AddCard"

export default function T_Page(){
    return(
        <>
         <div className="w-full h-153 p-5 lg:flex grid-cols-1">
            <ViewResultCard />
            <ShowStudent />
            <ShowQuestion />
            <AddCard />
         </div>
        </>
    )
}