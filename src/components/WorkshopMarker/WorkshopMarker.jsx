import { useEffect, useRef } from "react"
import mapboxgl from 'mapbox-gl'


const WorkshopMarker = ({ map, workshop }) => {

    const markerRef = useRef(null)

    useEffect(() => {
        if (!map) return
        if (workshop?.longitude == null || workshop?.latitude == null) return

        markerRef.current?.remove()

        markerRef.current = new mapboxgl.Marker()
            .setLngLat([workshop.longitude, workshop.latitude])
            .addTo(map)

        return () => {
            markerRef.current.remove()
            markerRef.current = null
        }
    }, [map, workshop])

    return null
}

export default WorkshopMarker