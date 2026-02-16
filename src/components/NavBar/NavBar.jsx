import { useContext } from 'react'
import { Link } from "react-router"

import './NavBar.css'

import { UserContext } from '../../contexts/UserContext'

const NavBar = () =>{
    const { user, setUser } = useContext(UserContext)

    const handleSignOut = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return(
        <nav className='nav-bar'>
            <div>
                <Link to='/'><h1 className='logo'>ArtLive</h1></Link>
            </div>
            {user?(
                <>
                    <Link to='/'> Home </Link>
                    <Link to='/workshops'>Workshops</Link>

                    {user?.role === "instructor" && (
                        <>
                            <Link to="/workshops/new"> Create Workshop </Link>
                            <Link to="/users/me/workshops"> My Workshops</Link>
                        </>
                    )}
                    {user?.role === "student" && (

                        <Link to="/users/me/registrations"> My Workshops </Link>

                    )}
                    <Link to='/' onClick={handleSignOut}> Sign Out </Link>
                
                </>
            ):(
                <>
                    <div className='navbar-actions'>
                        <Link to='/sign-in'> Sign In </Link>
                        <Link to='/sign-up' className='highlight'> Sign Up </Link>
                    </div>
                </>
            
            )}

        </nav>
    )
}

export default NavBar