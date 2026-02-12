import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import * as workshopService from '../../services/workshopService'

const initialData ={
    title:"",
    description:"",
    art_type: "",
    level: "",
    workshop_date: "",
    start_time: "",
    duration_hours: 0,
    address: "",
    city: "",
    state: "",
    max_capacity:1,
    materials_included: "",
    materials_to_bring: "", 
}

const WorkshopForm = ({handleAddWorkshop, handleUpdateWorkshop}) =>{

    const navigate = useNavigate()
    const {workshopId} = useParams()
    const [message,setMessage] = useState("")
    const [formData, setFormData] = useState(initialData)
    const [imageFile, setImageFile] = useState(null)

    const {title, description, art_type,level,workshop_date, start_time, duration_hours ,address, city, state, max_capacity,materials_included, materials_to_bring} = formData


    useEffect(()=>{
        const fetchWorkshop = async() =>{
            if (!workshopId) return
            const workshopData = await workshopService.show(workshopId)

            setFormData({
                title:workshopData.title || "",
                description:workshopData.description || "",
                art_type: workshopData.art_type || "",
                level: workshopData.level || "",
                workshop_date: workshopData.workshop_date || "",
                start_time: workshopData.start_time || "",
                duration_hours: workshopData.duration_hours || 0,
                address: workshopData.address || "",
                city: workshopData.city || "",
                state: workshopData.state || "",
                max_capacity:workshopData.max_capacity || 1,
                materials_included: workshopData.materials_included || "",
                materials_to_bring: workshopData.materials_to_bring || "", 
            })
        }
        fetchWorkshop()
    },[workshopId])


    const handleSubmit = (evt)=>{
        evt.preventDefault()

        const data = new FormData()
        data.append('title', title)
        data.append('description', description)
        data.append('art_type', art_type)
        data.append('level', level)
        data.append('workshop_date', workshop_date)
        data.append('start_time', start_time)
        data.append('duration_hours', duration_hours)
        data.append('address', address)
        data.append('city', city)
        data.append('state', state)
        data.append('max_capacity', max_capacity)
        data.append('materials_included', materials_included)
        data.append('materials_to_bring', materials_to_bring)


        if (imageFile) {
            data.append('image_url', imageFile)
        }
        if (workshopId){
            handleUpdateWorkshop(workshopId,data)
        }else{
            
            handleAddWorkshop(data)
        }

    }
    
    const handleChange = (evt)=>{
        setMessage("")
        setFormData({...formData, [evt.target.name]: evt.target.value})
    }

    const isFormInvalid = ()=>{
        return !(title && description &&  art_type && level && workshop_date && start_time && Number(duration_hours) > 0 && address &&  city && state && max_capacity)
    }

    return(
        <main>
            <h1> {workshopId? 'Edit Workshop' : 'New Workshop'}</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
               <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        rows="4"
                        required
                    />

                    <label>Category</label>
                    <select
                        id="art_type"
                        name="art_type"
                        value={art_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select a category --</option>
                        <option value='watercolor_painting'>Watercolor Painting</option>
                        <option value='oil_painting'>Oil Painting</option>
                        <option value='acrylic_painting'>Acrylic Painting</option>
                        <option value='drawing'>Drawing</option>
                        <option value='charcoal_pastel_drawing'>Charcoal Pastel Drawing</option>
                        <option value='ink_drawing_calligraphy'>Ink Drawing Calligraphy</option>
                        <option value='mixed_media'>Mixed Media</option>
                        <option value='ceramics_pottery'>Ceramics Pottery</option>
                        <option value='clay_sculpture'>Clay Sculpture</option>
                        <option value='wood_sculpture_carving'>Wood Sculpture Carving</option>
                        <option value='mosaic_art'>Mosaic Art</option>
                    </select>

                    <label>Level</label>
                    <select
                        id="level"
                        name="level"
                        value={level}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select a level --</option>
                        <option value='beginner'>Beginner</option>
                        <option value='intermediate'>Intermediate</option>
                        <option value='advanced'>Advanced</option>
                        <option value='all_levels'>All levels</option>

                    </select>

                    <label htmlFor="workshop_date">Date</label>
                    <input
                        type="date"
                        id="workshop_date"
                        name="workshop_date"
                        value={workshop_date}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="start_time">Start time</label>
                    <input
                        type="time"
                        id="start_time"
                        name="start_time"
                        value={start_time}
                        onChange={handleChange}
                        required
                    />

                    <label>Workshop duration</label>
                    <input
                        type="number"
                        id="duration_hours"
                        name="duration_hours"
                        value={duration_hours}
                        onChange={handleChange}
                        required

                    />

                    <label>Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={handleChange}
                        required

                    />

                    <label>City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={city}
                        onChange={handleChange}
                        required

                    />

                    <label>State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={state}
                        onChange={handleChange}
                        required

                    />

                    <label htmlFor="max_capacity">Max Capacity</label>
                    <input
                        type="number"
                        id="max_capacity"
                        name="max_capacity"
                        value={max_capacity}
                        onChange={handleChange}
                        min="1"
                        required
                    />

                    <label>Materials included</label>
                    <textarea
                        id="materials_included"
                        name="materials_included"
                        value={materials_included}
                        onChange={handleChange}

                    />

                    <label>Materials to bring</label>
                    <textarea
                        id="materials_to_bring"
                        name="materials_to_bring"
                        value={materials_to_bring}
                        onChange={handleChange}

                    />

                    <label>Image</label>
                    <input
                        type="file"
                        id="image_url"
                        name="image_url"
                        accept='image/*'
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />

                </div>
                <div>
                     <button disabled={isFormInvalid()}>{workshopId? 'Edit Workshop' : 'New Workshop'}</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                </div>

            </form>
        </main>
    )
}

export default WorkshopForm 