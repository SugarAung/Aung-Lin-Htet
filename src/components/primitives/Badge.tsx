import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-mono tracking-wider uppercase",
        "border border-border text-muted-foreground",
        "rounded-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
