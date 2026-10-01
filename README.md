# ilens

Wszystkie projekty iLens w jednym repo. **Repo na GitHubie jest PUBLICZNE**: płatne treści (ebooki, lekcje kursu, PDF-y) nigdy tu nie trafiają (pilnuje tego `.gitignore`).

## Mapa projektów

| Folder | Co to | Adres | Status |
|---|---|---|---|
| `site-v2/` | Główna strona (React + Vite) | ilens.co | **LIVE** |
| `remotion/` | Rolki i kurs iLens PRO (Remotion) | — | gotowe MP4 w `remotion/out/` |
| `foto/` | Portfolio fotograficzne | foto.ilens.co | nie wdrożone |
| `resell/` | Sklep PLR/MRR | resell.ilens.co | nie wdrożone |
| `ebooks/` | Stare szkice ebooków (.md) — tylko lokalnie | — | nowe źródła: `Documents\ilens-ebooks` |
| `_archiwum/stara-strona/` | Poprzednia statyczna strona (rollback) | — | archiwum |
| `_archiwum/upload-tmp-*/` | Opublikowane rolki/grafiki — tylko lokalnie | — | archiwum |
| `.claude/` | Konfiguracja podglądu (launch.json, skrypty startowe) | — | — |

## Uruchamianie lokalnie (podgląd)

Konfiguracje w `.claude/launch.json`:

- `site-v2` → http://localhost:5173
- `remotion-studio` → http://localhost:3100
- `resell` → http://localhost:5174
- `foto` → http://localhost:8090
- `site` (stara strona) → http://localhost:8080

## Wdrożenie ilens.co

1. `cd site-v2 && npm run build`
2. commit `src` + `dist`
3. `git push` → Cloudflare publikuje `site-v2/dist` w ~40 s (`wrangler.jsonc`)

Rollback do starej strony: w `wrangler.jsonc` ustaw `"directory": "./_archiwum/stara-strona"` i zrób push.

## Czego NIE commitować

- ebooków, PDF-ów, lekcji kursu (`remotion/src/Course/lessons*`, `remotion/public/course/`)
- dużych wideo (`*.mp4` w `remotion/public/`, `remotion/out/`)
- prywatnych zdjęć (`remotion/public/claude-reel/me*.jpg`, `foto/site/img/`)
