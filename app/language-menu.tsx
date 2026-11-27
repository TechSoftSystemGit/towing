"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { watchPageLanguage, type TranslationCatalog } from "../lib/page-language";

const languages = [
  ["de", "de", "Deutsch"], ["en", "gb", "English"],
  ["fr", "fr", "Français"], ["es", "es", "Español"],
  ["it", "it", "Italiano"], ["nl", "nl", "Nederlands"],
  ["pl", "pl", "Polski"], ["pt", "pt", "Português"],
  ["tr", "tr", "Türkçe"], ["ar", "ae", "العربية"],
  ["ur", "pk", "اردو"], ["hi", "in", "हिन्दी"],
] as const;

type Language = typeof languages[number][0];
const french: TranslationCatalog = {};
const preferenceKey = "alf-language";

function Flag({ code }: { code: string }) {
  return <Image src={"/flags/" + code + ".png"} width={30} height={22} alt="" unoptimized/>;
}

export default function LanguageMenu() {
  const menu = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  const request = useRef(0);
  const catalogCache = useRef<Partial<Record<Language, TranslationCatalog>>>({ fr: french });
  const [selected, setSelected] = useState<{ language: Language; catalog: TranslationCatalog }>({ language: "fr", catalog: french });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [, flag, label] = languages.find(([code]) => code === selected.language)!;

  const selectLanguage = useCallback(async (language: Language, closeOnSuccess: boolean) => {
    const requestId = ++request.current;
    setError(false);
    setLoading(true);
    try {
      let catalog = catalogCache.current[language];
      if (!catalog) {
        const response = await fetch("/translations/" + language + ".json");
        if (!response.ok) throw new Error("Translation unavailable");
        catalog = await response.json() as TranslationCatalog;
        catalogCache.current[language] = catalog;
      }
      if (requestId !== request.current) return;
      setSelected({ language, catalog });
      try { localStorage.setItem(preferenceKey, language); } catch { /* Page translation still works without storage. */ }
      if (closeOnSuccess && menu.current?.open) {
        menu.current.open = false;
        trigger.current?.focus();
      }
    } catch {
      if (requestId === request.current) setError(true);
    } finally {
      if (requestId === request.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      const preference = localStorage.getItem(preferenceKey);
      const language = languages.find(([code]) => code === preference)?.[0];
      if (language && language !== "fr") void selectLanguage(language, false);
    } catch { /* French remains the default. */ }
  }, [selectLanguage]);

  useEffect(() => watchPageLanguage(selected.language, selected.catalog), [selected]);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && menu.current?.open && !menu.current.contains(event.target)) menu.current.open = false;
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return <details className="header-language" name="header-dropdown" translate="no" ref={menu} onKeyDown={event => {
    if (event.key === "Escape" && menu.current?.open) {
      event.preventDefault();
      menu.current.open = false;
      trigger.current?.focus();
    }
  }}>
    <summary ref={trigger} aria-label={"Langue / Language · " + label}><Flag code={flag}/><span>{selected.language.toUpperCase()}</span><ChevronDown aria-hidden="true"/></summary>
    <div className="language-panel" aria-busy={loading}>
      <p>Langue / Language</p>
      <ul>{languages.map(([code, flagCode, name]) => <li key={code}>
        <button type="button" aria-current={code === selected.language ? "true" : undefined} onClick={() => void selectLanguage(code, true)}>
          <Flag code={flagCode}/><span lang={code} dir="auto">{name}</span>{code === selected.language && <Check aria-hidden="true"/>}
        </button>
      </li>)}</ul>
      {loading && <p className="language-help" role="status">Chargement de la traduction…</p>}
      {error && <p className="language-help" role="status">Traduction indisponible. Réessayez.</p>}
    </div>
  </details>;
}
