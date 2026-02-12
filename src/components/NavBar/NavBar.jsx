import { useContext } from 'react'
import { Link } from "react-router"


import { UserContext } from '../../contexts/UserContext'

const NavBar = () =>{
    const { user, setUser } = useContext(UserContext)

    const handleSignOut = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return(
        <nav>
            {user?(
                <>
                    <Link to='/'> Home </Link>
                    <Link to='/workshops'>Workshops</Link>

                    {user?.role === "instructor" && (
                        <Link to="/workshops/new"> Create Workshop </Link>
                    )}

                    <Link to='/' onClick={handleSignOut}> Sign Out </Link>
                
                </>
                
            ):(
                <>
                    <Link to='/'>Home</Link>
                    <Link to='/sign-up'> Sign Up </Link>
                    <Link to='/sign-in'>Sign In</Link>
                </>
            
            )}

        </nav>
    )
}

export default NavBar