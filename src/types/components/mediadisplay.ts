export type MediaDisplayType = {
  images: string[];
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
};
