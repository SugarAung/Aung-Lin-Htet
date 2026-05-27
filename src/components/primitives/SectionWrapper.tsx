import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "surface" | "flush";
}

export default function SectionWrapper({
  children,
  className,
  id,
  variant = "default",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 md:py-32 lg:py-40",
        variant === "surface" && "bg-surface",
        variant === "flush" && "py-0",
        className
      )}
    >
      {children}
    </section>
  );
}
