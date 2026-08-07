import { useEffect, useRef, useState } from "react";
import {
  Menu, X, Phone, MapPin, MessageCircle, Star, Scissors, Clock,
  Instagram, Facebook, ChevronRight, Send, CheckCircle2, Sparkles,
  CalendarCheck, ShieldCheck, Zap
} from "lucide-react";

/* ============================================================
   PLANTILLA REUTILIZABLE — SITIO WEB DE NEGOCIO LOCAL (v2)
   Ejemplo aplicado: Barbería. Para reusar con otro cliente,
   editá el bloque "DATOS DEL NEGOCIO" y los arrays de contenido.
   El layout, la lógica, accesibilidad y animaciones no requieren
   cambios.

   IMÁGENES REALES: colocá estos archivos en la carpeta /public
   del proyecto (se sirven directo, sin importarlos en el código):
     - /public/hero.jpg              -> foto de fondo del inicio
     - /public/gallery/1.jpg ... 6.jpg -> fotos de la galería
   Tamaño sugerido: hero.jpg 1600x1000px, galería 800x800px,
   formato .jpg optimizado (<300kb c/u) para que cargue rápido.
   ============================================================ */

// ---------- DATOS DEL NEGOCIO (EDITABLE) ----------
const NEGOCIO = {
  nombre: "Barbería Central",
  rubro: "Barbería & cuidado masculino",
  eslogan: "Cortes clásicos y modernos en Córdoba.",
  descripcion:
    "Hace 12 años afeitamos, cortamos y cuidamos el barrio. Turno por WhatsApp, sin vueltas.",
  direccion: "Av. Colón 1234, Córdoba, Argentina",
  telefono: "+54 9 351 000-0000",
  whatsapp: "5493510000000", // código país + área + número, sin + ni espacios
  instagram: "https://instagram.com/tuusuario",
  facebook: "https://facebook.com/tuusuario",
  horarios: [
    { dia: "Lunes a viernes", horario: "9:00 – 20:00" },
    { dia: "Sábados", horario: "9:00 – 14:00" },
    { dia: "Domingos", horario: "Cerrado" },
  ],
  mapaEmbedUrl:
    "https://www.google.com/maps?q=Av.+Colon+1234,+Cordoba,+Argentina&output=embed",
};

// ---------- SERVICIOS (EDITABLE) — se usan en "Servicios", "Precios" y en el selector de reserva ----------
const SERVICIOS = [
  { id: "corte-clasico", icono: Scissors, titulo: "Corte clásico", desc: "Tijera y máquina, terminado prolijo, incluye lavado.", precio: "$6.000" },
  { id: "afeitado-navaja", icono: Sparkles, titulo: "Afeitado a navaja", desc: "Toalla caliente, espuma y navaja tradicional.", precio: "$5.500" },
  { id: "corte-barba", icono: Scissors, titulo: "Corte + barba", desc: "El combo más pedido: perfilado completo.", precio: "$9.500", destacado: true, nota: "Más elegido" },
  { id: "diseno-barba", icono: Sparkles, titulo: "Diseño de barba", desc: "Perfilado con línea definida y contorno a navaja.", precio: "$4.000" },
  { id: "corte-infantil", icono: Scissors, titulo: "Corte infantil", desc: "Cortes para los más chicos, con paciencia y buena onda.", precio: "$5.000" },
  { id: "coloracion", icono: Sparkles, titulo: "Coloración", desc: "Disimulo de canas y color de barba a pedido.", precio: "$8.000", nota: "Según largo" },
];

const GALERIA = [
  { archivo: "/gallery/1.jpg", alt: "Corte fade clásico terminado" },
  { archivo: "/gallery/2.jpg", alt: "Afeitado a navaja con toalla caliente" },
  { archivo: "/gallery/3.jpg", alt: "Diseño de barba perfilado" },
  { archivo: "/gallery/4.jpg", alt: "Interior del local" },
  { archivo: "/gallery/5.jpg", alt: "Combo corte y barba" },
  { archivo: "/gallery/6.jpg", alt: "Detalle de contorno a navaja" },
];

const OPINIONES = [
  { nombre: "Martín G.", texto: "Vengo hace dos años y nunca me fui insatisfecho. Puntuales y prolijos.", estrellas: 5 },
  { nombre: "Facundo R.", texto: "El mejor afeitado a navaja de la zona, lejos. Ambiente muy copado.", estrellas: 5 },
  { nombre: "Lucas P.", texto: "Pedí turno por WhatsApp y me atendieron al toque. Excelente trato.", estrellas: 5 },
  { nombre: "Ezequiel D.", texto: "Buenísima relación precio-calidad. Ya es mi barbería de siempre.", estrellas: 4 },
];

const NAV = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "galeria", label: "Galería" },
  { id: "opiniones", label: "Opiniones" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "contacto", label: "Contacto" },
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

function whatsappLink(mensaje) {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

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
    <p style={{ ...fontBody, color: C.gold, letterSpacing: "0.2em" }} className="text-xs font-semibold uppercase mb-2">
      {children}
    </p>
  );
}

// Envuelve una sección y la revela con una animación sutil al entrar en pantalla.
// Respeta prefers-reduced-motion: si el usuario lo pide, se muestra directo sin animar.
function Reveal({ children, as: Tag = "div", ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className="reveal"
      data-visible={visible ? "true" : "false"}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default function PlantillaNegocioLocal() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [form, setForm] = useState({ nombre: "", contacto: "", mensaje: "" });
  const [estado, setEstado] = useState("idle"); // idle | enviando | ok | error

  const [reserva, setReserva] = useState({ servicio: SERVICIOS[0].id, fecha: "", hora: "", nombre: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleReservaChange = (e) => setReserva((r) => ({ ...r, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado("enviando");
    try {
      // EDITABLE: reemplazá esta URL por tu endpoint real (Formspree, Web3Forms, EmailJS, etc.)
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

  const handleReservaSubmit = (e) => {
    e.preventDefault();
    const servicio = SERVICIOS.find((s) => s.id === reserva.servicio);
    const partes = [
      `Hola! Quiero reservar un turno en ${NEGOCIO.nombre}.`,
      `Servicio: ${servicio ? servicio.titulo : ""}`,
      reserva.fecha ? `Fecha preferida: ${reserva.fecha}` : null,
      reserva.hora ? `Hora preferida: ${reserva.hora}` : null,
      reserva.nombre ? `Nombre: ${reserva.nombre}` : null,
    ].filter(Boolean);
    window.open(whatsappLink(partes.join("\n")), "_blank", "noopener,noreferrer");
  };

  const scrollTo = (id) => {
    setMenuAbierto(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const reservarServicio = (id) => {
    setReserva((r) => ({ ...r, servicio: id }));
    scrollTo("reservar");
    // Foco accesible: llevá al campo fecha para continuar el flujo con teclado.
    setTimeout(() => document.getElementById("reserva-fecha")?.focus(), 400);
  };

  return (
    <div style={{ ...fontBody, backgroundColor: C.bg, color: C.cream }} className="min-h-screen w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap');
        html { scroll-behavior: smooth; }
        .skip-link {
          position: absolute; left: -9999px; top: 0; z-index: 100;
          background: ${C.gold}; color: ${C.bg}; padding: 10px 16px;
          border-radius: 0 0 8px 0; font-weight: 600; font-size: 14px;
        }
        .skip-link:focus { left: 0; }
        a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible {
          outline: 2px solid ${C.goldLight}; outline-offset: 2px;
        }
        .reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal[data-visible="true"] { opacity: 1; transform: translateY(0); }
        .cta-pulse { animation: cta-pulse 2.4s ease-in-out infinite; }
        @keyframes cta-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200,162,74,0.35); }
          50% { box-shadow: 0 0 0 8px rgba(200,162,74,0); }
        }
        .gallery-img { transition: transform 0.5s ease; }
        .gallery-frame:hover .gallery-img { transform: scale(1.06); }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
          .cta-pulse { animation: none !important; }
          .gallery-img { transition: none !important; }
          html { scroll-behavior: auto !important; }
        }
      `}</style>

      <a href="#main" className="skip-link">Saltar al contenido</a>

      {/* NAVBAR */}
      <header
        style={{ backgroundColor: "rgba(21,18,14,0.92)", borderBottom: `1px solid ${C.surfaceLine}` }}
        className="sticky top-0 z-40 backdrop-blur"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
          <button onClick={() => scrollTo("inicio")} className="flex items-center gap-2">
            <Scissors size={22} color={C.gold} aria-hidden="true" />
            <span style={{ ...fontDisplay, fontSize: 24, color: C.cream }}>{NEGOCIO.nombre}</span>
          </button>

          <nav aria-label="Principal" className="hidden md:flex items-center gap-6">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{ color: C.muted }}
                className="text-sm font-medium transition"
                onMouseEnter={(e) => (e.currentTarget.style.color = C.goldLight)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("reservar")}
            style={{ backgroundColor: C.gold, color: C.bg }}
            className="cta-pulse hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold hover:opacity-90 transition"
          >
            <CalendarCheck size={16} aria-hidden="true" /> Reservar turno
          </button>

          <button className="md:hidden" onClick={() => setMenuAbierto((v) => !v)} aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuAbierto}>
            {menuAbierto ? <X color={C.cream} /> : <Menu color={C.cream} />}
          </button>
        </div>

        {menuAbierto && (
          <div style={{ borderTop: `1px solid ${C.surfaceLine}` }} className="md:hidden px-5 pb-4 flex flex-col gap-3">
            {NAV.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} style={{ color: C.cream }} className="text-left text-sm py-1">
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("reservar")}
              style={{ backgroundColor: C.gold, color: C.bg }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-bold mt-1"
            >
              <CalendarCheck size={16} aria-hidden="true" /> Reservar turno
            </button>
          </div>
        )}
      </header>

      <main id="main">
        {/* INICIO */}
        <section id="inicio" aria-labelledby="inicio-titulo" className="relative overflow-hidden">
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(21,18,14,0.55), rgba(21,18,14,0.92)), url('/hero.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-full"
          >
            <div className="max-w-6xl mx-auto px-5 pt-20 pb-16 md:pt-32 md:pb-24">
              <SectionLabel>{NEGOCIO.rubro}</SectionLabel>
              <h1 id="inicio-titulo" style={{ ...fontDisplay, fontSize: "clamp(42px, 8vw, 72px)", lineHeight: 1.02, color: C.cream }} className="max-w-2xl">
                {NEGOCIO.nombre}
              </h1>
              <p style={{ ...fontDisplay, fontSize: "clamp(20px, 3vw, 28px)", color: C.goldLight }} className="mt-2 max-w-xl">
                {NEGOCIO.eslogan}
              </p>
              <p style={{ color: C.muted }} className="mt-4 text-base md:text-lg max-w-md">
                {NEGOCIO.descripcion}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo("reservar")}
                  style={{ backgroundColor: C.gold, color: C.bg }}
                  className="cta-pulse inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-bold text-base hover:opacity-90 transition"
                >
                  <CalendarCheck size={20} aria-hidden="true" /> Reservar turno
                </button>
                <a
                  href={whatsappLink(`Hola! Quiero consultar por un turno en ${NEGOCIO.nombre}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ border: `1px solid ${C.surfaceLine}`, color: C.cream }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-semibold text-sm hover:opacity-80 transition"
                >
                  <MessageCircle size={18} aria-hidden="true" /> Escribinos
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm" style={{ color: C.muted }}>
                <span className="inline-flex items-center gap-2"><ShieldCheck size={16} color={C.gold} aria-hidden="true" /> 12 años en el barrio</span>
                <span className="inline-flex items-center gap-2"><Zap size={16} color={C.gold} aria-hidden="true" /> Confirmación al instante</span>
                <span className="inline-flex items-center gap-2"><Star size={16} color={C.gold} aria-hidden="true" /> 4.9/5 en reseñas</span>
              </div>
            </div>
          </div>
          <Stripe />
        </section>

        {/* SERVICIOS */}
        <Reveal as="section" id="servicios" aria-labelledby="servicios-titulo" style={{ backgroundColor: C.bgAlt }} className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-5">
            <SectionLabel>Qué hacemos</SectionLabel>
            <h2 id="servicios-titulo" style={{ ...fontDisplay, fontSize: "clamp(32px, 5vw, 44px)", color: C.cream }}>Servicios y precios</h2>
            <p style={{ color: C.muted }} className="text-sm mt-2 max-w-md">
              Valores orientativos, pueden variar según largo de cabello. Confirmamos el precio final al reservar.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICIOS.map((s) => (
                <div
                  key={s.id}
                  style={{
                    backgroundColor: s.destacado ? C.red : C.surface,
                    border: `1px solid ${s.destacado ? C.redLight : C.surfaceLine}`,
                  }}
                  className="rounded-lg p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <s.icono size={22} color={s.destacado ? C.cream : C.gold} aria-hidden="true" />
                      {s.nota && (
                        <span style={{ color: s.destacado ? C.cream : C.gold, opacity: s.destacado ? 0.85 : 1 }} className="text-xs font-semibold uppercase tracking-wide">
                          {s.nota}
                        </span>
                      )}
                    </div>
                    <h3 style={{ ...fontDisplay, fontSize: 24, color: C.cream }} className="mt-3">{s.titulo}</h3>
                    <p style={{ color: s.destacado ? "rgba(244,237,224,0.85)" : C.muted }} className="text-sm mt-1">{s.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span style={{ ...fontDisplay, fontSize: 30, color: s.destacado ? C.cream : C.goldLight }}>{s.precio}</span>
                    <button
                      onClick={() => reservarServicio(s.id)}
                      style={{
                        backgroundColor: s.destacado ? C.cream : C.gold,
                        color: C.bg,
                      }}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-md text-sm font-bold hover:opacity-90 transition"
                    >
                      Reservar <ChevronRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* RESERVAR TURNO */}
        <Reveal as="section" id="reservar" aria-labelledby="reservar-titulo" className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-5">
            <SectionLabel>Sacá tu turno</SectionLabel>
            <h2 id="reservar-titulo" style={{ ...fontDisplay, fontSize: "clamp(32px, 5vw, 44px)", color: C.cream }}>Reservar turno</h2>
            <p style={{ color: C.muted }} className="text-sm mt-2 max-w-md">
              Elegí el servicio y el horario que te queda mejor. Te confirmamos la disponibilidad por WhatsApp al instante.
            </p>

            <form
              onSubmit={handleReservaSubmit}
              style={{ backgroundColor: C.surface, border: `1px solid ${C.surfaceLine}` }}
              className="mt-8 rounded-lg p-6 grid sm:grid-cols-2 gap-4"
            >
              <div className="sm:col-span-2">
                <label htmlFor="reserva-servicio" style={{ color: C.muted }} className="text-xs font-medium block mb-1">Servicio</label>
                <select
                  id="reserva-servicio"
                  name="servicio"
                  value={reserva.servicio}
                  onChange={handleReservaChange}
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.surfaceLine}`, color: C.cream }}
                  className="w-full rounded-md px-3 py-2.5 text-sm outline-none"
                >
                  {SERVICIOS.map((s) => (
                    <option key={s.id} value={s.id}>{s.titulo} — {s.precio}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="reserva-fecha" style={{ color: C.muted }} className="text-xs font-medium block mb-1">Fecha preferida</label>
                <input
                  id="reserva-fecha"
                  type="date"
                  name="fecha"
                  value={reserva.fecha}
                  onChange={handleReservaChange}
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.surfaceLine}`, color: C.cream }}
                  className="w-full rounded-md px-3 py-2.5 text-sm outline-none"
                />
              </div>

              <div>
                <label htmlFor="reserva-hora" style={{ color: C.muted }} className="text-xs font-medium block mb-1">Hora preferida</label>
                <input
                  id="reserva-hora"
                  type="time"
                  name="hora"
                  value={reserva.hora}
                  onChange={handleReservaChange}
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.surfaceLine}`, color: C.cream }}
                  className="w-full rounded-md px-3 py-2.5 text-sm outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="reserva-nombre" style={{ color: C.muted }} className="text-xs font-medium block mb-1">Tu nombre</label>
                <input
                  id="reserva-nombre"
                  type="text"
                  name="nombre"
                  required
                  value={reserva.nombre}
                  onChange={handleReservaChange}
                  placeholder="Nombre y apellido"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.surfaceLine}`, color: C.cream }}
                  className="w-full rounded-md px-3 py-2.5 text-sm outline-none"
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: C.gold, color: C.bg }}
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md font-bold text-sm hover:opacity-90 transition"
              >
                <MessageCircle size={18} aria-hidden="true" /> Confirmar por WhatsApp
              </button>
              <p style={{ color: C.muted }} className="sm:col-span-2 text-xs text-center">
                Al confirmar se abre WhatsApp con tu pedido ya escrito, listo para enviar.
              </p>
            </form>
          </div>
        </Reveal>

        {/* GALERIA */}
        <Reveal as="section" id="galeria" aria-labelledby="galeria-titulo" style={{ backgroundColor: C.bgAlt }} className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-5">
            <SectionLabel>Nuestro trabajo</SectionLabel>
            <h2 id="galeria-titulo" style={{ ...fontDisplay, fontSize: "clamp(32px, 5vw, 44px)", color: C.cream }}>Galería</h2>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
              {GALERIA.map((g) => (
                <div
                  key={g.archivo}
                  className="gallery-frame aspect-square rounded-lg overflow-hidden"
                  style={{ backgroundColor: C.surface, border: `1px solid ${C.surfaceLine}` }}
                >
                  <img
                    src={g.archivo}
                    alt={g.alt}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="gallery-img w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* OPINIONES */}
        <Reveal as="section" id="opiniones" aria-labelledby="opiniones-titulo" className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-5">
            <SectionLabel>Lo que dicen</SectionLabel>
            <h2 id="opiniones-titulo" style={{ ...fontDisplay, fontSize: "clamp(32px, 5vw, 44px)", color: C.cream }}>Opiniones</h2>
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {OPINIONES.map((o) => (
                <div key={o.nombre} style={{ backgroundColor: C.surface, border: `1px solid ${C.surfaceLine}` }} className="rounded-lg p-6">
                  <div className="flex gap-1 mb-2" role="img" aria-label={`${o.estrellas} de 5 estrellas`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} color={C.gold} fill={i < o.estrellas ? C.gold : "none"} aria-hidden="true" />
                    ))}
                  </div>
                  <p style={{ color: C.cream }} className="text-sm">“{o.texto}”</p>
                  <p style={{ color: C.muted }} className="text-xs mt-3">— {o.nombre}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* UBICACION */}
        <Reveal as="section" id="ubicacion" aria-labelledby="ubicacion-titulo" style={{ backgroundColor: C.bgAlt }} className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-5">
            <SectionLabel>Cómo llegar</SectionLabel>
            <h2 id="ubicacion-titulo" style={{ ...fontDisplay, fontSize: "clamp(32px, 5vw, 44px)", color: C.cream }}>Ubicación</h2>
            <div className="mt-10 grid md:grid-cols-2 gap-4 items-start">
              <div style={{ backgroundColor: C.surface, border: `1px solid ${C.surfaceLine}` }} className="rounded-lg overflow-hidden">
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
                  <MapPin size={18} color={C.gold} className="mt-0.5" aria-hidden="true" />
                  <p style={{ color: C.cream }} className="text-sm">{NEGOCIO.direccion}</p>
                </div>
                <div className="flex items-start gap-2 mt-3">
                  <Phone size={18} color={C.gold} className="mt-0.5" aria-hidden="true" />
                  <a href={`tel:${NEGOCIO.telefono.replace(/\s/g, "")}`} style={{ color: C.cream }} className="text-sm">{NEGOCIO.telefono}</a>
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
                  Cómo llegar en Google Maps <ChevronRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CONTACTO */}
        <Reveal as="section" id="contacto" aria-labelledby="contacto-titulo" className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10">
            <div>
              <SectionLabel>Escribinos</SectionLabel>
              <h2 id="contacto-titulo" style={{ ...fontDisplay, fontSize: "clamp(32px, 5vw, 44px)", color: C.cream }}>Contacto</h2>
              <p style={{ color: C.muted }} className="text-sm mt-3 max-w-sm">
                Completá el formulario o escribinos directo por WhatsApp, te respondemos en el momento.
              </p>

              <a
                href={whatsappLink(`Hola! Quiero consultar por un turno en ${NEGOCIO.nombre}.`)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: C.gold, color: C.bg }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md font-bold text-sm mt-6 hover:opacity-90 transition"
              >
                <MessageCircle size={18} aria-hidden="true" /> Chatear por WhatsApp
              </a>

              <div className="flex items-center gap-4 mt-5">
                {NEGOCIO.instagram && (
                  <a href={NEGOCIO.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: C.muted }} className="hover:opacity-80">
                    <Instagram size={20} color={C.gold} aria-hidden="true" />
                  </a>
                )}
                {NEGOCIO.facebook && (
                  <a href={NEGOCIO.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: C.muted }} className="hover:opacity-80">
                    <Facebook size={20} color={C.gold} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ backgroundColor: C.surface, border: `1px solid ${C.surfaceLine}` }} className="rounded-lg p-6 space-y-4">
              <div>
                <label htmlFor="contacto-nombre" style={{ color: C.muted }} className="text-xs font-medium block mb-1">Nombre</label>
                <input
                  id="contacto-nombre" required name="nombre" value={form.nombre} onChange={handleChange}
                  placeholder="Tu nombre"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.surfaceLine}`, color: C.cream }}
                  className="w-full rounded-md px-3 py-2.5 text-sm outline-none"
                />
              </div>
              <div>
                <label htmlFor="contacto-medio" style={{ color: C.muted }} className="text-xs font-medium block mb-1">Teléfono o email</label>
                <input
                  id="contacto-medio" required name="contacto" value={form.contacto} onChange={handleChange}
                  placeholder="Cómo te contactamos"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.surfaceLine}`, color: C.cream }}
                  className="w-full rounded-md px-3 py-2.5 text-sm outline-none"
                />
              </div>
              <div>
                <label htmlFor="contacto-mensaje" style={{ color: C.muted }} className="text-xs font-medium block mb-1">Mensaje</label>
                <textarea
                  id="contacto-mensaje" required name="mensaje" value={form.mensaje} onChange={handleChange}
                  placeholder="Contanos qué necesitás" rows={4}
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.surfaceLine}`, color: C.cream }}
                  className="w-full rounded-md px-3 py-2.5 text-sm outline-none resize-none"
                />
              </div>

              <button
                type="submit" disabled={estado === "enviando"}
                style={{ backgroundColor: C.gold, color: C.bg }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md font-bold text-sm hover:opacity-90 transition disabled:opacity-60"
              >
                {estado === "enviando" ? "Enviando..." : (<><Send size={16} aria-hidden="true" /> Enviar mensaje</>)}
              </button>

              <div role="status" aria-live="polite">
                {estado === "ok" && (
                  <p style={{ color: C.goldLight }} className="text-sm flex items-center gap-1">
                    <CheckCircle2 size={14} aria-hidden="true" /> Mensaje enviado. Te respondemos pronto.
                  </p>
                )}
                {estado === "error" && (
                  <p style={{ color: C.redLight }} className="text-sm">
                    No se pudo enviar. Conectá el formulario a tu endpoint real (ver README).
                  </p>
                )}
              </div>
            </form>
          </div>
        </Reveal>
      </main>

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
        href={whatsappLink(`Hola! Quiero consultar por un turno en ${NEGOCIO.nombre}.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        style={{ backgroundColor: "#25D366" }}
        className="fixed bottom-5 right-5 z-50 rounded-full p-4 shadow-lg hover:scale-105 transition"
      >
        <MessageCircle size={26} color="#0b3d1f" aria-hidden="true" />
      </a>
    </div>
  );
}
