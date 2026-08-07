# Plantilla — Sitio web de negocio local (React + Vite + Tailwind)

Plantilla reutilizable pensada para negocios locales (barbería, gimnasio,
peluquería, gasfitero, estudio, etc.). Editá los datos y listo.

## Correr en local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

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

## Build de producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para subir a cualquier hosting estático.
