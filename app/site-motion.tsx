"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const cardSelector = [
  ".featured-grid > article",
  ".assistance-layout > article",
  ".gallery-grid > article",
  ".extras-cards li",
  ".directory > section",
  ".service-facts li",
  ".footer > :is(div, nav)",
].join(", ");

const revealSelector = [
  "main > section:not(:is(.hero, .page-hero, .featured, .assistance, .service-gallery, .extras-cards, .service-facts))",
  "main > .section-compact",
  ".assistance-heading",
  ".service-gallery .gallery-heading",
  ".extras-cards-inner > h2",
  ".page-content > :is(section, .inline-contact)",
  ".footer-feature",
  cardSelector,
].join(", ");

export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let pending: HTMLElement[] = [];

    function clearReveal(element: HTMLElement) {
      delete element.dataset.reveal;
      element.style.removeProperty("--reveal-delay");
    }

    function reset() {
      observer?.disconnect();
      pending.forEach(clearReveal);
      pending = [];
    }

    function watchSections() {
      reset();
      if (preference.matches) return;

      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.dataset.reveal = "visible";
          observer?.unobserve(element);
        }
      }, { rootMargin: "0px 0px 4% 0px" });

      for (const element of document.querySelectorAll<HTMLElement>(revealSelector)) {
        if (element.getBoundingClientRect().top <= window.innerHeight + 12) continue;
        if (element.matches(cardSelector) && element.parentElement) {
          const index = Array.from(element.parentElement.children).indexOf(element);
          element.style.setProperty("--reveal-delay", Math.min(index * 45, 180) + "ms");
        }
        element.dataset.reveal = "waiting";
        pending.push(element);
        observer.observe(element);
      }
    }

    function finishReveal(event: AnimationEvent) {
      if (event.animationName === "site-reveal" && event.target instanceof HTMLElement) clearReveal(event.target);
    }

    watchSections();
    preference.addEventListener("change", watchSections);
    document.addEventListener("animationend", finishReveal);
    return () => {
      reset();
      preference.removeEventListener("change", watchSections);
      document.removeEventListener("animationend", finishReveal);
    };
  }, [pathname]);

  return null;
}
