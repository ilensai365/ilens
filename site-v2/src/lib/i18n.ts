// Language of the current page, read from <html lang>. /pl/ pages set lang="pl"; everything else is English.
// Read once at load: each page is a separate Vite entry, so the language never changes at runtime.

export type Lang = "en" | "pl";

export const LANG: Lang = typeof document !== "undefined" && document.documentElement.lang === "pl" ? "pl" : "en";
export const isPl = LANG === "pl";

/** Pick the English or Polish value for the current page. */
export function t<T>(en: T, pl: T): T {
  return isPl ? pl : en;
}

/** Pages that already have a Polish version under /pl/. Links to other pages stay on the English one. */
const PL_PAGES = ["/"];

/** Localise an internal link: on Polish pages, "/" becomes "/pl/" when a Polish version exists. */
export function href(path: string): string {
  if (!isPl || !path.startsWith("/")) return path;
  const [page, hash = ""] = path.split("#");
  if (!PL_PAGES.includes(page)) return path;
  return "/pl" + page + (hash ? "#" + hash : "");
}

/** The same page in the other language, for the EN / PL switch. */
export function otherLangUrl(): string {
  if (typeof location === "undefined") return isPl ? "/" : "/pl/";
  if (isPl) return location.pathname.replace(/^\/pl(\/|$)/, "/");
  // No Polish version of this page yet: go to the Polish home page instead of a 404.
  return PL_PAGES.includes(location.pathname) ? "/pl" + location.pathname : "/pl/";
}
