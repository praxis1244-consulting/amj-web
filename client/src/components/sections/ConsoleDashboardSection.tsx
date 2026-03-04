import { ArrowUpRight, ShieldCheck } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

const barHeights = [30, 45, 25, 60, 35, 80, 50, 40, 65, 30, 55, 70, 20, 15];

export default function ConsoleDashboardSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      {/* Section Title */}
      <div className="mb-12">
        <h2 className="font-serif text-4xl text-zinc-900 dark:text-zinc-100">
          <RevealText text="Consola" />
        </h2>
        <h2 className="text-4xl font-light tracking-tight text-zinc-400">
          <RevealText text="Centralizada" />
        </h2>
      </div>

      {/* Dashboard Card */}
      <div className="relative bg-zinc-900 rounded-[2rem] overflow-hidden">
        <div className="w-full flex flex-col">
          {/* Window Chrome */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-zinc-800">
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <span className="ml-4 text-xs text-zinc-500 font-medium">
              GravityZone Console
            </span>
          </div>
          <div className="flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-16 md:w-48 border-r border-zinc-800 p-4 hidden sm:flex flex-col gap-4">
              <div className="flex items-center gap-3 text-white text-sm px-2 py-2 bg-zinc-800 rounded-lg">
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                <span className="hidden md:inline">Dashboard</span>
              </div>
              {["Protección", "Endpoints", "Reportes"].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-3 text-zinc-500 text-sm px-2 py-2"
                >
                  <div className="w-[18px] h-[18px]" />
                  <span className="hidden md:inline">{label}</span>
                </div>
              ))}
            </div>
            {/* Main Content */}
            <div className="flex-1 p-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-zinc-800 rounded-xl p-4">
                  <p className="text-zinc-500 text-xs mb-1">
                    Endpoints Activos
                  </p>
                  <p className="text-white text-2xl font-light">847</p>
                  <p className="text-green-400 text-xs mt-1">
                    +12 esta semana
                  </p>
                </div>
                <div className="bg-zinc-800 rounded-xl p-4">
                  <p className="text-zinc-500 text-xs mb-1">
                    Amenazas Bloqueadas
                  </p>
                  <p className="text-white text-2xl font-light">2,341</p>
                  <p className="text-green-400 text-xs mt-1">
                    100% detectadas
                  </p>
                </div>
                <div className="bg-zinc-800 rounded-xl p-4">
                  <p className="text-zinc-500 text-xs mb-1">Score de Riesgo</p>
                  <p className="text-white text-2xl font-light">
                    94<span className="text-sm text-zinc-500">/100</span>
                  </p>
                  <p className="text-green-400 text-xs mt-1">Excelente</p>
                </div>
              </div>
              {/* Chart */}
              <div className="bg-zinc-800 rounded-xl p-4 mb-4 h-48 flex flex-col">
                <p className="text-zinc-500 text-xs mb-4">
                  Actividad de Amenazas — Últimos 30 días
                </p>
                <div className="flex-1 flex items-end gap-1.5">
                  {barHeights.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 ${i >= 12 ? "bg-zinc-600" : "bg-zinc-700"} rounded-sm`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              {/* Threat Notification */}
              <div className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400/10 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">
                      Todos los endpoints protegidos
                    </p>
                    <p className="text-zinc-500 text-xs">
                      Última verificación: hace 2 min
                    </p>
                  </div>
                </div>
                <span className="text-green-400 text-xs font-medium bg-green-400/10 px-3 py-1 rounded-full">
                  Seguro
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-transparent p-8 md:p-12 pt-24">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <p className="text-zinc-400 text-lg font-light max-w-lg">
              Visibilidad completa de tu infraestructura en una única consola
              cloud. Políticas unificadas y respuesta automatizada.
            </p>
            <a
              href="#contacto"
              className="group flex items-center gap-3 border border-zinc-700 rounded-full pl-6 pr-2 py-2 hover:border-zinc-500 transition-colors"
            >
              <span className="text-sm font-medium text-white">Ver Demo</span>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
