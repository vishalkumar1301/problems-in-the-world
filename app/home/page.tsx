"use client"

import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
})

const HomePage = () => {
  return (
    <div className="container mx-auto mt-16">
      <MapComponent />
    </div>
  )
}

export default HomePage