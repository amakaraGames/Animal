'use client'
import maplibregl from 'maplibre-gl'
import { useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<maplibregl.Map | null>(null)

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapRef.current!,
            style: 'https://demotiles.maplibre.org/style.json',
            center: [139.6917, 35.6895],
            zoom: 8
        })
        mapInstanceRef.current = map

        map.on('click', async (e) => {
            await supabase.from('report').insert({
                lat: e.lngLat.lat,
                lng: e.lngLat.lng,
                animal: 'deer',
            })
            alert('投稿しました')
        })

        return () => {
            map.remove()
        }
    }, [])

    return <div ref={mapRef} style={{ width: '100vw', height: '100vh' }}></div>
}