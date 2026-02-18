import { useState } from "react";
import "./Tabs.css";

const Tabs = ({workshop}) => {
    const [activeTab, setActiveTab] = useState("description"); 

    const instructorName = workshop.instructor_full_name?.trim() || workshop.instructor_username;
    const instructorAvatar =workshop.instructor_profile_image?.trim() || workshop.image_url;
    const firstName = (instructorName || "Instructor").split(/\s+/)[0];

    return (
        <div className="tabs-card">
            <div className="tabs-header">
                <button 
                    className={`tab-button ${activeTab ==="description" ? "active": ""}`}
                    onClick={() => setActiveTab("description")}
                    type="button"
                >
                    Description
                </button>

                <button
                    className={`tab-button ${activeTab ==="included-materials" ?"active" :""}`}
                    onClick={() => setActiveTab("included-materials")}
                    type="button"
                >
                    Included materials
                </button>

                <button
                    className={`tab-button ${activeTab ==="materials-to-bring"? "active" : ""}`}
                    onClick={() => setActiveTab("materials-to-bring")}
                    type="button"
                >
                    Materials to bring
                </button>

                <button
                    className={`tab-button ${activeTab === "instructor"? "active":""}`}
                    onClick={() => setActiveTab("instructor")}
                    type="button"
                >
                    Instructor
                </button>
            </div>

            <div className="tabs-body">
                {activeTab ==="description" &&(
                    <div className="tab-panel">
                        <p className="tab-text">{workshop.description}</p>
                    </div>
                )}

                {activeTab ==="included-materials" &&(
                    <div className="tab-panel">
                        {!workshop.materials_included?.trim() ? <p className="tab-text">Materials are not included for this workshop. Be sure to check the “Materials to Bring” section so you can come prepared.</p>: <p className="tab-text">{workshop.materials_included}</p>}
                    </div>
                )}

                {activeTab === "materials-to-bring" &&(
                    <div className="tab-panel">
                        {!workshop.materials_to_bring?.trim()?(
                            <p className="tab-text">No materials are required to bring, just come ready to create something beautiful.</p>
                        ):(
                            <p className="tab-text">{workshop.materials_to_bring}</p>
                        )}
                    </div>
                )}


                {activeTab === "instructor" && (
                    <div className="tab-panel">
                        <div className="container-instructor-info">
                            <img className="instructor-avatar" src={instructorAvatar} alt={instructorName || "Instructor"}/>

                            <div className="instructor-info">
                                <h3 className="instructor-name">{instructorName}</h3>

                                {workshop.instructor_bio?.trim() &&(
                                    <p className="instructor-bio">{workshop.instructor_bio}</p>
                                )}

                                {Array.isArray(workshop.instructor_specialties) &&
                                    workshop.instructor_specialties.length > 0 &&(
                                        <div className="instructor-specialties">
                                            {workshop.instructor_specialties.map((specialty) =>(
                                                <span key={specialty} className="instructor-specialty">
                                                    {specialty}
                                                </span>
                                            ))}
                                        </div>)
                                }

                                <button className="button-more" type="button">
                                    More classes by {firstName}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tabs;
