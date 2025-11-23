'use client';

export function IconButton({
  children,
  onClick,
  className,
  withBorder = false,
  roundedBorder = false,
  borderColor = 'var(--color-white)',
  width = 20,
  height = 20
}: React.ComponentProps<'button'> & {
  withBorder?: boolean;
  roundedBorder?: boolean;
  borderColor?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div
      className="flex items-center justify-center cursor-pointer"
      style={
        withBorder
          ? {
              width: `${width}px`,
              height: `${height}px`,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor,
              borderRadius: roundedBorder ? 'calc(infinity * 1px)' : undefined
            }
          : undefined
      }
    >
      <button onClick={onClick} className={`cursor-pointer ${className ?? ''}`}>
        {children}
      </button>
    </div>
  );
}
