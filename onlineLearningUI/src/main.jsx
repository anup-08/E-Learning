import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider   } from 'react-router-dom'
import { About, ExamCardPage, Contact, Home, Option, SignUp, StartExam, LoginPage ,
  ProtectedRoute, ResultPage, T_Page, ViewResult, AllStudentlist,
  QuestionList,
  AddQuestion} from "./components"
import './index.css'
import { IsAuthenticatedProvider } from './MyContext/IsAuth.jsx'
import Layout from './Layout.jsx'


const router = createBrowserRouter(
  
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>

      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='getoption' element={<Option />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='contact' element={<Contact />} />
      <Route path='/studentPage' element= {
        <ProtectedRoute >
          <ExamCardPage />
        </ProtectedRoute>}/>
      < Route path = '/startExam' element={
        <ProtectedRoute>
          <StartExam />
        </ProtectedRoute>}  />
      < Route path = '/getResult' element={
        <ProtectedRoute>
          <ResultPage />
        </ProtectedRoute>}  />

              {/* Teacher Area ---> */}

        <Route path='/teacherPage' element= {
          <ProtectedRoute >
            <T_Page />
          </ProtectedRoute>}/>

          <Route path='/viewResult' element= {
            <ProtectedRoute >
              <ViewResult />
            </ProtectedRoute>}/>

          <Route path='/listOfStudent' element= {
            <ProtectedRoute >
              <AllStudentlist />
            </ProtectedRoute>}/>

          <Route path='/getAllQuestion' element= {
            <ProtectedRoute >
              <QuestionList />
            </ProtectedRoute>}/>

          <Route path='/addQuestion' element= {
          <ProtectedRoute >
            <AddQuestion />
          </ProtectedRoute>}/>
          
    
    </Route >
  )
)

createRoot(document.getElementById('root')).render(


  <StrictMode>

    
      <IsAuthenticatedProvider>
        <RouterProvider router={router} />
      </IsAuthenticatedProvider>
 

  </StrictMode>,
)
