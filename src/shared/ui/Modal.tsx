import { FC, useEffect, useRef, ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)

    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-999 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div ref={overlayRef} className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="bg-white rounded shadow-lg p-6 min-w-[300px] relative z-10"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4.5 right-3 w-8 h-8 flex items-center justify-center rounded-full  text-gray-500 hover:bg-gray-200 hover:shadow-lg hover:text-gray-700 transition cursor-pointer"
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          <span className="text-xl font-bold">&times;</span>
        </button>
        {title && <div className="font-bold text-lg mb-4">{title}</div>}
        {children}
      </div>
    </div>
  )
}
