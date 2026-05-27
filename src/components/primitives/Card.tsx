"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className, onClick }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-sm bg-surface border border-border",
        "hover:border-foreground/20 transition-colors duration-300",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
