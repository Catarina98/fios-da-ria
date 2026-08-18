export enum LabelVariant {
  Primary = 'primary',
  Secondary = 'secondary',
}

export type LabelType = {
  text: string;
  variant?: LabelVariant;
};
