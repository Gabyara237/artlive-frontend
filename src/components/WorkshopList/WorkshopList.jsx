const WorkshopList = ({workshops}) =>{

    return(
        <main>
            {workshops.map((workshop)=>(

                <div key={workshop.id} className="card-container">
                    <div>
                        <h2>{workshop.title}</h2>
                    </div>
                    <div>
                        <p>{workshop.art_type}</p>
                        <p>{workshop.level}</p>
                        <p>{workshop.date}</p>
                        <p>{workshop.start_time}</p>
                    </div>
                </div>

            ))}   
        </main>
    )

}

export default WorkshopList

