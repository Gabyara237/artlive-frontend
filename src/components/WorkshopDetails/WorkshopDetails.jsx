
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router"

import * as workshopService from '../../services/workshopService'
import * as userService from '../../services/userService'

import WorkshopsMap from "../WorkshopsMap/WorkshopsMap"
import './WorkshopDetails.css'
import { UserContext } from "../../contexts/UserContext"

import formatDateTime from '../../utils/formatDateTime'
import Tabs from "../Tabs/Tabs"


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
    const workshop_date= workshop.workshop_date;
    const start_time = workshop.start_time

    return(
        <main className="container-workshop-detail">

            {successMessage && (
                <p className="success">{successMessage}</p>
            )}

            {error && (
                <p className="error">{error}</p>
            )}
            <div className="details-action">
                {user.role==='student' && (
                    <>
                
                        {registration?.status ==='cancelled' && <p> You have cancelled your registration for this workshop! </p>}
                        
                        {(!registration || registration.status === "active") && (
                            <button className="highlight detail" onClick={registration ? onCancel : onRegister}>
                                {registration?.status === "active"
                                ? "Cancel registration"
                                : "Reserve Your Spot"}
                            </button>
                        )}  
                    </>
                )}
                
                {workshop.instructor_id === user.id && (
                    <div className="actions-detail">
                        <Link className="highlight highlight-detail"  to={`/workshops/${workshopId}/registrations`}>View Registrations <span className="span-registrations">{workshop.current_registrations}</span></Link>
                        <Link className="highlight highlight-detail" to={`/workshops/${workshopId}/edit`}>Edit</Link>
                        <button className="cancel-button delete-button" onClick={() => handleDeleteWorkshop(workshopId)}>
                            Delete
                        </button>
                    </div>
                )}

            </div>
            <div className="container-workshop-list container-detail">

                <div className="workshop-list workshop-detail">
                    <div>
                        <div className="workshop-info-basic">
                            <div className="container-workshop-img-detail">
                                <img className="img-detail" src={workshop.image_url}/>

                            </div>
                            <div className="info-basic">
                                <h1>{workshop.title}</h1>
                                <p className="p-info-basic">Instructor: <span className="span-p">{workshop.instructor_username}</span></p>
                                <p className="p-info-basic">Date: <span className="span-p">{formatDateTime(workshop_date, start_time)}</span></p>
                                <p className="p-info-basic">Address: <span className="span-p">{workshop.address} - {workshop.city} - {workshop.state} </span></p>
                                <p className="p-info-basic">Workshop duration: <span className="span-p">{workshop.duration_hours} hours</span></p>
                                {workshop.instructor_id === user.id? <p className="p-info-basic">Registered: <span className="span-p">{workshop.current_registrations}/{workshop.max_capacity}</span></p>:<p className="p-info-basic">Max capacity: <span className="span-p">{workshop.max_capacity}</span></p>}
                                <div className="container-tags">
                                    <p className="container-tag container-tag2">{workshop.level}</p>
                                    <p className="container-tag container-tag2">{workshop.art_type}</p>
                                </div>

                            </div>

                        </div>
                        <Tabs workshop={workshop}/>
                    </div>

                </div>
                <div className="workshop-map workshop-map-detail">
                    
                    <WorkshopsMap workshops={[workshop]} />
                    
                </div>
            </div>
        </main>
    )

}

export default WorkshopDetail
