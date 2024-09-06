"use client"

import React, { useEffect, useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

const MapComponent = () => {
  const [geoData, setGeoData] = useState(null)

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

  return (
    <div className="w-full h-[calc(100vh-4rem)] border border-gray-300 overflow-hidden">
      <ComposableMap projection="geoMercator">
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography 
                key={geo.rsmKey} 
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}

export default MapComponent