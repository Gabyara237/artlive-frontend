import { useState } from "react"
import { useNavigate } from 'react-router'


const initialData={
    username : '',
    password: "",
}

const SignInForm =() =>{
    const navigate = useNavigate()

    const [formData, setFormData] = useState(initialData);
    const [message, setMessage] = useState("");

    const {username, password} = formData;

    const handleSubmit = (evt) =>{
        evt.preventDefault()
        try{
            console.log(formData)
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