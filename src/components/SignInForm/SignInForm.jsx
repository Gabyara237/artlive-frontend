import { useContext, useState } from "react"
import { Link, useNavigate } from 'react-router'
import { signIn } from "../../services/authService"
import { UserContext } from "../../contexts/UserContext"

import bgSignIn from '../../assets/bgSignIn.jpg'
import "./SignInForm.css"

const initialData={
    username : '',
    password: "",
}

const SignInForm =() =>{
    const navigate = useNavigate()

    const {setUser} = useContext(UserContext)

    const [formData, setFormData] = useState(initialData);
    const [message, setMessage] = useState("");

    const {username, password} = formData;

    const handleSubmit = async (evt) =>{
        evt.preventDefault()
        try{
            const signedInUser = await signIn(formData)
            setUser(signedInUser)
            navigate('/')

        }catch(err){
            setMessage(err.message)
        }
    }

    const handleChange = (evt) =>{
        setMessage("")
        setFormData({...formData, [evt.target.name]:evt.target.value})
    }

    const isFormInvalid=()=>{
        return !(username  && password)
    }

    return(
        <main className="container" >
            <div className="left-side-sign">
                <img className="img-sign" src={bgSignIn} alt="Woman painting a picture"/>
            </div>
            <div className="right-side-sign">
                <h1 className="name">ArtLive</h1>
                {message && <p>{message}</p>}
                <div class="form-container form-container-sign"> 
                    <h1 className="title-form">Sign In</h1>
                    <form className="form-sign" onSubmit={handleSubmit}>
                        <div>
                            <div className="form-field">

                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                />

                            </div>
                        
                        </div>
                        <div className="form-actions">
                            <button className="submit-button"  disabled={isFormInvalid()}>Sign In</button>
                            <button className="cancel-button" onClick={() => navigate('/')}>Cancel</button>
                            
                        </div>
                    </form>
                    <p className="p-sign">
                        Don’t have an account?{' '}
                        <Link className="a-sign" to="/sign-up">Sign up!</Link>
                    </p>
                </div>
            </div>

        </main>
    )

}


export default SignInForm