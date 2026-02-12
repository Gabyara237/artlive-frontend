const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/workshops`


const index = async ()=>{
    try{
        const res = await fetch(`${BASE_URL}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.err)
        }
        return res.json()
    }catch(err){
        throw new Error(err)
    }

}

const show = async (workshopId)=>{
    try{
        const res = await fetch(`${BASE_URL}/${workshopId}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.err)
        }
        return res.json()
    }catch(err){
        throw new Error(err)
    }

}

const create = async (workshopFormData)=>{
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: workshopFormData,
        })
        return res.json()
    }catch(err){
        throw new Error(err)
    }

}

export {index, show, create}
