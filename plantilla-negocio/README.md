# Plantilla — Sitio web de negocio local (React + Vite + Tailwind)

Plantilla reutilizable pensada para negocios locales (barbería, gimnasio,
peluquería, gasfitero, estudio, etc.). Editá los datos y listo.

## Correr en local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Imágenes reales del negocio

Creá una carpeta `public/` en la raíz del proyecto (al lado de `index.html`)
y agregá:

```
public/
├── hero.jpg          → foto de fondo de la sección Inicio (1600x1000px aprox.)
└── gallery/
    ├── 1.jpg
    ├── 2.jpg
    ├── 3.jpg
    ├── 4.jpg
    ├── 5.jpg
    └── 6.jpg          → fotos de la galería (800x800px aprox., cuadradas)
```

Optimizá cada foto a menos de 300kb (con [squoosh.app](https://squoosh.app),
gratis) para que el sitio cargue rápido. Vite sirve todo lo que está en
`public/` tal cual, sin que tengas que importarlo en el código.

## Sistema de reserva de turno

La sección "Reservar turno" arma automáticamente un mensaje de WhatsApp con
el servicio, fecha, hora y nombre que carga el visitante, y abre WhatsApp
con todo ya escrito, listo para enviar. No necesita servidor ni base de
datos — funciona apenas subís el sitio.

## Qué editar para reusarla con otro cliente

Todo lo editable está arriba de `src/App.jsx`:

- `NEGOCIO`: nombre, rubro, dirección, teléfono, WhatsApp, horarios, mapa.
- `SERVICIOS`, `PRECIOS`, `GALERIA`, `OPINIONES`: arrays de contenido.
- `C`: paleta de colores (cambiá los hex para otro rubro/identidad).

No hace falta tocar el resto del archivo (layout, formulario, menú, etc.).

## Conectar el formulario de contacto

En `handleSubmit` dentro de `src/App.jsx` hay una constante `FORM_ENDPOINT`.
Opciones gratuitas:

1. **Formspree** (formspree.io): creá un formulario, copiá la URL
   `https://formspree.io/f/xxxxx` y pegala en `FORM_ENDPOINT`. Gratis hasta
   50 envíos por mes, te llegan a tu email.
2. **Web3Forms** (web3forms.com): sin necesidad de cuenta, usa una API key.

## Publicar gratis

1. Subí este proyecto a un repositorio de GitHub.
2. Entrá a [vercel.com](https://vercel.com) o [netlify.com](https://netlify.com),
   conectá tu cuenta de GitHub y elegí el repositorio.
3. Dejá la configuración por defecto (Vite la detecta sola) y desplegá.
4. Te da una URL pública gratis (ej: `tu-negocio.vercel.app`). Si más
   adelante querés dominio propio, lo comprás aparte y lo apuntás desde el
   panel del hosting.

## Publicar en GitHub Pages

1. En `vite.config.js`, reemplazá `NOMBRE-DEL-REPO` por el nombre exacto de
   tu repositorio de GitHub.
2. Subí todo (incluida la carpeta `.github`) a tu repositorio.
3. En GitHub, andá a **Settings → Pages** del repositorio.
4. En "Source" elegí **GitHub Actions** (no "Deploy from a branch").
5. Hacé cualquier commit nuevo en `main` (o esperá al primero) — el workflow
   `.github/workflows/deploy.yml` compila y publica solo.
6. En **Settings → Pages** te va a aparecer la URL pública, algo como
   `https://tuusuario.github.io/NOMBRE-DEL-REPO/`.

Cada nuevo push a `main` actualiza el sitio automáticamente.

## Build de producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para subir a cualquier hosting estático.
