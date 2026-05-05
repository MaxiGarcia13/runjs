export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="border border-gray-700 p-2 rounded-md text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-700 transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}
