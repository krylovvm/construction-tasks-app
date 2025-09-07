import L from 'leaflet'

interface Props {
  active?: boolean
}

export const Marker = ({ active }: Props) =>
  L.divIcon({
    className: `custom-marker ${active ? 'bg-blue-500' : 'bg-gray-700'}`,
    html: `<div style="width:24px;height:24px;border-radius:50%;background:${active ? '#3b82f6' : '#374151'};border:2px solid white"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
