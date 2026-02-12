
import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import './App.css'

import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import NavBar from './components/NavBar/NavBar';
import WorkshopList from './components/WorkshopList/WorkshopList';
import WorkshopDetail from './components/WorkshopDetails/WorkshopDetails.jsx';
import WorkshopForm from './components/WorkshopForm/WorkshopForm.jsx'

import * as workshopService from './services/workshopService.js'

import { UserContext } from './contexts/UserContext';


const App = () => {

  const {user} = useContext(UserContext)

  const [workshops, setWorkshops] = useState([])

  useEffect(()=>{
    const fetchAllWorkshops = async() =>{ 
      const workshopData = await workshopService.index()
      setWorkshops(workshopData)
    }
    if (user) fetchAllWorkshops()
  },[user])

  console.log(workshops)


  return(
    <>
      <NavBar/>
      <Routes>
        <Route path={'/'} element ={user?<WorkshopList workshops={workshops}/> :<h1>Hello world!</h1>}></Route>
        {user? (
          <>
          
            <Route path='/workshops' element={<WorkshopList workshops={workshops}/>}></Route>
            <Route path='/workshops/:workshopId' element={<WorkshopDetail/>}></Route>

            {user.role === "instructor" && (
              <Route path="/workshops/new" element={<WorkshopForm/>}></Route>
            )}

          </>
        ):(
          <>
            <Route path='/sign-up' element={<SignUpForm/>}></Route>
            <Route path='/sign-in' element={<SignInForm/>}></Route>
          </>
        )}
      </Routes>
  
    </>
    
  );


};

export default App;

