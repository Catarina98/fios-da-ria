export type MediaDisplayType = {
  images: string[];
  activeIndex?: number;
  showFullScreen?: boolean;
  onIndexChange?: (index: number) => void;
  onToggleFullScreen?: (show: boolean) => void;
};
