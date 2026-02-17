import { useContext, useState } from 'react'
import { Link, NavLink } from "react-router" 
import './NavBar.css'
import { UserContext } from '../../contexts/UserContext'

const NavBar = () =>{
    const { user, setUser } = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = () => {
        localStorage.removeItem('token')
        setUser(null)
        setIsOpen(false);
    }

    const getActiveClassName = ({ isActive }) => isActive ? "nav-link active" : "nav-link";

    return(
        <nav className='nav-bar'>
            <div>
                <Link to='/' onClick={() => setIsOpen(false)}>
                    <h1 className='logo'>ArtLive</h1>
                </Link>
            </div>

            <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`nav-links ${isOpen? 'is-open':''}`}>
                {user?(
                    <>
                        <NavLink className={getActiveClassName} to='/' onClick={() => setIsOpen(false)}> Home </NavLink>
                        <NavLink className={getActiveClassName} end to='/workshops' onClick={() => setIsOpen(false)}>Workshops</NavLink>

                        {user?.role === "instructor" && (
                            <>
                                <NavLink className={getActiveClassName} to="/workshops/new" onClick={() => setIsOpen(false)}> Create Workshop </NavLink>
                                <NavLink className={getActiveClassName} to="/users/me/workshops" onClick={() => setIsOpen(false)}> My Workshops</NavLink>
                            </>
                        )}
                        {user?.role === "student" && (
                            <NavLink className={getActiveClassName} to="/users/me/registrations" onClick={() => setIsOpen(false)}> My Workshops </NavLink>
                        )}
            
                        <Link className="nav-link" to='/' onClick={handleSignOut}> Sign Out </Link>
                    </>
                ):(
                    <div className='navbar-actions'>
                        <NavLink className={getActiveClassName} to='/sign-in' onClick={() => setIsOpen(false)}> Sign In </NavLink>
                        <NavLink className={({ isActive }) => isActive ? "highlight active" : "highlight" } to='/sign-up' onClick={() => setIsOpen(false)}> Sign Up </NavLink>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default NavBar