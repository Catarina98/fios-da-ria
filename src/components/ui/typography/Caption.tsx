import { type CaptionProps, typographyClassName } from '@typing/components';
import { cn } from '@utils/cn';

const sizeClassName = typographyClassName.caption;

const Caption = ({ children, className, ...rest }: CaptionProps) => {
  return (
    <span className={cn(sizeClassName, className)} {...rest}>
      {children}
    </span>
  );
};

export default Caption;
