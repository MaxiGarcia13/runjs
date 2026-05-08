interface ContextMenuItemProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  command?: React.ReactNode;
}

export function ContextMenuItem({ onClick, children, icon, command }: ContextMenuItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      className="flex w-full cursor-pointer items-center gap-2 px-2 py-2 text-left text-sm text-inherit transition-colors hover:bg-zinc-800"
      onClick={onClick}
    >
      {
        icon && (
          <span className="shrink-0">
            {icon}
          </span>
        )
      }
      <span className="flex-1">
        {children}
      </span>
      {
        command && (
          <span className="shrink-0">
            {command}
          </span>
        )
      }
    </button>
  );
}
