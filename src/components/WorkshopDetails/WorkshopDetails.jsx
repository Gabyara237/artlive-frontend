
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router"

import * as workshopService from '../../services/workshopService'
import * as userService from '../../services/userService'
import { UserContext } from "../../contexts/UserContext"

const WorkshopDetail = ({handleDeleteWorkshop, handleRegisterWorkshop}) =>{
    const {workshopId} = useParams()

    const [workshop, setWorkshop]= useState(null)
    const [registration, setRegistration] = useState(null)
    const [message, setMessage] = useState("")

    const {user} = useContext(UserContext)

    useEffect(()=>{
        const fetchWorkshop = async () =>{
            const workshopData = await workshopService.show(workshopId)
            console.log(workshopData)
            setWorkshop(workshopData)
        }
        fetchWorkshop()
    }, [workshopId])

    useEffect(() => {
        const fetchRegistration = async () => {
            try {
            const {registration} = await userService.getMyRegistrationForWorkshop(workshopId)
            console.log(registration)
            setRegistration(registration) 
            } catch (e) {
            setMessage(e.message)
            }
        }
        fetchRegistration()
    }, [workshopId])

    const onRegister = async() =>{
        try {
            const reg = await handleRegisterWorkshop(workshopId)
            setRegistration(reg)
            setMessage(" You are registered for this workshop!")
        } catch (err) {
            setMessage(err.message)
        }
    }
    
    if (!workshop) return <main>Loading...</main>
    return(
        <main>
            <div>
                <h1>{workshop.title}</h1>
            </div>
            <div>
                <p>{workshop.description}</p>
                <p>{workshop.instructor_username}</p>
                <p>{workshop.art_type}</p>
                <p>{workshop.level}</p>
                <p>{workshop.workshop_date}</p>
                <p>{workshop.start_time}</p>
                <p>{workshop.duration_hours}</p>
                <p>{workshop.address}</p>
                <p>{workshop.city}</p>
                <p>{workshop.state}</p>
                <p>{workshop.max_capacity}</p>
                <p>{workshop.materials_included}</p>
                <p>{workshop.materials_to_bring}</p>
                <img src={workshop.image_url}/>
                <p>{workshop.created_at}</p>
            </div>
            <div>
                
                {user.role==='student' && (
                    <>


                        {registration?.status ==='active' && <p> You are already registered</p>}
                        {registration?.status ==='cancelled' && <p> You have cancelled your registration</p>}
                        {message && <p>{message}</p>}        
                        
                        {(!registration || registration.status === "active") && (
                            <button onClick={registration ? "onCancel" : onRegister}>
                                {registration?.status === "active"
                                ? "Cancel registration"
                                : "Reserve Your Spot"}
                            </button>
                        )}  
                    </>
                )}

                {workshop.instructor_id === user.id && (
                    <>
                        <Link to={`/workshops/${workshopId}/edit`}>Edit</Link>  
                         <button onClick={() => handleDeleteWorkshop(workshopId)}>
                            Delete
                        </button>
                    </>
                )}
            </div>
        </main>
    )

}

export default WorkshopDetail
