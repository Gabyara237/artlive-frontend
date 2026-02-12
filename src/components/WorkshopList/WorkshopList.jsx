import { Link } from "react-router"

const WorkshopList = ({workshops}) =>{

    return(
        <main>
            {workshops.map((workshop)=>(

                <Link key={workshop.id} className="card-container" to={`/workshops/${workshop.id}`}>
                    <div>
                        <h2>{workshop.title}</h2>
                    </div>
                    <div>
                        <p>{workshop.art_type}</p>
                        <p>{workshop.level}</p>
                        <p>{workshop.workshop_date}</p>
                        <p>{workshop.start_time}</p>
                    </div>
                </Link>

            ))}   
        </main>
    )

}

export default WorkshopList

