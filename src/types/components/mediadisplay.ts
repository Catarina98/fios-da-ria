export interface MediaDisplayProps {
  images: string[];
  selectedIndex?: number;
  onSelectImage?: (index: number) => void;
  alt?: string;
  className?: string;
}
