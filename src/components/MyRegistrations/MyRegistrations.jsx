import {useState,useEffect} from "react"
import * as userService from '../..//services/userService'
import WorkshopList from '../WorkshopList/WorkshopList'



const MyRegistrations = ()=>{
    const [myRegistrations, setMyRegistrations] = useState([])
    const [error, setError] = useState("")
      
    useEffect(() => {
        const fetchMyWorkshops = async () => {
            try {
                const {registrations} = await userService.getMyRegistrations();
                console.log(registrations)
                setMyRegistrations(registrations);
                setError("");
            } catch (err) {
                setError(err.message);
            }
        }
        fetchMyWorkshops();
    }, [])

    const workshopsForList = myRegistrations.map(registration => ({
        id: registration.workshop_id,          
        title: registration.title,
        art_type: registration.art_type,
        level: registration.level,
        workshop_date: registration.workshop_date,
        start_time: registration.start_time,
        latitude: registration.latitude,
        longitude: registration.longitude,
        image_url:registration.image_url
    }))

    if (error) return <p>{error}</p>

    return(
        <main>
            <WorkshopList workshops={workshopsForList} />
        </main>
    )
}

export default MyRegistrations