
import { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import './App.css'

import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import NavBar from './components/NavBar/NavBar';
import WorkshopList from './components/WorkshopList/WorkshopList';
import WorkshopDetail from './components/WorkshopDetails/WorkshopDetails.jsx';
import WorkshopForm from './components/WorkshopForm/WorkshopForm.jsx'
import MyWorkshops from './components/MyWorkshops/MyWorkshops.jsx'
import MyRegistrations from './components/MyRegistrations/MyRegistrations.jsx'
import Landing from './components/Landing/Landing.jsx'

import * as workshopService from './services/workshopService.js'


import { UserContext } from './contexts/UserContext';


const App = () => {
  const navigate = useNavigate()
  const {user} = useContext(UserContext)

  const [workshops, setWorkshops] = useState([])


  useEffect(()=>{
    const fetchAllWorkshops = async() =>{ 
      const workshopData = await workshopService.index()
      setWorkshops(workshopData)
    }
    if (user) fetchAllWorkshops()
  },[user])


  const handleAddWorkshop = async( workshopFormData) =>{

    const newWorkshop = await workshopService.create(workshopFormData)
    setWorkshops([newWorkshop, ...workshops])
    navigate('/workshops')
  }

  const handleUpdateWorkshop = async (workshopId, workshopFormData) =>{

    const updateWorkshop = await workshopService.updateWorkshop(workshopId,workshopFormData)
    setWorkshops(
      workshops.map((workshop)=>
        workshop.id === updateWorkshop.id? updateWorkshop :workshop,
      ),
    )
    navigate(`/workshops/${workshopId}`)
  }

  const handleDeleteWorkshop = async (workshopId)=>{

    const deleteWorkshop = await workshopService.deleteWorkshop(workshopId)
    const filteredworkshops = workshops.filter((workshop) => workshop.id !== deleteWorkshop.id)
    setWorkshops(filteredworkshops)
    navigate('/workshops')
  }

  const handleRegisterWorkshop = async(workshopId) =>{
    const {registration, updated_workshop} = await workshopService.registerWorkshop(workshopId)
    setWorkshops(prev =>
      prev.map(workshopCurrent =>
        workshopCurrent.id === updated_workshop.id? {...workshopCurrent, ...updated_workshop} :workshopCurrent,
      ),
    )
    return registration

  }

  const handleCancelRegistration = async(workshopId) =>{
    const {cancellation, updated_workshop} = await workshopService.cancelWorkshop(workshopId)
    setWorkshops(prev =>
      prev.map(workshopCurrent =>
        workshopCurrent.id === updated_workshop.id? {...workshopCurrent, ...updated_workshop} :workshopCurrent,
      ),
    )
    return cancellation
  }


  return(
    <>
      <NavBar/>
      <Routes>
        <Route path={'/'} element ={user?<WorkshopList workshops={workshops}/> :<Landing/>}/>
        {user? (
          <>
          
            <Route path='/workshops' element={<WorkshopList workshops={workshops}/>}/>
            <Route path='/workshops/:workshopId' element={<WorkshopDetail handleDeleteWorkshop={handleDeleteWorkshop} handleRegisterWorkshop={handleRegisterWorkshop} handleCancelRegistration={handleCancelRegistration}/>}/>

            {user.role === "instructor" && (
              <>
                <Route path="/workshops/new" element={<WorkshopForm handleAddWorkshop={handleAddWorkshop} handleUpdateWorkshop={handleUpdateWorkshop}/>}/>
                <Route path="/workshops/:workshopId/edit" element={ <WorkshopForm handleUpdateWorkshop={handleUpdateWorkshop} />} />
                <Route path='/users/me/workshops' element={<MyWorkshops/>} />
              </>
            )}

            {user.role === "student" && (
              <Route path='/users/me/registrations' element={<MyRegistrations/>}/>
            )}

          </>
        ):(
          <>
            <Route path='/sign-up' element={<SignUpForm/>}/>
            <Route path='/sign-in' element={<SignInForm/>}/>
          </>
        )}
      </Routes>
  
    </>
    
  );


};

export default App;

