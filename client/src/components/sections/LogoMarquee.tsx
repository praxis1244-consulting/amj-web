const brandPaths = [
  // Bitdefender
  [<path key="a" d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm0 2.2l8.5 4.9v9.8L12 21.8l-8.5-4.9V7.1L12 2.2z"/>, <path key="b" d="M12 6l-6 3.5v7L12 20l6-3.5v-7L12 6z"/>],
  // Kaspersky
  [<path key="a" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.83-3.23 9.36-7 10.57-3.77-1.21-7-5.74-7-10.57V6.3l7-3.12z"/>],
  // Microsoft
  [<path key="a" d="M0 0h11.5v11.5H0V0zm12.5 0H24v11.5H12.5V0zM0 12.5h11.5V24H0V12.5zm12.5 0H24V24H12.5V12.5z"/>],
  // Windows
  [<path key="a" d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>],
  // Google
  [<path key="a" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>, <path key="b" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>, <path key="c" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>, <path key="d" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>],
  // Shield check
  [<path key="a" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>],
  // Norton
  [<path key="a" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>, <path key="b" d="M9 8v8l6-4z"/>],
  // Lock
  [<path key="a" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>],
];

function Logo({ paths }: { paths: React.ReactNode[] }) {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0 text-zinc-400 opacity-60 hover:opacity-100 transition-opacity" fill="currentColor">
      {paths}
    </svg>
  );
}

function Track({ id }: { id: string }) {
  return (
    <div className="flex shrink-0 animate-marquee gap-16 md:gap-32 items-center pr-16 md:pr-32">
      {brandPaths.map((paths, i) => <Logo key={`${id}-a-${i}`} paths={paths} />)}
      {brandPaths.map((paths, i) => <Logo key={`${id}-b-${i}`} paths={paths} />)}
      {brandPaths.map((paths, i) => <Logo key={`${id}-c-${i}`} paths={paths} />)}
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className="border-y border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 py-12 overflow-hidden">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Track id="t1" />
        <Track id="t2" />
      </div>
    </section>
  );
}
