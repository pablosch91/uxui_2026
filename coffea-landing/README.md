# Coffea — Landing page (HTML5 + CSS3)

Landing estática de una página, sin JavaScript ni build. TP4 · Diseño UX-UI · FCyT.

## Levantar en local
Abrir `index.html` en el navegador, o servir la carpeta: `python3 -m http.server 8000` y visitar http://localhost:8000.
(`404.html` usa rutas absolutas, por eso conviene probarlo con servidor.)

## Estructura
- `index.html`, `404.html`, `netlify.toml`
- `css/main.css` importa las capas en orden: tokens → base → layout → components → utilities (`@layer`).
- `css/components/` un archivo por bloque BEM.
- `assets/img`, `assets/icons`: Fotos reales exportadas del Figma (JPG comprimido).

## Convenciones
BEM, mobile-first (`min-width: 768 / 1024 / 1440`), cero valores sueltos (todo en `css/tokens.css`), interacciones solo con CSS.
