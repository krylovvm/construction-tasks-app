import { FC, ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Button: FC<ButtonProps> = ({ children, ...props }) => (
  <button
    type="button"
    className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    {...props}
  >
    {children}
  </button>
)
