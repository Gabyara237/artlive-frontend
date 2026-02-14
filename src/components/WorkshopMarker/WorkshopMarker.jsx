import { useEffect, useRef, useState} from "react"
import mapboxgl from 'mapbox-gl'
import { createPortal } from "react-dom"
import './WorkshopMarker.css'

import IconMosaic from "../icons/IconMosaic"
import IconCalligraphy from "../icons/IconCalligraphy"
import IconDrawing from '../icons/IconDrawing'
import IconPainting from '../icons/IconPainting'
import IconPottery from '../icons/IconPottery'
import IconSculpture from '../icons/IconSculpture'
import IconWoodCarving from '../icons/IconWoodCarving'


const IconByArtType ={
    watercolor_painting: IconPainting,
    oil_painting: IconPainting ,
    acrylic_painting: IconPainting,
    drawing: IconDrawing,
    charcoal_pastel_drawing: IconDrawing,
    ink_drawing_calligraphy: IconCalligraphy,
    mixed_media: IconPainting,
    ceramics_pottery: IconPottery,
    clay_sculpture: IconSculpture,
    wood_sculpture_carving: IconWoodCarving,
    mosaic_art: IconMosaic
}

const WorkshopMarker = ({ map, workshop }) => {

    const markerRef = useRef(null)
    const [portalContainer] = useState(() => document.createElement("div"))


    useEffect(() => {

        if (!map) return
        if (workshop?.longitude == null || workshop?.latitude == null) return

        markerRef.current?.remove()

        markerRef.current = new mapboxgl.Marker(portalContainer)
            .setLngLat([workshop.longitude, workshop.latitude])
            .addTo(map)

        return () => {
            markerRef.current.remove()
            markerRef.current = null
        }
    }, [map, workshop,  portalContainer])

    const Icon = IconByArtType[workshop.art_type]

    return createPortal(
        <button
            type="button"
            className={`marker marker-${workshop.art_type}`}
            title={workshop.title}
            >
            {Icon && <Icon className={'marker-icon icon-${workshop.art_type}'} />}
        </button>,
        portalContainer
    )
}

export default WorkshopMarker