import { FC } from 'react';

interface Props {
  label?: string;
  value: string | null;
  onChange: (base64: string | null) => void;
}

export const ImageUpload: FC<Props> = ({ label, value, onChange }) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {label && <label className="block text-sm mb-1">{label}</label>}
      <input type="file" accept="image/*" onChange={handleFile} />
      {value && <img src={value} alt="preview" className="mt-2 max-h-32 rounded border" />}
    </div>
  );
};
