export function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button className="border border-gray-700 p-2 rounded-md flex items-center gap-2 cursor-pointer hover:bg-gray-700 transition-colors" onClick={onClick}>
      {children}
    </button>
  );
}
