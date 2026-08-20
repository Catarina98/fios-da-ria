export enum TitleSectionAlign {
  Left = 'left',
  Center = 'center',
}

export enum TitleSectionSize {
  Small = 'sm',
  Medium = 'md',
}

export enum TitleSectionColor {
  Primary = 'primary',
  Secondary = 'secondary',
}

export type TitleSectionType = {
  title: string;
  subtitle?: string;
  align?: TitleSectionAlign;
  titleSize?: TitleSectionSize;
  titleColor?: TitleSectionColor;
};
