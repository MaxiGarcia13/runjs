import { cn } from '@maxigarcia/js-utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={
        cn(
          'border border-gray-700 p-2 rounded-md text-sm flex items-center gap-2',
          !props.disabled
            ? 'cursor-pointer hover:bg-gray-700 transition-colors'
            : 'opacity-50 cursor-not-allowed hover:bg-transparent',
          className,
        )
      }
      {...props}
    >
      {children}
    </button>
  );
}
