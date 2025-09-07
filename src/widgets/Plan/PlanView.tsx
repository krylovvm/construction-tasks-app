import { FC, useRef, useEffect } from 'react'
import L, { LatLngExpression, LeafletMouseEvent } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTaskStore } from '@/entities/task'
import { Marker } from '@/shared/ui'

interface Props {
  planImage: string
  planId: string
  activeTaskId?: string
  onTaskSelect?: (taskId: string) => void
}

export const PlanView: FC<Props> = ({ planImage, planId, activeTaskId, onTaskSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<L.Map | null>(null)
  const { tasks, addTask, setActiveTask } = useTaskStore()

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return

    // Image size for CRS.Simple
    const img = new window.Image()
    img.src = planImage
    img.onload = () => {
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
      L.imageOverlay(planImage, bounds).addTo(map)
      map.fitBounds(bounds)

      // Add marker on click
      map.on('click', (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng
        const title = prompt('Enter task title:')
        if (title) {
          addTask({
            planId,
            title,
            status: 'new',
            x: lng,
            y: lat,
          })
        }
      })
    }
  }, [planImage, planId, addTask])

  useEffect(() => {
    const map = leafletMapRef.current
    if (!map) return

    // Remove old markers
    map.eachLayer(layer => {
      if ((layer as any).options?.icon) map.removeLayer(layer)
    })

    // Add markers for tasks
    tasks
      .filter(t => t.planId === planId)
      .forEach(task => {
        const marker = L.marker([task.y, task.x], {
          icon: Marker({ active: task.id === activeTaskId }),
        }).addTo(map)
        marker.on('click', () => {
          setActiveTask(task.id)
          onTaskSelect?.(task.id)
        })
      })
  }, [tasks, planId, activeTaskId, setActiveTask, onTaskSelect])

  return <div ref={mapRef} className="w-full h-[500px] rounded shadow" />
}
