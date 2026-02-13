
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router"

import * as workshopService from '../../services/workshopService'
import * as userService from '../../services/userService'

import WorkshopsMap from "../WorkshopsMap/WorkshopsMap"
import { UserContext } from "../../contexts/UserContext"



const WorkshopDetail = ({handleDeleteWorkshop, handleRegisterWorkshop, handleCancelRegistration}) =>{
    const {workshopId} = useParams()

    const [workshop, setWorkshop]= useState(null)
    const [registration, setRegistration] = useState(null)
    const [successMessage,setSuccessMessage]=useState("")
    const [error, setError] = useState("")

    const {user} = useContext(UserContext)

    useEffect(()=>{
        const fetchWorkshop = async () =>{
            try {
                const workshopData = await workshopService.show(workshopId)
                setWorkshop(workshopData)
                setError("") 
            } catch (err) {
                setError(err.message)
            }
        }
        fetchWorkshop()
    }, [workshopId])

    useEffect(() => {
        const fetchRegistration = async () => {
            try {
                const {registration} = await userService.getMyRegistrationForWorkshop(workshopId)
                setRegistration(registration) 
                setError("") 
            } catch (err) {
                setError(err.message)
            }
        }
        fetchRegistration()
    }, [workshopId])

    useEffect(() => {
        if (!successMessage) return

        const timer = setTimeout(() => {
            setSuccessMessage("")
        }, 5000)

        return () => clearTimeout(timer)
    },[successMessage])

    const onRegister = async() =>{
        try {
            const registration = await handleRegisterWorkshop(workshopId)
            setRegistration(registration)
            setError("")
            setSuccessMessage("Registration successful!")

        } catch (err) {
            setError(err.message)
        }
    }
    
    const onCancel = async()=>{
        try {
            const cancellation = await handleCancelRegistration(workshopId)
            setRegistration(cancellation)
            setError("")
            setSuccessMessage("Cancellation successful!")
        } catch (err) {
            setError(err.message)
        }
    }


    if (!workshop) return <main>Loading...</main>
    return(
        <main>

            {successMessage && (
                <p className="success">{successMessage}</p>
            )}

            {error && (
                <p className="error">{error}</p>
            )}
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
                <WorkshopsMap workshops={[workshop]} />
                
                {user.role==='student' && (
                    <>

                        {registration?.status ==='cancelled' && <p> You have cancelled your registration for this workshop! </p>}
                         
                        {(!registration || registration.status === "active") && (
                            <button onClick={registration ? onCancel : onRegister}>
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
