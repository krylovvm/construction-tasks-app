import L from 'leaflet'

interface MarkerProps {
  active?: boolean
  text?: string
}

export const Marker = ({ active = false, text = '' }: MarkerProps) => {
  const size = 32

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="${active ? 'bg-blue-500' : 'bg-red-500'} border-2 border-white shadow-md flex items-center justify-center relative"
           style="width: ${size}px; height: ${size}px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg)">
        <div class="text-white font-bold text-sm absolute w-full text-center"
             style="transform: rotate(45deg)">
          ${text}
        </div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  })
}
