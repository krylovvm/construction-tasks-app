export interface Task {
  id: string
  planId: string
  title: string
  x: number // Leaflet CRS.Simple coordinates
  y: number
  createdAt: number
  updatedAt: number
}
