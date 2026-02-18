import {useState,useEffect} from "react"
import * as userService from '../..//services/userService'
import WorkshopList from '../WorkshopList/WorkshopList'




const MyWorkshops = ()=>{
    const [myWorkshops, setMyWorkshops] = useState([])
    const [error, setError] = useState("")
      
    useEffect(() => {
        const fetchMyWorkshops = async () => {
            try {
                const {workshops} = await userService.getMyWorkshops();
                console.log(workshops)
                setMyWorkshops(workshops);
                setError("");
            } catch (err) {
                setError(err.message);
            }
        }
        fetchMyWorkshops();
    }, [])

    const workshopsForList = myWorkshops.map(workshop => ({
        id: workshop.id,          
        title: workshop.title,
        art_type: workshop.art_type,
        level: workshop.level,
        workshop_date: workshop.workshop_date,
        start_time: workshop.start_time,
        latitude: workshop.latitude,
        longitude: workshop.longitude,
        image_url:workshop.image_url

    }))

    if (error) return <p>{error}</p>

    return(
        <main>
            <WorkshopList workshops={workshopsForList} />
        </main>
    )
}

export default MyWorkshops