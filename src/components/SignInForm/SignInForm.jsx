import { useContext, useState } from "react"
import { useNavigate } from 'react-router'
import { signIn } from "../../services/authService"
import { UserContext } from "../../contexts/UserContext"


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
        <main>
            <h1>Sign In</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                
                </div>
                <div>
                    <button disabled={isFormInvalid()}>Sign In</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                    
                </div>
            </form>

        </main>
    )

}


export default SignInForm