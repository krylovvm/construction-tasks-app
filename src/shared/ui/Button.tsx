import { FC, ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-orange-500 hover:bg-orange-600 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
}

export const Button: FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => (
  <button
    type="button"
    className={`px-4 py-2 rounded transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]}`}
    {...props}
  >
    {children}
  </button>
)
