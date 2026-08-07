import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANTE para GitHub Pages: reemplazá "NOMBRE-DEL-REPO" por el nombre
// exacto de tu repositorio en GitHub (ej: si tu repo es
// github.com/tuusuario/barberia-central, poné "/barberia-central/").
export default defineConfig({
  plugins: [react()],
  base: "/test1/",
});
