# games — juegos clásicos en HTML + CSS + JS

Juegos de navegador auto-contenidos (un `index.html` por juego, sin dependencias salvo
Font Awesome por CDN). Se juega **contra el PC, como en los viejos tiempos**, o a
2 jugadores en local donde aplica. Textos en **ES · EN · JA** con selector integrado.

> Part of [jgarvidsson.dev](https://www.jgarvidsson.dev).

## Juegos

| Juego | ES | EN | JA | Carpeta |
|---|---|---|---|---|
| Buscaminas / Minesweeper / マインスイーパ | ✅ | ✅ | ✅ | `buscaminas/` |
| Conecta 4 / Connect 4 / コネクト4 | ✅ | ✅ | ✅ | `conecta4/` |
| Hundir la Flota / Battleships / バトルシップ | ✅ | ✅ | ✅ | `hundir-la-flota/` |
| Serpiente / Snake / スネーク | ✅ | ✅ | ✅ | `serpiente/` |
| Tenis / Tennis Pong / テニス | ✅ | ✅ | ✅ | `tenis/` |
| Tetris / Tetris / テトリス | ✅ | ✅ | ✅ | `tetris/` |
| Tres en Raya / Tic-Tac-Toe / 三目並べ | ✅ | ✅ | ✅ | `tres-en-raya/` |

Abre `index.html` (galería) o entra directo a cada carpeta. Idioma con `?lang=es|en|ja`
o con el selector ES|EN|JA de cada juego.

## Jugar en local

```bash
# opción 1: servidor estático (recomendado)
npx serve .
# opción 2: python
python -m http.server 8000
```

Luego abre http://localhost:8000 (o 3000 según la herramienta).

## Estructura

```
games/
├── index.html          # galería mínima
├── _shared/
│   └── game-lang.js    # helper i18n ES/EN/JA (sin framework)
├── buscaminas/
│   └── index.html
├── conecta4/
│   └── index.html
├── hundir-la-flota/
│   └── index.html
├── serpiente/
│   └── index.html
├── tenis/
│   └── index.html
├── tetris/
│   └── index.html
└── tres-en-raya/
    └── index.html
```

## Idiomas (cómo funciona)

Cada juego carga `_shared/game-lang.js` y declara su diccionario:

```html
<script src="../_shared/game-lang.js"></script>
<script>
  GameLang.init({
    es: { play: 'Jugar' },
    en: { play: 'Play' },
    ja: { play: '遊ぶ' }
  });
</script>
<button data-i18n="play">Jugar</button>
```

- `data-i18n="clave"` → `textContent`, `data-i18n-html` → HTML, `data-i18n-aria` → `aria-label`.
- `GameLang.t('clave')` para textos dinámicos + `GameLang.onChange` para re-pintar.
- Orden: `?lang=` → `localStorage` → idioma del navegador → `es`.

## Nota

Proyecto personal y sobrio: sin frameworks, sin rastreadores, sin dependencias de
construcción. © J. G. Arvidsson.

---

# games — classic games in HTML + CSS + JS

Self-contained browser games (one `index.html` each, no dependencies except Font
Awesome via CDN). Play **against the PC, like in the old days**, or 2-player local
where supported. Text in **ES · EN · JA** with integrated switcher.

Open `index.html` (gallery) or any folder directly. Language via `?lang=es|en|ja`
or each game's ES|EN|JA switcher. Serve statically (`npx serve .`) for best results.
