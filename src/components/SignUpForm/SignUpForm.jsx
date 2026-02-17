import { useContext, useState } from "react"
import { Link,useNavigate } from 'react-router'
import { signUp } from "../../services/authService"

import { UserContext} from '../../contexts/UserContext'

import bgSignUp from '../../assets/bgSignUp.jpg'

const initialData={
    username : '',
    email: "",
    role: "",
    password: "",
    passwordConfirm: ""
}

const SignUpForm =()=>{
    const navigate = useNavigate()
    
    const {setUser} = useContext(UserContext)
    
    const [message, setMessage] = useState("");
    const [formData,setFormData] = useState(initialData)

    const { username, email, role, password, passwordConfirm} = formData


    const handleSubmit = async(evt) =>{
        evt.preventDefault()
        try{
            const newUser = await signUp(formData)
            setUser(newUser)
            navigate('/')

        }catch(err){
            setMessage(err.message)
        }

    }

    const handleChange =(evt)=>{
        setFormData({...formData, [evt.target.name]: evt.target.value})
    }

    const isFormInvalid =()=>{
        return !(username && email && password && password === passwordConfirm)
    }


    return(
        <main className="container">
            <div className="left-side-sign">
                <img className="img-sign" src={bgSignUp} alt="Woman making pottery in workshop shaping wet clay on pottery wheel"/>
            </div>
            <div className="right-side-sign">
                <h1 className="name">ArtLive</h1>
                {message && <p>{message}</p>}
                <div class="form-container form-container-sign"> 
                    <h1 className="title-form">Sign Up</h1>
                    <form className="form-sign" onSubmit= {handleSubmit}>

                        <div>
                            <div className="form-field">
                                <label htmlFor="username"> Username:</label>
                                <input 
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username} 
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                            <div className="form-field">
                                <label htmlFor="email">Email:</label>
                                <input 
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                            <div className="form-field">

                                <label htmlFor="role">Select your role</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value=""> Select a role </option>
                                    <option value="student">Student</option>
                                    <option value="instructor">Instructor</option>
                                </select>

                            </div>
                            <div className="form-field">

                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    required
                                />
                            
                            </div>
                            <div className="form-field">

                                <label htmlFor="passwordConfirm">Confirm Password:</label>
                                <input 
                                    type="password"
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    value={passwordConfirm}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>
                        <div className="form-actions">
                            <button className="submit-button" disabled={isFormInvalid()}>Sign Up</button>
                            <button className="cancel-button" onClick={() => navigate('/')}>Cancel</button>
                        </div>

                    </form>
                    <p className="p-sign">Already have an account?{' '}<Link className="a-sign" to="/sign-in">Log in!</Link></p>
                </div>

            </div>


        </main>
    )

}

export default SignUpForm