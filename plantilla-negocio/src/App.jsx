import { useState } from "react";
import {
  Menu, X, Phone, MapPin, MessageCircle, Star, Scissors, Clock,
  Instagram, ChevronRight, Camera, Send, CheckCircle2, Sparkles
} from "lucide-react";

/* ============================================================
   PLANTILLA REUTILIZABLE — SITIO WEB DE NEGOCIO LOCAL
   Ejemplo aplicado: Barbería. Para reusar con otro cliente,
   solo edita el bloque "DATOS DEL NEGOCIO" y los arrays de
   contenido (SERVICIOS, PRECIOS, GALERIA, OPINIONES).
   El layout, la lógica y los estilos NO necesitan tocarse.
   ============================================================ */

// ---------- DATOS DEL NEGOCIO (EDITABLE) ----------
const NEGOCIO = {
  nombre: "Barbería Central",
  rubro: "Barbería & cuidado masculino",
  eslogan: "Cortes con oficio, cada detalle a navaja.",
  descripcion:
    "Hace 12 años afeitamos, cortamos y cuidamos el barrio. Turno por WhatsApp, sin vueltas.",
  direccion: "Av. Colón 1234, Córdoba, Argentina",
  telefono: "+54 9 351 000-0000",
  whatsapp: "5493510000000", // formato: código país + área + número, sin + ni espacios
  mensajeWhatsapp: "Hola! Quiero reservar un turno en Barbería Central.",
  instagram: "https://instagram.com/tuusuario",
  horarios: [
    { dia: "Lunes a viernes", horario: "9:00 – 20:00" },
    { dia: "Sábados", horario: "9:00 – 14:00" },
    { dia: "Domingos", horario: "Cerrado" },
  ],
  mapaEmbedUrl:
    "https://www.google.com/maps?q=Av.+Colon+1234,+Cordoba,+Argentina&output=embed",
};

const WHATSAPP_LINK = `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(
  NEGOCIO.mensajeWhatsapp
)}`;

// ---------- CONTENIDO (EDITABLE) ----------
const NAV = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "precios", label: "Precios" },
  { id: "galeria", label: "Galería" },
  { id: "opiniones", label: "Opiniones" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "contacto", label: "Contacto" },
];

const SERVICIOS = [
  { icono: Scissors, titulo: "Corte clásico", desc: "Tijera y máquina, terminado prolijo, incluye lavado." },
  { icono: Sparkles, titulo: "Afeitado a navaja", desc: "Toalla caliente, espuma y navaja tradicional." },
  { icono: Scissors, titulo: "Corte + barba", desc: "El combo más pedido: perfilado completo." },
  { icono: Sparkles, titulo: "Diseño de barba", desc: "Perfilado con línea definida y contorno a navaja." },
  { icono: Scissors, titulo: "Corte infantil", desc: "Cortes para los más chicos, con paciencia y buena onda." },
  { icono: Sparkles, titulo: "Coloración", desc: "Disimulo de canas y color de barba a pedido." },
];

const PRECIOS = [
  { nombre: "Corte clásico", precio: "$6.000", nota: "" },
  { nombre: "Afeitado a navaja", precio: "$5.500", nota: "" },
  { nombre: "Corte + barba", precio: "$9.500", nota: "Más elegido", destacado: true },
  { nombre: "Diseño de barba", precio: "$4.000", nota: "" },
  { nombre: "Corte infantil", precio: "$5.000", nota: "" },
  { nombre: "Coloración", precio: "$8.000", nota: "Según largo" },
];

const GALERIA = [
  "Corte fade clásico", "Afeitado a navaja", "Diseño de barba",
  "Rincón del local", "Combo corte + barba", "Detalle de contorno",
];

const OPINIONES = [
  { nombre: "Martín G.", texto: "Vengo hace dos años y nunca me fui insatisfecho. Puntuales y prolijos.", estrellas: 5 },
  { nombre: "Facundo R.", texto: "El mejor afeitado a navaja de la zona, lejos. Ambiente muy copado.", estrellas: 5 },
  { nombre: "Lucas P.", texto: "Pedí turno por WhatsApp y me atendieron al toque. Excelente trato.", estrellas: 5 },
  { nombre: "Ezequiel D.", texto: "Buenísima relación precio-calidad. Ya es mi barbería de siempre.", estrellas: 4 },
];

// ---------- PALETA (EDITABLE) ----------
const C = {
  bg: "#15120e",
  bgAlt: "#1c1710",
  surface: "#221b13",
  surfaceLine: "rgba(200,162,74,0.18)",
  gold: "#c8a24a",
  goldLight: "#e3c476",
  red: "#7f2f2b",
  redLight: "#a5423c",
  cream: "#f4ede0",
  muted: "#a89c86",
};

const fontDisplay = { fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" };
const fontBody = { fontFamily: "'Inter', sans-serif" };

function Stripe({ style }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: 6,
        width: "100%",
        backgroundImage: `repeating-linear-gradient(115deg, ${C.gold} 0 22px, ${C.cream} 22px 44px, ${C.red} 44px 66px)`,
        ...style,
      }}
    />
  );
}

function SectionLabel({ children }) {
  return (
    <p
      style={{ ...fontBody, color: C.gold, letterSpacing: "0.2em" }}
      className="text-xs font-semibold uppercase mb-2"
    >
      {children}
    </p>
  );
}

export default function PlantillaNegocioLocal() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [form, setForm] = useState({ nombre: "", contacto: "", mensaje: "" });
  const [estado, setEstado] = useState("idle"); // idle | enviando | ok | error

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado("enviando");
    try {
      // EDITABLE: reemplazá esta URL por tu endpoint real (Formspree, Web3Forms, EmailJS, etc.)
      // Ver explicación de cómo conectarlo en la respuesta del chat.
      const FORM_ENDPOINT = "https://formspree.io/f/TU_ID_DE_FORMULARIO";
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setEstado("ok");
        setForm({ nombre: "", contacto: "", mensaje: "" });
      } else {
        setEstado("error");
      }
    } catch {
      setEstado("error");
    }
  };

  const scrollTo = (id) => {
    setMenuAbierto(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ ...fontBody, backgroundColor: C.bg, color: C.cream }} className="min-h-screen w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>

      {/* NAVBAR */}
      <header
        style={{ backgroundColor: "rgba(21,18,14,0.92)", borderBottom: `1px solid ${C.surfaceLine}` }}
        className="sticky top-0 z-40 backdrop-blur"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
          <button onClick={() => scrollTo("inicio")} className="flex items-center gap-2">
            <Scissors size={22} color={C.gold} />
            <span style={{ ...fontDisplay, fontSize: 24, color: C.cream }}>{NEGOCIO.nombre}</span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{ color: C.muted }}
                className="text-sm font-medium hover:opacity-80 transition"
                onMouseEnter={(e) => (e.currentTarget.style.color = C.goldLight)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: C.gold, color: C.bg }}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
          >
            <MessageCircle size={16} /> Reservar turno
          </a>

          <button className="md:hidden" onClick={() => setMenuAbierto((v) => !v)} aria-label="Abrir menú">
            {menuAbierto ? <X color={C.cream} /> : <Menu color={C.cream} />}
          </button>
        </div>

        {menuAbierto && (
          <div style={{ borderTop: `1px solid ${C.surfaceLine}` }} className="md:hidden px-5 pb-4 flex flex-col gap-3">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{ color: C.cream }}
                className="text-left text-sm py-1"
              >
                {item.label}
              </button>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: C.gold, color: C.bg }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-semibold mt-1"
            >
              <MessageCircle size={16} /> Reservar turno
            </a>
          </div>
        )}
      </header>

      {/* INICIO */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 pt-16 pb-14 md:pt-24 md:pb-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionLabel>{NEGOCIO.rubro}</SectionLabel>
            <h1 style={{ ...fontDisplay, fontSize: "clamp(40px, 7vw, 64px)", lineHeight: 1.02, color: C.cream }}>
              {NEGOCIO.eslogan}
            </h1>
            <p style={{ color: C.muted }} className="mt-5 text-base md:text-lg max-w-md">
              {NEGOCIO.descripcion}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: C.gold, color: C.bg }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition"
              >
                <MessageCircle size={18} /> Reservar por WhatsApp
              </a>
              <button
                onClick={() => scrollTo("servicios")}
                style={{ border: `1px solid ${C.surfaceLine}`, color: C.cream }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-sm hover:opacity-80 transition"
              >
                Ver servicios <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div
            style={{ backgroundColor: C.surface, border: `1px solid ${C.surfaceLine}` }}
            className="rounded-lg p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} color={C.gold} />
              <span style={{ ...fontDisplay, fontSize: 20, color: C.cream }}>Horarios</span>
            </div>
            <ul className="space-y-2">
              {NEGOCIO.horarios.map((h) => (
                <li key={h.dia} className="flex justify-between text-sm" style={{ color: C.muted }}>
                  <span>{h.dia}</span>
                  <span style={{ color: C.cream }}>{h.horario}</span>
                </li>
              ))}
            </ul>
            <div style={{ borderTop: `1px solid ${C.surfaceLine}` }} className="mt-5 pt-5 flex items-center gap-2 text-sm">
              <MapPin size={16} color={C.gold} />
              <span style={{ color: C.muted }}>{NEGOCIO.direccion}</span>
            </div>
          </div>
        </div>
        <Stripe />
      </section>

      {/* SERVICIOS */}
      <section id="servicios" style={{ backgroundColor: C.bgAlt }} className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5">
          <SectionLabel>Qué hacemos</SectionLabel>
          <h2 style={{ ...fontDisplay, fontSize: "clamp(30px, 5vw, 42px)", color: C.cream }}>Servicios</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICIOS.map((s) => (
              <div
                key={s.titulo}
                style={{ backgroundColor: C.surface, border: `1px solid ${C.surfaceLine}` }}
                className="rounded-lg p-5"
              >
                <s.icono size={22} color={C.gold} />
                <h3 style={{ ...fontDisplay, fontSize: 20, color: C.cream }} className="mt-3">
                  {s.titulo}
                </h3>
                <p style={{ color: C.muted }} className="text-sm mt-1">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5">
          <SectionLabel>Valores</SectionLabel>
          <h2 style={{ ...fontDisplay, fontSize: "clamp(30px, 5vw, 42px)", color: C.cream }}>Precios orientativos</h2>
          <p style={{ color: C.muted }} className="text-sm mt-2 max-w-md">
            Los valores pueden variar según largo de cabello y complejidad. Confirmamos el precio final al reservar.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRECIOS.map((p) => (
              <div
                key={p.nombre}
                style={{
                  backgroundColor: p.destacado ? C.red : C.surface,
                  border: `1px solid ${p.destacado ? C.redLight : C.surfaceLine}`,
                }}
                className="rounded-lg p-5 flex flex-col justify-between"
              >
                <div>
                  {p.nota && (
                    <span
                      style={{ color: p.destacado ? C.cream : C.gold, opacity: p.destacado ? 0.85 : 1 }}
                      className="text-xs font-semibold uppercase tracking-wide"
                    >
                      {p.nota}
                    </span>
                  )}
                  <h3 style={{ ...fontDisplay, fontSize: 22, color: C.cream }} className="mt-1">
                    {p.nombre}
                  </h3>
                </div>
                <p style={{ ...fontDisplay, fontSize: 32, color: p.destacado ? C.cream : C.goldLight }} className="mt-4">
                  {p.precio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" style={{ backgroundColor: C.bgAlt }} className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5">
          <SectionLabel>Nuestro trabajo</SectionLabel>
          <h2 style={{ ...fontDisplay, fontSize: "clamp(30px, 5vw, 42px)", color: C.cream }}>Galería</h2>
          <p style={{ color: C.muted }} className="text-sm mt-2 max-w-md">
            Reemplazá estos bloques por fotos reales del local y de trabajos terminados.
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALERIA.map((titulo) => (
              <div
                key={titulo}
                style={{ backgroundColor: C.surface, border: `1px solid ${C.surfaceLine}` }}
                className="aspect-square rounded-lg flex flex-col items-center justify-center gap-2 p-4 text-center"
              >
                <Camera size={26} color={C.gold} />
                <span style={{ color: C.muted }} className="text-xs">{titulo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPINIONES */}
      <section id="opiniones" className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5">
          <SectionLabel>Lo que dicen</SectionLabel>
          <h2 style={{ ...fontDisplay, fontSize: "clamp(30px, 5vw, 42px)", color: C.cream }}>Opiniones</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {OPINIONES.map((o) => (
              <div
                key={o.nombre}
                style={{ backgroundColor: C.surface, border: `1px solid ${C.surfaceLine}` }}
                className="rounded-lg p-5"
              >
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      color={C.gold}
                      fill={i < o.estrellas ? C.gold : "none"}
                    />
                  ))}
                </div>
                <p style={{ color: C.cream }} className="text-sm">“{o.texto}”</p>
                <p style={{ color: C.muted }} className="text-xs mt-3">— {o.nombre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UBICACION */}
      <section id="ubicacion" style={{ backgroundColor: C.bgAlt }} className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5">
          <SectionLabel>Cómo llegar</SectionLabel>
          <h2 style={{ ...fontDisplay, fontSize: "clamp(30px, 5vw, 42px)", color: C.cream }}>Ubicación</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-4 items-start">
            <div
              style={{ backgroundColor: C.surface, border: `1px solid ${C.surfaceLine}` }}
              className="rounded-lg overflow-hidden"
            >
              <iframe
                title="Mapa de ubicación"
                src={NEGOCIO.mapaEmbedUrl}
                width="100%"
                height="320"
                style={{ border: 0, filter: "grayscale(0.4) contrast(1.1)" }}
                loading="lazy"
              />
            </div>
            <div style={{ backgroundColor: C.surface, border: `1px solid ${C.surfaceLine}` }} className="rounded-lg p-6">
              <div className="flex items-start gap-2">
                <MapPin size={18} color={C.gold} className="mt-0.5" />
                <p style={{ color: C.cream }} className="text-sm">{NEGOCIO.direccion}</p>
              </div>
              <div className="flex items-start gap-2 mt-3">
                <Phone size={18} color={C.gold} className="mt-0.5" />
                <p style={{ color: C.cream }} className="text-sm">{NEGOCIO.telefono}</p>
              </div>
              <div className="mt-5" style={{ borderTop: `1px solid ${C.surfaceLine}`, paddingTop: 16 }}>
                {NEGOCIO.horarios.map((h) => (
                  <div key={h.dia} className="flex justify-between text-sm mb-1">
                    <span style={{ color: C.muted }}>{h.dia}</span>
                    <span style={{ color: C.cream }}>{h.horario}</span>
                  </div>
                ))}
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(NEGOCIO.direccion)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: C.goldLight }}
                className="inline-flex items-center gap-1 text-sm mt-5 font-semibold"
              >
                Cómo llegar en Google Maps <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10">
          <div>
            <SectionLabel>Escribinos</SectionLabel>
            <h2 style={{ ...fontDisplay, fontSize: "clamp(30px, 5vw, 42px)", color: C.cream }}>Contacto</h2>
            <p style={{ color: C.muted }} className="text-sm mt-3 max-w-sm">
              Completá el formulario o escribinos directo por WhatsApp, te respondemos en el momento.
            </p>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: C.gold, color: C.bg }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-sm mt-6 hover:opacity-90 transition"
            >
              <MessageCircle size={18} /> Chatear por WhatsApp
            </a>

            {NEGOCIO.instagram && (
              <a
                href={NEGOCIO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: C.muted }}
                className="flex items-center gap-2 text-sm mt-4 hover:opacity-80"
              >
                <Instagram size={16} color={C.gold} /> {NEGOCIO.instagram.replace("https://", "")}
              </a>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ backgroundColor: C.surface, border: `1px solid ${C.surfaceLine}` }}
            className="rounded-lg p-6 space-y-4"
          >
            <div>
              <label style={{ color: C.muted }} className="text-xs font-medium block mb-1">Nombre</label>
              <input
                required
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.surfaceLine}`, color: C.cream }}
                className="w-full rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label style={{ color: C.muted }} className="text-xs font-medium block mb-1">Teléfono o email</label>
              <input
                required
                name="contacto"
                value={form.contacto}
                onChange={handleChange}
                placeholder="Cómo te contactamos"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.surfaceLine}`, color: C.cream }}
                className="w-full rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label style={{ color: C.muted }} className="text-xs font-medium block mb-1">Mensaje</label>
              <textarea
                required
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Contanos qué necesitás"
                rows={4}
                style={{ backgroundColor: C.bg, border: `1px solid ${C.surfaceLine}`, color: C.cream }}
                className="w-full rounded-md px-3 py-2 text-sm outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={estado === "enviando"}
              style={{ backgroundColor: C.gold, color: C.bg }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition disabled:opacity-60"
            >
              {estado === "enviando" ? "Enviando..." : (<><Send size={16} /> Enviar mensaje</>)}
            </button>

            {estado === "ok" && (
              <p style={{ color: C.goldLight }} className="text-sm flex items-center gap-1">
                <CheckCircle2 size={14} /> Mensaje enviado. Te respondemos pronto.
              </p>
            )}
            {estado === "error" && (
              <p style={{ color: C.redLight }} className="text-sm">
                No se pudo enviar. Conectá el formulario a tu endpoint real (ver instrucciones).
              </p>
            )}
          </form>
        </div>
      </section>

      <Stripe style={{ height: 8 }} />

      {/* FOOTER */}
      <footer style={{ backgroundColor: C.bgAlt, borderTop: `1px solid ${C.surfaceLine}` }} className="py-8">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <span style={{ ...fontDisplay, fontSize: 20, color: C.cream }}>{NEGOCIO.nombre}</span>
          <p style={{ color: C.muted }} className="text-xs text-center">
            © {new Date().getFullYear()} {NEGOCIO.nombre}. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE DE WHATSAPP */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        style={{ backgroundColor: "#25D366" }}
        className="fixed bottom-5 right-5 z-50 rounded-full p-4 shadow-lg hover:scale-105 transition"
      >
        <MessageCircle size={26} color="#0b3d1f" />
      </a>
    </div>
  );
}
