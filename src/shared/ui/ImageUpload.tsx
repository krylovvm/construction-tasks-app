import { FC, useRef, useState } from 'react'

interface ImageUploadProps {
  label?: string
  value: string | null
  onChange: (base64: string | null) => void
}

export const ImageUpload: FC<ImageUploadProps> = ({ label, value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  const handleFile = (file?: File) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(true)
  }

  const handleDragLeave = () => setIsDragActive(false)

  return (
    <div>
      {label && <label className="block text-sm mb-1">{label}</label>}
      <div
        className={`flex flex-col items-center justify-center min-h-25 border-2 border-dashed rounded cursor-pointer transition
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
          py-6`}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        tabIndex={0}
        role="button"
        aria-label="Upload image"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => handleFile(e.target.files?.[0])}
        />
        <span className="text-gray-500 px-4 text-center w-70">
          {isDragActive
            ? 'Drop image here...'
            : value
              ? 'Change image'
              : 'Click or drag image here to upload'}
        </span>
        {value && <img src={value} alt="preview" className="mt-4 max-h-32 rounded border" />}
      </div>
    </div>
  )
}
