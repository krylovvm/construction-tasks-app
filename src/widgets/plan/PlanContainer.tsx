import { useRef, useEffect, useState } from 'react'
import L, { LatLngExpression, LeafletMouseEvent } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTaskStore } from '@/entities/task'
import { useChecklistStore } from '@/entities/checklist'
import { Marker } from '@/shared/ui'
import { Plan } from '@/entities/plan'
import { getMarkerText } from '@/shared/lib/'

interface PlanContainerProps {
  plan: Plan
}

export const PlanContainer = ({ plan }: PlanContainerProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapReady, setMapReady] = useState(false)
  const leafletMapRef = useRef<L.Map | null>(null)
  const [mapHeight, setMapHeight] = useState(800)
  const { tasks, addTask, setActiveTask, fetchTasks, activeTaskId } = useTaskStore()
  const { addChecklist } = useChecklistStore()

  // Calculate map height based on viewport
  useEffect(() => {
    const calculateHeight = () => {
      const offset = 200
      const calculatedHeight = window.innerHeight - offset

      setMapHeight(Math.max(500, calculatedHeight))
    }

    calculateHeight()
    window.addEventListener('resize', calculateHeight)

    return () => {
      window.removeEventListener('resize', calculateHeight)
    }
  }, [])

  useEffect(() => {
    fetchTasks(plan.id)
  }, [fetchTasks, plan.id])

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return

    const initMap = () => {
      if (leafletMapRef.current) return

      const img = new window.Image()
      img.src = plan.image

      img.onload = () => {
        if (leafletMapRef.current) return

        const w = img.width
        const h = img.height

        const map = L.map(mapRef.current!, {
          crs: L.CRS.Simple,
          minZoom: -2,
          maxZoom: 2,
          zoom: 0,
          center: [h / 2, w / 2] as LatLngExpression,
          attributionControl: false,
        })

        leafletMapRef.current = map

        const bounds: L.LatLngBoundsLiteral = [
          [0, 0],
          [h, w],
        ]

        L.imageOverlay(plan.image, bounds).addTo(map)
        map.fitBounds(bounds)

        // Add marker on click
        map.on('click', async (e: LeafletMouseEvent) => {
          const { lat, lng } = e.latlng

          const task = await addTask({
            planId: plan.id,
            title: 'New Task',
            x: lng,
            y: lat,
          })

          addChecklist(task.id, 'New Task Checklist')
        })

        setMapReady(true)
      }

      img.onerror = () => {
        console.error('Failed to load plan image')
      }
    }

    initMap()

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
        setMapReady(false)
      }
    }
  }, [plan.image, plan.id, addTask, addChecklist])

  // Update markers
  useEffect(() => {
    const map = leafletMapRef.current
    if (!map || !mapReady) return

    // Remove old markers
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) map.removeLayer(layer)
    })

    // Add markers for tasks
    tasks
      .filter(t => t.planId === plan.id)
      .forEach(task => {
        const marker = L.marker([task.y, task.x], {
          icon: Marker({ active: task.id === activeTaskId, text: getMarkerText(task.title) }),
        }).addTo(map)
        marker.on('click', () => {
          setActiveTask(task.id)
        })
      })
  }, [tasks, plan.id, activeTaskId, setActiveTask, mapReady])

  return <div className="w-full rounded shadow" ref={mapRef} style={{ height: `${mapHeight}px` }} />
}
