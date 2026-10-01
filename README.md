# Portafolio Digital de Rafael

Sitio estático (HTML + CSS + JavaScript puro, sin dependencias) con tres secciones:
**Quién soy**, **Proyectos de 2026** (uno por mes) y **Mis objetivos a 5 años**.

## Estructura

```
index.html    estructura y contenido
styles.css    estilos, tema oscuro por defecto, responsive
script.js     pestañas, filtros, tema y datos de los 12 proyectos
vercel.json   configuración de despliegue en Vercel
```

## Editar los proyectos de 2026

Los 12 proyectos viven en el array `PROYECTOS`, al inicio de `script.js`:

```js
{ mes: "Enero", num: "01", cat: "estudio", titulo: "...", desc: "...", estado: "Completado" }
```

- `cat`: `producto`, `estudio` o `comunidad` (define el filtro y el color de la etiqueta)
- `estado`: `Completado`, `En curso`, `Próximo` o `Planificado`

## Desarrollo local

```bash
python3 -m http.server 8000
```

Y abre `http://localhost:8000`.

## Despliegue en Vercel

Opción recomendada, conectada a GitHub (despliegue automático en cada `push`):

1. Sube esta carpeta a un repositorio de GitHub.
2. En Vercel: **Add New → Project → Import** el repositorio.
3. Vercel detecta el framework "Other" automáticamente. Deja:
   - Build Command: dejar vacío (o `npm run build`)
   - Output Directory: `.`
4. **Deploy**.

Opción por CLI:

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

## Personalización rápida

- Nombre, edad y correo: `index.html` (busca "11 años" y `rafael@correo.com`).
- Colores: variables `--brand`, `--brand-2`, `--accent` y `--gold` al inicio de `styles.css`.
- Tema: oscuro por defecto; el botón de la cabecera alterna a claro y guarda la elección en `localStorage`.
