import { InputHTMLAttributes, FC } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: FC<InputProps> = ({ label, ...props }) => (
  <div className="mb-2">
    {label && <label className="block text-sm mb-1">{label}</label>}
    <input className="border rounded px-2 py-1 w-full" {...props} />
  </div>
);
