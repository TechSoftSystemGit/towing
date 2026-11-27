"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export default function ServicesMenu({ children }: { children: ReactNode }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && menu.current?.open && !menu.current.contains(event.target)) menu.current.open = false;
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return <details className="services-menu" name="header-dropdown" ref={menu} onKeyDown={event => {
    if (event.key !== "Escape" || !menu.current?.open) return;
    event.preventDefault();
    menu.current.open = false;
    trigger.current?.focus();
  }}>
    <summary ref={trigger}>Services<ChevronDown aria-hidden="true"/></summary>
    <div className="services-menu-panel">{children}</div>
  </details>;
}
