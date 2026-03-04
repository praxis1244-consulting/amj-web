import { ArrowRight } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

export default function ProductHeroSection() {
  return (
    <header className="pt-32 pb-16 max-w-7xl mx-auto px-6">
      {/* Status Tag */}
      <div className="flex items-center gap-2 mb-8">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        <span className="text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400 uppercase">
          Partner Certificado
        </span>
      </div>

      {/* Product Name */}
      <h1 className="text-7xl md:text-9xl font-light tracking-tight leading-[0.9] mb-2">
        <RevealText text="Bitdefender" />
      </h1>
      <h1 className="font-serif font-normal text-zinc-400 dark:text-zinc-500 text-7xl md:text-9xl tracking-tight leading-[0.9]">
        <RevealText text="GravityZone" />
      </h1>

      {/* Tagline */}
      <p className="text-xl text-zinc-500 dark:text-zinc-400 font-light mt-8 max-w-xl">
        Protección endpoint de clase mundial. Distribuido por AMJ Ingeniería en
        Chile.
      </p>

      {/* Stat Pills */}
      <div className="flex flex-wrap gap-3 mt-10">
        <span className="border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 font-medium">
          100% MITRE
        </span>
        <span className="border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 font-medium">
          500M+ Endpoints
        </span>
        <span className="border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 font-medium">
          #1 AV-Test
        </span>
        <span className="border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-2 text-sm text-green-600 dark:text-green-400 font-medium">
          24/7
        </span>
      </div>

      {/* CTA */}
      <div className="mt-10">
        <a
          href="#contacto"
          className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-3.5 rounded-full text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Solicitar Demo
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}
