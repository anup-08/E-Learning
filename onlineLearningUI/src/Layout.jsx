import { Outlet, useLocation } from "react-router-dom"
import {  Footer, Header } from "./components"
import { Toaster } from "react-hot-toast"

export default function Layout() {
    const location = useLocation()
    const hideHeader = ["/startExam" , "/getResult"].includes(location.pathname)
    const hideFoote = ["/login" , "/signup" , "/studentPage" , "/startExam" , "/getResult" , "/teacherPage" ,"/viewResult",
        "/listOfStudent" ,"/getAllQuestion" ,"/addQuestion"
    ].includes(location.pathname)
    return (
        <>
            {!hideHeader && <Header />}
            {/* <AutoRedirect /> */}
            <Outlet />
            {!hideFoote && <Footer />}
            <Toaster />
        </>
    )
}