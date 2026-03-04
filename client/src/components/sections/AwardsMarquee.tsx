import { Trophy, Award, CheckCircle, ShieldCheck } from "lucide-react";

const awards = [
  { icon: Trophy, label: "AV-TEST Best Protection" },
  { icon: Award, label: "MITRE ATT&CK 100%" },
  { icon: CheckCircle, label: "AV-Comparatives #1" },
  { icon: ShieldCheck, label: "IDC MarketScape Leader" },
];

function Track({ id }: { id: string }) {
  const items = [...awards, ...awards, ...awards];
  return (
    <div className="flex shrink-0 animate-marquee gap-16 md:gap-32 items-center pr-16 md:pr-32">
      {items.map((award, i) => (
        <div key={`${id}-${i}`} className="flex items-center gap-3 text-zinc-400 whitespace-nowrap">
          <award.icon className="w-7 h-7 shrink-0" />
          <span className="text-sm font-medium">{award.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function AwardsMarquee() {
  return (
    <section className="border-y border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 py-12 overflow-hidden">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Track id="t1" />
        <Track id="t2" />
      </div>
    </section>
  );
}
