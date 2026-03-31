import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RevealText from "@/components/ui/RevealText";

const EASE = [0.16, 1, 0.3, 1] as const;

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Nueva+Tajamar+481,+Las+Condes,+Regi%C3%B3n+Metropolitana,+Chile";

const OFFICE_LAT = -33.4163;
const OFFICE_LNG = -70.6056;

const MARKER_HTML = `
<span class="amj-pin">
  <span class="amj-pin-pulse"></span>
  <span class="amj-pin-dot"></span>
</span>`;

const MARKER_CSS = `
.amj-pin{position:relative;display:block;width:32px;height:32px}
.amj-pin-dot{position:absolute;top:50%;left:50%;width:10px;height:10px;
  transform:translate(-50%,-50%);border-radius:50%;
  background:#f59e0b;box-shadow:0 0 10px 2px rgba(245,158,11,0.45)}
.amj-pin-pulse{position:absolute;top:50%;left:50%;width:10px;height:10px;
  transform:translate(-50%,-50%);border-radius:50%;
  border:1.5px solid rgba(245,158,11,0.5);
  animation:amj-pulse 3s cubic-bezier(0.16,1,0.3,1) infinite}
@keyframes amj-pulse{
  0%{width:10px;height:10px;opacity:.7}
  100%{width:48px;height:48px;opacity:0}}
@media(prefers-reduced-motion:reduce){
  .amj-pin-pulse{animation:none;display:none}}
`;

export default function Footer() {
  const prefersReduced = useReducedMotion();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Inject marker CSS once
    if (!document.getElementById("amj-pin-css")) {
      const style = document.createElement("style");
      style.id = "amj-pin-css";
      style.textContent = MARKER_CSS;
      document.head.appendChild(style);
    }

    const map = L.map(mapRef.current, {
      center: [OFFICE_LAT, OFFICE_LNG],
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      { maxZoom: 19, subdomains: "abcd" },
    ).addTo(map);

    // Custom amber pin with breathing pulse
    const icon = L.divIcon({
      html: MARKER_HTML,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
    L.marker([OFFICE_LAT, OFFICE_LNG], { icon }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <footer
      id="site-footer"
      className="bg-zinc-950 text-white rounded-t-[2.25rem] md:rounded-t-[3rem] overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 relative z-10">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 sm:pb-8 mb-12 sm:mb-16 gap-5 sm:gap-6">
          <img
            src="/logo-iso.png"
            alt="AMJ Ingeniería"
            width="220"
            height="56"
            loading="lazy"
            decoding="async"
            className="h-7 w-auto brightness-100"
          />
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] sm:text-xs text-zinc-500 uppercase tracking-wider sm:tracking-widest">
            <span>15+ años</span>
            <span className="text-zinc-700">//</span>
            <span>5.261+ amenazas detectadas</span>
            <span className="text-zinc-700">//</span>
            <span>Equipo local</span>
          </div>
          <Link
            href="/productos"
            className="text-sm font-medium hover:text-zinc-300 transition-colors"
          >
            Productos
          </Link>
        </div>

        {/* Large CTA */}
        <div className="text-left md:text-center mb-16 sm:mb-20 md:mb-24">
          <p className="font-serif text-2xl sm:text-3xl mb-4 text-zinc-300">
            / Protege lo que más importa
          </p>
          <p className="text-zinc-500 text-sm sm:text-base mb-5 sm:mb-6 max-w-xl md:mx-auto">
            Escríbenos y en 1 día hábil coordinamos una primera conversación
            para revisar tu contexto, necesidades y próximos pasos.
          </p>
          <a
            href="mailto:ventas@amjingenieria.cl"
            className="text-[8.5vw] md:text-7xl lg:text-8xl leading-[1.05] font-light tracking-tight hover:text-zinc-300 transition-colors inline-block whitespace-nowrap"
          >
            <RevealText text="ventas@amjingenieria.cl" />
          </a>
        </div>

        {/* Map Card */}
        <motion.div
          className="group relative rounded-xl overflow-hidden border border-white/10 mb-12 sm:mb-16"
          initial={prefersReduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Leaflet dark map — brightness boost for label legibility */}
          <div
            ref={mapRef}
            className="h-[200px] sm:h-[260px] md:h-[300px] w-full"
            style={{ filter: "brightness(1.3) contrast(1.1)" }}
          />

          {/* Address overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent px-4 sm:px-6 pb-4 pt-10 pointer-events-none z-[500]">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-zinc-400 mb-1">
                  Oficina
                </p>
                <p className="text-sm sm:text-base text-white font-light">
                  Nueva Tajamar 481, Torre Norte, Of 303
                </p>
                <p className="text-xs text-zinc-500">Las Condes, Santiago</p>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto text-[11px] uppercase tracking-[0.22em] font-medium text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
              >
                Ver mapa
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-xs text-zinc-500">
          <div>
            <p className="mb-1 text-white">Todos los derechos reservados.</p>
            <p>&copy;2026 AMJ Ingeniería</p>
          </div>
          <div className="md:text-center space-y-1">
            <p>Nueva Tajamar 481, T Norte, Of 303, Las Condes</p>
            <p>+569 4524 1309</p>
          </div>
          <div className="flex flex-wrap md:justify-end gap-4 sm:gap-6">
            <a
              href="mailto:ventas@amjingenieria.cl"
              className="hover:text-white transition-colors"
            >
              Email
            </a>
            <a
              href="tel:+56984298092"
              className="hover:text-white transition-colors"
            >
              Teléfono
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
