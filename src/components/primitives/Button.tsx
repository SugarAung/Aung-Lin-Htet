"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
  magnetic?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  as?: "button" | "a";
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  className,
  variant = "primary",
  magnetic = false,
  onClick,
  type = "button",
  disabled,
  as = "button",
  href,
  download,
  target,
  rel,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const translateX = useTransform(springX, (v) => (magnetic ? v : 0));
  const translateY = useTransform(springY, (v) => (magnetic ? v : 0));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic) return;
    const el = buttonRef.current ?? anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2",
    "text-sm font-mono tracking-wider uppercase",
    "transition-colors duration-200 select-none",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:opacity-40 disabled:pointer-events-none",
    variant === "primary" && "bg-foreground text-background px-6 py-3 hover:bg-foreground/90",
    variant === "ghost" && "text-foreground/60 hover:text-foreground px-4 py-2",
    variant === "outline" && "border border-border text-foreground px-6 py-3 hover:border-foreground/40",
    className
  );

  const sharedMotionProps = {
    style: { x: translateX, y: translateY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileTap: { scale: 0.97 },
  };

  if (as === "a") {
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={baseStyles}
        {...sharedMotionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
      {...sharedMotionProps}
    >
      {children}
    </motion.button>
  );
}
