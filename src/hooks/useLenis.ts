"use client";

import { useContext } from "react";
import { LenisContext } from "@/components/layout/LenisProvider";

export function useLenis() {
  return useContext(LenisContext);
}
