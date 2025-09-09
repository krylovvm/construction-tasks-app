import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => (
  <div>
    {label && <label className="block text-sm mb-1">{label}</label>}
    <input className="border rounded px-2 py-1 w-full" {...props} ref={ref} />
  </div>
))

Input.displayName = 'Input'
