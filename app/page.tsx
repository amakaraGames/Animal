'use client'
import { useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadMap = () => {
      const map = new (window as any).google.maps.Map(mapRef.current!, {
        center: { lat: 37, lng: 138 }, // 日本
        zoom: 5,
        restriction: {
          latLngBounds: {
            north: 46,
            south: 20,
            west: 122,
            east: 154,
          },
          strictBounds: true,
        },
      })

      // 既存データを読み込んでピン表示
      const loadReports = async () => {
        const { data } = await supabase.from('reports').select('*')
        data?.forEach(r => {
          new (window as any).google.maps.Marker({
            position: { lat: r.lat, lng: r.lng },
            map,
          })
        })
      }

      loadReports()

      // クリックで投稿
      map.addListener('click', async (e: any) => {
        const { data } = await supabase.from('reports').insert({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          animal: 'deer',
        }).select().single()

        if (data) {
          new (window as any).google.maps.Marker({
            position: { lat: data.lat, lng: data.lng },
            map,
          })
        }
      })
    }

    // Google Maps API読み込み
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    script.async = true
    script.onload = loadMap
    document.head.appendChild(script)
  }, [])

  return <div ref={mapRef} style={{ width: '100vw', height: '100vh' }} />
}