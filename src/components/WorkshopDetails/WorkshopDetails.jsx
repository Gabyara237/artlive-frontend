
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router"

import * as workshopService from '../../services/workshopService'
import { UserContext } from "../../contexts/UserContext"

const WorkshopDetail = ({handleDeleteWorkshop}) =>{
    const {workshopId} = useParams()
    console.log(workshopId)
    const [workshop, setWorkshop]= useState(null)

    const {user} = useContext(UserContext)

    useEffect(()=>{
        const fetchWorkshop = async () =>{
            const workshopData = await workshopService.show(workshopId)
            console.log(workshopData)
            setWorkshop(workshopData)
        }
        fetchWorkshop()
    }, [workshopId])

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
                <p>{workshop.image_url}</p>
                <p>{workshop.created_at}</p>
            </div>
            <div>
                
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
