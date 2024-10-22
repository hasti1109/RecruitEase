import { Routes, Route } from "react-router-dom"
import Navbar from "../../components/Applicant/Navbar"
import JobDetailsPage from "./JobDetailsPage"
import { JobsPage } from "./JobsPage"
import MyApplicationsPage from "./MyApplicationsPage"
import MyProfilePage from "./MyProfilePage"
import SavedJobsPage from "./SavedJobsPage"
import ApplicationDetails from "./ApplicationDetails"

const ApplicantHomePage = () => {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path='jobs' element={<JobsPage/>}/>
        <Route path='jobs/:id' element={<JobDetailsPage/>}/>
        <Route path='myapplications' element={<MyApplicationsPage/>}/>
        <Route path='myapplications/:id' element={<ApplicationDetails/>}/>
        <Route path='saved' element={<SavedJobsPage/>}/>
        <Route path='myprofile' element={<MyProfilePage/>}/>
      </Routes>
    </div>
  )
}

export default ApplicantHomePage

