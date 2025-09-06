import {FC} from 'react';

interface Props {
  src: string;
  alt?: string;
}

export const Thumbnail: FC<Props> = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-24 h-24 object-cover rounded border" />
);
