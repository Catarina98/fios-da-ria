import { type BodyProps, typographyClassName } from '@typing/components';
import { cn } from '@utils/cn';

const sizeClassName = typographyClassName.body;

const Body = ({ size, children, className, ...rest }: BodyProps) => {
  return (
    <p className={cn(sizeClassName[size], className)} {...rest}>
      {children}
    </p>
  );
};

export default Body;
