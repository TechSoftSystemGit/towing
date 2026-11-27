export type TranslationCatalog = Readonly<Record<string, string>>;

type AppliedTranslation = { source: string; translated: string };
const appliedText = new WeakMap<Text, AppliedTranslation>();
const appliedAttributes = new WeakMap<Element, Map<string, AppliedTranslation>>();
const translatableAttributes = ["alt", "aria-label", "title", "placeholder"];
const excludedContent = "script, style, template, noscript, svg, pre, [contenteditable], [translate='no'], .brand";

function resolveTranslation(value: string, previous: AppliedTranslation | undefined, catalog: TranslationCatalog) {
  const source = previous?.translated === value ? previous.source : value;
  const trimmed = source.trim();
  const key = trimmed.normalize("NFC");
  const translated = Object.hasOwn(catalog, key) ? source.replace(trimmed, () => catalog[key]) : source;
  return { source, translated };
}

export function watchPageLanguage(language: string, catalog: TranslationCatalog) {
  document.documentElement.lang = language;
  const main = document.querySelector("main");
  if (language === "ar" || language === "ur") main?.setAttribute("dir", "rtl");
  else main?.removeAttribute("dir");
  main?.querySelectorAll<HTMLFormElement>("form[lang]").forEach(form => { form.lang = language; });

  function translateText(node: Text) {
    if (node.parentElement?.closest(excludedContent + ", textarea")) return;
    const { source, translated } = resolveTranslation(node.data, appliedText.get(node), catalog);
    if (source === translated) appliedText.delete(node);
    else appliedText.set(node, { source, translated });
    if (node.data !== translated) node.data = translated;
  }

  function translateElement(element: Element) {
    if (element.closest(excludedContent)) return;
    for (const name of translatableAttributes) {
      const value = element.getAttribute(name);
      if (!value) continue;
      const states = appliedAttributes.get(element) || new Map<string, AppliedTranslation>();
      const { source, translated } = resolveTranslation(value, states.get(name), catalog);
      if (source === translated) states.delete(name);
      else states.set(name, { source, translated });
      if (states.size) appliedAttributes.set(element, states);
      else appliedAttributes.delete(element);
      if (value !== translated) element.setAttribute(name, translated);
    }
  }

  function translateTree(container: ParentNode) {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) translateText(walker.currentNode as Text);
    container.querySelectorAll("[alt], [aria-label], [title], [placeholder]").forEach(translateElement);
  }

  const title = document.querySelector("title");
  translateTree(document.body);
  if (title) translateTree(title);
  if (language === "fr") return;

  const options: MutationObserverInit = { childList: true, subtree: true, characterData: true, attributeFilter: translatableAttributes };
  const observer = new MutationObserver(mutations => {
    observer.disconnect();
    for (const mutation of mutations) {
      if (mutation.type === "characterData") translateText(mutation.target as Text);
      if (mutation.type === "attributes") translateElement(mutation.target as Element);
      for (const node of mutation.addedNodes) {
        if (node instanceof Text) translateText(node);
        if (node instanceof Element) {
          translateElement(node);
          translateTree(node);
        }
      }
    }
    observe();
  });
  function observe() {
    observer.observe(document.body, options);
    if (title) observer.observe(title, options);
  }
  observe();
  return () => observer.disconnect();
}
