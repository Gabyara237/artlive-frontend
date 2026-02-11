import { useContext, useState } from "react"
import { useNavigate } from 'react-router'
import { signUp } from "../../services/authService"

import { UserContext} from '../../contexts/UserContext'

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
            console.log(newUser)
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
        <main>
            <h1>Sign Up</h1>
            {message && <p>{message}</p>}
            <form onSubmit= {handleSubmit}>

                <div>
                    <label htmlFor="username"> Username:</label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        value={username} 
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
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
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
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
                <div>
                    <button disabled={isFormInvalid()}>Sign Up</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                </div>

            </form>


        </main>
    )

}

export default SignUpForm