const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`

const getMyRegistrationForWorkshop = async (workshopId) => {
    try{
        const res = await fetch(`${BASE_URL}/me/registrations/workshops/${workshopId}`, {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}` 
            },
        })

        if (!res.ok){
            const errorData = await res.json()
                throw new Error(errorData.err)
        }
        return res.json()
  }catch (err){
        throw new Error(err)
    }
}

const getMyWorkshops = async () =>{
    try{
        const res = await fetch(`${BASE_URL}/me/workshops`, {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}` 
            },
        })

        if (!res.ok){
            const errorData = await res.json()
                throw new Error(errorData.err)
        }
        return res.json()
    }catch (err){
        throw new Error(err)
    }
}
export {getMyRegistrationForWorkshop, getMyWorkshops}