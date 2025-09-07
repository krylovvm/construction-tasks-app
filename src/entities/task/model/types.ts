export interface Task {
  id: string
  planId: string
  title: string
  status: 'new' | 'in-progress' | 'done'
  x: number // Leaflet CRS.Simple coordinates
  y: number
  createdAt: number
  updatedAt: number
}
