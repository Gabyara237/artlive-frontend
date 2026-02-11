import { useState } from "react"
import { useNavigate } from 'react-router'

const initialData={
    username : '',
    email: "",
    password: "",
    passwordConfirm: ""
}

const SignUpForm =()=>{
    const navigate = useNavigate()
    const [message, setMessage] = useState("");

    const [formData,setFormData] = useState(initialData)

     const { username, email, password, passwordConfirm} = formData


    const handleSubmit = async(evt) =>{
        evt.preventDefault()
        try{
            console.log(formData)
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