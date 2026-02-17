import { Link } from "react-router"
import { useMemo, useState } from "react";
import WorkshopsMap from "../WorkshopsMap/WorkshopsMap"
import './WorkshopList.css'
import CardWorkshop from "../CardWorkshop/CardWorkshop"
import WorkshopsFilters from "../WorkshopsFilters/WorkshopsFilters"

const initialFilters={
    query: "", 
    art_type: "all", 
    level: "all"
}

const WorkshopList = ({workshops}) =>{
    const [filters, setFilters] = useState(initialFilters);

    const filteredWorkshops = useMemo(() => {
        const query = filters.query.trim().toLowerCase();

        return workshops.filter((workshop) => {
            const matchesQuery =
                !query ||
                workshop.title?.toLowerCase().includes(query) ||
                workshop.instructor_username?.toLowerCase().includes(query);

            const matchesArt =filters.art_type === "all" || workshop.art_type ===filters.art_type;

            const matchesLevel =filters.level === "all" || workshop.level ===filters.level;

            return matchesQuery && matchesArt && matchesLevel;
        });
    }, [workshops, filters]);

    return(
        <main>
            <WorkshopsFilters filters={filters} onChange={setFilters} onReset={() => setFilters(initialFilters)}/>
            <div className="container-workshop-list">
                <div className="workshop-list">
                    {filteredWorkshops.length>0?

                        (filteredWorkshops.map((workshop) => (
                            <Link key={workshop.id} className="card-container" to={`/workshops/${workshop.id}`}>
                                <CardWorkshop
                                    instructor={workshop.instructor_username}
                                    image={workshop.image_url}
                                    title={workshop.title}
                                    art_type={workshop.art_type}
                                    level={workshop.level}
                                    workshop_date={workshop.workshop_date}
                                    start_time={workshop.start_time}
                                    />
                            </Link>
                        ))
                        ):(
                        <div>
                            <h2>No workshop yet for this category</h2>
                        </div>)
                    }
                </div>
                <div className="workshop-map">
                    <WorkshopsMap workshops={filteredWorkshops} />  

                </div>

            </div>
        </main>
    )

}

export default WorkshopList

