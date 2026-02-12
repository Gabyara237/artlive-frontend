import { Link } from "react-router"

const NavBar = () =>{
    return(
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/sign-up'> Sign Up </Link>
            <Link to='/sign-in'>Sign In</Link>

        </nav>
    )
}

export default NavBar