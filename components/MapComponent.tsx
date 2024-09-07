"use client"

import React, { useEffect, useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

const MapComponent = () => {
  const [geoData, setGeoData] = useState<any>(null)
  const [position, setPosition] = useState({ coordinates: [0, 0] as [number, number], zoom: 1 })
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  useEffect(() => {
    fetch(geoUrl)
      .then(response => response.json())
      .then(data => {
        console.log("Loaded geo data:", data)
        setGeoData(data)
      })
      .catch(error => console.error("Error loading geo data:", error))
  }, [])

  if (!geoData) {
    return <div>Loading map data...</div>
  }

  const handleZoom = (event: React.WheelEvent) => {
    if (event.deltaY < 0) {
      setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.2 }))
    } else {
      setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.2 }))
    }
  }

  return (
    <div className="w-full h-[calc(100vh-4rem)] border border-gray-300 overflow-hidden" onWheel={handleZoom}>
      <ComposableMap projection="geoMercator">
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={({ coordinates, zoom }) => setPosition({ coordinates: coordinates as [number, number], zoom })}
        >
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography 
                  key={geo.rsmKey} 
                  geography={geo}
                  fill={geo.rsmKey === selectedArea ? "#F53" : "#EAEAEC"}
                  stroke="#D6D6DA"
                  onClick={() => setSelectedArea(geo.rsmKey)}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      {selectedArea && <div>Selected area: {selectedArea}</div>}
    </div>
  )
}

export default MapComponent