import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import * as workshopService from "../../services/workshopService";


import "./WorkshopRegistrations.css";

const getInitials = (nameOrUsername = "") => {
    const clean = nameOrUsername.trim();
    if (!clean) return "A";
    const parts = clean.split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("");
};

const WorkshopRegistration = () => {
    const { workshopId } = useParams();

    const [workshopInfo, setWorkshopInfo] = useState(null);
    const [registrationsInfo, setRegistrationsInfo] = useState([]);
    const [error, setError] = useState("");

    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        const fetchWorkshopAndRegistrations = async ()=>{
            try {
                const {registrations,workshop} = await workshopService.getRegistrations(workshopId)
                
                setWorkshopInfo(workshop);
                setRegistrationsInfo(registrations || []);
                setError("")

            } catch (err) {
                setError(err.message);
            }
        }
        fetchWorkshopAndRegistrations();
    }, [workshopId]);

    const metrics = useMemo(() => {
        const total =registrationsInfo.length;
        const active =registrationsInfo.filter((registration) => registration.status === "active").length;
        const cancelled =registrationsInfo.filter((registration) => registration.status === "cancelled").length;
        return {total,active,cancelled};
    }, [registrationsInfo]);

    const filtered = useMemo(() => {
        const query2 = query.trim().toLowerCase();

        return registrationsInfo.filter((registration) => {
            const matchesStatus= statusFilter === "all" ? true :registration.status ===statusFilter;

            const haystack = [registration.full_name, registration.username,registration.email].filter(Boolean).join(" ").toLowerCase();

            const matchesQuery = query2 ? haystack.includes(query2) :true;

            return matchesStatus && matchesQuery;
        });
    }, [registrationsInfo, query,statusFilter]);

    if (!workshopInfo) return <main className="registrations-container">Loading...</main>;

    return (
        <main className="registrations-container">
            <div className="registrations-header">
                <div>
                    <div>
                        <h1 className="registrations-title">Registrations</h1>
                        <p className="registrations-subtitle">
                            {workshopInfo.title}
                        </p>
                    </div>
                </div>

                <div className="registrations-metrics">
                    <span className="span-metric metric-total">Total: {metrics.total}</span>
                    <span className="span-metric metric-active">Active: {metrics.active}</span>
                    <span className="span-metric metric-cancelled">Cancelled: {metrics.cancelled}</span>
                </div>

                <div className="registrations-toolbar">
                    <input
                        className="input-filter-search input-filter-registration"
                        placeholder="Search student name, username, or email..."
                        value={query}
                        onChange={(evt) => setQuery(evt.target.value)}
                    />

                    <select
                        className="input-filter-select"
                        value={statusFilter}
                        onChange={(evt) => setStatusFilter(evt.target.value)}
                    >
                        <option value="all">All statuses</option>
                        <option value="active">Active</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                        className="button-filter-reset"
                        type="button"
                        onClick={() => {
                        setQuery("");
                        setStatusFilter("all");
                        }}
                    >
                        Reset
                    </button>
                </div>

                {error && <p className="registrations-error">{error}</p>}
            </div>

            <div className="registrations-list">
                {filtered.length === 0 ?(
                    <div className="registrations-empty">
                        <h2>No registrations found</h2>
                        <p>Try adjusting your search or filters.</p>
                    </div>
                ):(
                    filtered.map((registration) => {
                        const displayName = (registration.full_name && registration.full_name.trim()) || registration.username ||"Student";
                        const initials = getInitials(displayName);

                        return (
                        <div key={registration.id} className="container-card">
                            <div className="registration-avatar" aria-hidden="true">
                                {initials}
                            </div>

                            <div className="registration-info-card">
                                <div className="registration-info-basic">
                                    <h3 className="registration-name">{displayName}</h3>

                                    <span className={`registration-status ${registration.status === "active" ? "isActive" :"isCancelled"}`}>
                                        {registration.status}
                                    </span>
                                </div>

                                <p className="registration-email">{registration.email}</p>
                                <p className="p-registration-info-dates">
                                    Registered:{" "}
                                    <span>
                                        {registration.registered_at ? new Date(registration.registered_at).toLocaleString(): "—"}
                                    </span>
                                    {registration.cancelled_at && (
                                        <>
                                            {"   "}•{"  "}
                                            Cancelled:{" "}
                                            <span >
                                                {new Date(registration.cancelled_at).toLocaleString()}
                                            </span>
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    );
                })
                )}
            </div>
        </main>
    );
};

export default WorkshopRegistration;
