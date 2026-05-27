import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  const C = Tag as React.ComponentType<{ className?: string; children?: React.ReactNode }>;
  return (
    <C
      className={cn(
        "w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16",
        className
      )}
    >
      {children}
    </C>
  );
}
