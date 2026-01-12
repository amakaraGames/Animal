'use client'
import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapRef.current!,
      style: 'https://gsi-cyberjapan.github.io/gsivectortile-mapbox-gl-js/std.json',
      center: [138, 37],
      zoom: 5,
      maxBounds: [[122, 20], [154, 46]]
    })

    // 既存データを読み込んでピン表示
    const loadReports = async () => {
      const { data } = await supabase.from('reports').select('*')
      data?.forEach(r => {
        new maplibregl.Marker({ color: 'red' })
          .setLngLat([r.lng, r.lat])
          .addTo(map)
      })
    }

    map.on('load', loadReports)

    // クリックで投稿
    map.on('click', async (e) => {
      const { data } = await supabase.from('reports').insert({
        lat: e.lngLat.lat,
        lng: e.lngLat.lng,
        animal: 'deer',
      }).select().single()

      if (data) {
        new maplibregl.Marker({ color: 'red' })
          .setLngLat([data.lng, data.lat])
          .addTo(map)
      }
    })

    return () => map.remove()
  }, [])

  return <div ref={mapRef} style={{ width: '100vw', height: '100vh' }} />
}