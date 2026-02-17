import formatDateTime from '../../utils/formatDateTime'
const CardWorkshop =({image,title,instructor,workshop_date,start_time,art_type,level})=>{
    return(
        <div className="container-card">
            <img className="container-img-card" src={image} alt={title} />

            <div className="container-info-card">
                <h3 className="card-title">{title}</h3>
                <p className="p-card">{instructor}</p>
                <p className="p-card">{formatDateTime(workshop_date, start_time)}</p>

                <div className="container-tags">
                    <span className="container-tag">{art_type}</span>
                    <div className="container-tag" >{level}</div>
                </div>
            </div>
        </div>
    )
}

export default CardWorkshop