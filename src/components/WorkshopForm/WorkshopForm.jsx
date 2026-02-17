import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import * as workshopService from '../../services/workshopService'

import './WorkshopForm.css'
import IconCamara from "../icons/IconCamara"

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
            data.append('image', imageFile)
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
        <main className="container-workshop">
            <h1> {workshopId? 'Edit Workshop' : 'New Workshop'}</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit} className="container-form" >
                <div className="form-fields form-workshop">

                    <div className="left-side">
                        <div className="form-card">
                            <div className="form-field">

                                <label htmlFor="title" className="label">Workshop Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="description" className="label">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                />

                            </div>
                            <div className="form-fields-2">

                                <div className="form-field">
                                    <label htmlFor="art_type" className="label">Workshop Category</label>
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

                                </div>
                                <div className="form-field">
                                    <label htmlFor="level" className="label">Workshop Level</label>
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

                                </div>
                                <div className="form-field">
                                    <label htmlFor="max_capacity" className="label">Max Capacity</label>
                                    <input
                                        type="number"
                                        id="max_capacity"
                                        name="max_capacity"
                                        value={max_capacity}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />
                                        
                                    </div>
                            </div>

                        </div>
                        <div className="form-card">

                            <div className="form-fields-3">

                                <div className="form-field">
                                    <label htmlFor="workshop_date" className="label">Date</label>
                                    <input
                                        type="date"
                                        id="workshop_date"
                                        name="workshop_date"
                                        value={workshop_date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="start_time" className="label">Start time</label>
                                    <input
                                        type="time"
                                        id="start_time"
                                        name="start_time"
                                        value={start_time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="duration_hours" className="label">Workshop duration</label>
                                    <input
                                        type="number"
                                        id="duration_hours"
                                        name="duration_hours"
                                        value={duration_hours}
                                        onChange={handleChange}
                                        required

                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-card">
                            <div className="form-fields-3">

                                <div className="form-field">

                                    <label htmlFor="address" className="label" >Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={address}
                                        onChange={handleChange}
                                        required

                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="city" className="label">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={city}
                                        onChange={handleChange}
                                        required

                                    />
                                    
                                </div>
                                <div className="form-field">
                                    <label htmlFor="state" className="label">State</label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={state}
                                        onChange={handleChange}
                                        required

                                    />

                                </div>
                            </div>
                            
                        </div>

                        <div className="form-card">
                            <div className="form-field">

                                <label htmlFor="materials_included"  className="label">Materials included</label>
                                <textarea
                                    id="materials_included"
                                    name="materials_included"
                                    value={materials_included}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="materials_to_bring" className="label">Materials to bring</label>
                                <textarea
                                    id="materials_to_bring"
                                    name="materials_to_bring"
                                    value={materials_to_bring}
                                    onChange={handleChange}

                                />   
                            </div>
                        </div>

                    </div>
                    <div className="right-side">
                        <div className="form-card">
                            <div className="form-field">
                                <label htmlFor="image_url" className="label">Cover image</label>
                                <input
                                    type="file"
                                    id="image_url"
                                    name="image_url"
                                    accept="image/*"
                                    className="file-input"
                                    onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) setImageFile(file)
                                    }}
                                />
                                <label htmlFor="image_url" className="upload-card">
                                    <IconCamara className="upload-icon" />

                                    <div className="upload-text">
                                        <p className="upload-title">Upload photo</p>
                                        <p className="upload-help">
                                            Use a bright photo of the final <br /> artwork or the studio vibe.
                                        </p>
                                    </div>

                                    <span className="upload-button">Upload Photo</span>
                                </label>

                                {imageFile && <p className="file-name">Selected: {imageFile.name}</p>}
                            </div>

                        </div>


                         

                    </div>
                    
                </div>

                <div className="form-actions">
                     <button className="submit-button"disabled={isFormInvalid()}>{workshopId? 'Edit Workshop' : 'New Workshop'}</button>
                    <button className="cancel-button" onClick={() => navigate('/')}>Cancel</button>
                </div>

            </form>
        </main>
    )
}

export default WorkshopForm 