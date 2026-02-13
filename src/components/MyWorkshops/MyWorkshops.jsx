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

  if (error) return <p>{error}</p>

    return(
        <main>
            <h1>My workshops</h1>
            <WorkshopList workshops={myWorkshops} />
        </main>
    )
}

export default MyWorkshops