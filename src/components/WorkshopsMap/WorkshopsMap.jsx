import {useEffect,useState, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import './workshopsMap.css'

import WorkshopMarker from '../WorkshopMarker/WorkshopMarker'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

const INITIAL_CENTER = [ -122.2730, 37.8715]
const INITIAL_ZOOM = 13

const WorkshopsMap = ({workshops}) => {

  const mapRef = useRef(null)
  const mapContainerRef = useRef(null)

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapMoved, setMapMoved] = useState(false)


  
  useEffect(() => {
    if (mapRef.current) return

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM
    });
    
    mapRef.current = map
    
    map.on("load", () => {
      setMapInstance(map)
    })

    map.on('move', () => {

      const mapCenter = map.getCenter()
      const mapZoom = map.getZoom()

      setCenter([ mapCenter.lng, mapCenter.lat ])
      setZoom(mapZoom)
      setMapMoved(true)
    })

    return () => {
        mapRef.current?.remove()
        mapRef.current = null
      }
  }, [])

  const workshopCenter = (mapInstance,workshops) =>{
        if (workshops.length === 1) {
      const workshop = workshops[0]

      mapInstance.flyTo({
        center: [Number(workshop.longitude), Number(workshop.latitude)],
        zoom: 14, 
      })
      return
    }

    const bounds = new mapboxgl.LngLatBounds()

    workshops.forEach((workshop) => {
      bounds.extend([Number(workshop.longitude), Number(workshop.latitude)])
    
    })

    mapInstance.fitBounds(bounds,{padding:50})
  }

  useEffect(() => {
    if (!mapInstance) return
    if (!workshops?.length) return


    workshopCenter(mapInstance,workshops)

  }, [mapInstance, workshops])


  const handleButtonClick = () => {
    if (!mapInstance) return

      if (!workshops?.length) {
        mapInstance.flyTo({
          center: INITIAL_CENTER,
          zoom: INITIAL_ZOOM
        })
        return
      }

      workshopCenter(mapInstance,workshops)
  }

  return (
    <>
      <div className="sidebar">
          Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
      </div>
      
      {mapMoved && (<button className='reset-button' onClick={handleButtonClick}>
        Reset
      </button>)}

      <div ref={mapContainerRef} style={{ height: "85%", width: "100%", backgroundColor: "lightgrey",borderRadius: "18px"}}/>
      {mapInstance && workshops?.map((workshop)=>{
        return(
          <WorkshopMarker key={workshop.id} map={mapInstance} workshop={workshop} />
        )
      })}
      


  </>
  )
}

export default WorkshopsMap