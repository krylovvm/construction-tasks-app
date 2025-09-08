import { useRef, useEffect, useState } from 'react'
import L, { LatLngExpression, LeafletMouseEvent } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTaskStore } from '@/entities/task'
import { Marker } from '@/shared/ui'
import { Plan } from '@/entities/plan'

interface PlanContainerProps {
  plan: Plan
  activeTaskId?: string
  onTaskSelect?: (taskId: string) => void
}

export const PlanContainer = ({ plan, activeTaskId, onTaskSelect }: PlanContainerProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<L.Map | null>(null)
  const [mapInitialized, setMapInitialized] = useState(false)
  const [mapHeight, setMapHeight] = useState(800)
  const { tasks, addTask, setActiveTask, fetchTasks } = useTaskStore()

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

  // Cleanup map when component unmounts
  useEffect(() => {
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove() // Remove map on unmount
        leafletMapRef.current = null

        setMapInitialized(false)
      }
    }
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current || mapInitialized) return

    // Image size for CRS.Simple
    const img = new window.Image()
    img.src = plan.image
    img.onload = () => {
      if (leafletMapRef.current) return // Additional safety check

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
      setMapInitialized(true)

      const bounds: L.LatLngBoundsLiteral = [
        [0, 0],
        [h, w],
      ]

      L.imageOverlay(plan.image, bounds).addTo(map)
      map.fitBounds(bounds)

      // Add marker on click
      map.on('click', (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng
        const title = prompt('Enter task title:')
        if (title) {
          addTask({
            planId: plan.id,
            title,
            status: 'new',
            x: lng,
            y: lat,
          })
        }
      })
    }
  }, [plan.image, plan.id, addTask, mapInitialized])

  // Update markers
  useEffect(() => {
    const map = leafletMapRef.current
    if (!map) return

    // Remove old markers
    map.eachLayer(layer => {
      if ((layer as any).options?.icon) map.removeLayer(layer)
    })

    // Add markers for tasks
    tasks
      .filter(t => t.planId === plan.id)
      .forEach(task => {
        const marker = L.marker([task.y, task.x], {
          icon: Marker({ active: task.id === activeTaskId }),
        }).addTo(map)
        marker.on('click', () => {
          setActiveTask(task.id)
          onTaskSelect?.(task.id)
        })
      })
  }, [tasks, plan.id, activeTaskId, setActiveTask, onTaskSelect])

  return <div className="w-full rounded shadow" ref={mapRef} style={{ height: `${mapHeight}px` }} />
}
