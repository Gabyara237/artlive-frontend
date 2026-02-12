
import { useContext } from 'react';
import { Route, Routes } from 'react-router';
import './App.css'
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import NavBar from './components/NavBar/NavBar';
import WorkshopList from './components/WorkshopList/WorkshopList';
import { UserContext } from './contexts/UserContext';



const App = () => {

  const {user} = useContext(UserContext)

  return(
    <>
      <NavBar/>
      <Routes>
        <Route path={'/'} element ={user?<WorkshopList/> :<h1>Hello world!</h1>}></Route>
        <Route path={'/sign-up'} element={<SignUpForm/>}></Route>
        <Route path={'/sign-in'} element={<SignInForm/>}></Route>

      </Routes>
  
    </>
    
  );


};

export default App;

