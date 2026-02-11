
import { Route, Routes } from 'react-router';
import './App.css'
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';


const App = () => {


  return(
    <>
      <Routes>
        <Route path={'/'} element ={<h1>Hello world!</h1>}></Route>
        <Route path={'/sign-up'} element={<SignUpForm/>}></Route>
        <Route path={'/sign-in'} element={<SignInForm/>}></Route>

      </Routes>
  
    </>
    
  );


};

export default App;

