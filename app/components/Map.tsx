// 'use client'
// import mapboxgl from 'mapbox-gl'
// import { useEffect, useRef } from 'react'

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

// export default function Map({ incidents }: any ) {
//     const mapref = useRef<any>(null)

//     useEffect(() => {
//         const map = new mapboxgl.Map({
//             container: mapref.current,
//             style: 'mapbox://styles/mapbox/dark-v11',
//             center: [139.7, 35.6],
//             zoom: 10
//         })

//         incidents.forEach((i: any) => {
//             new mapboxgl.Marker()
//                 .setLngLat([i.lng, i.lat])
//                 .addTo(map)
//         })
//     }, [incidents])

//     return <div ref={mapref} style={{ height: '100vh' }} />
// }

