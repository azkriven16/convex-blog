import { BoxIcon } from "@/components/icons/box";
import { InspireSection } from "@/components/ui/inspire-section";
import { StatsSection } from "@/components/ui/stats-section";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

const partners = [
  "Uber",
  "headspace",
  "Meta",
  "airbnb",
  "Revolut",
  "Metalab",
  "Pinterest",
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background text-foreground selection:bg-green-100">
      <section className="flex flex-col items-center justify-center w-full max-w-4xl px-6 pt-32 pb-16">
        <div className="relative mb-12 group cursor-pointer">
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-muted rounded-2xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          <div className="relative w-16 h-16 bg-[#74D75B] rounded-2xl flex items-center justify-center shadow-sm">
            <BoxIcon size={32} />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-center tracking-tight leading-[1.1]">
          Discover real-world
          <br /> design inspiration.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-xl leading-relaxed">
          Featuring over 1,000 iOS & Web apps, and 200 sites —
          <br className="hidden md:block" />
          New content weekly.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <button className="px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity">
            Join for free
          </button>
          <button className="group px-8 py-3.5 bg-background border border-border rounded-full font-bold flex items-center gap-2 hover:bg-accent transition-all shadow-sm">
            See our plans
            <ArrowRightIcon
              size={20}
              strokeWidth={2.5}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </section>

      <section className="mt-20 flex flex-col items-center w-full px-6 opacity-40 grayscale">
        <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-10">
          Trusted by design teams at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 max-w-5xl">
          {partners.map((brand) => (
            <span
              key={brand}
              className="text-xl md:text-2xl font-bold tracking-tighter"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      <section className="w-full px-6 md:px-12 lg:px-20 mt-24 mb-16">
        <div className="rounded-2xl overflow-hidden relative aspect-19/6">
          <Image
            src="/macos.jpg"
            alt=""
            fill
            className="w-full h-full object-fit"
          />
        </div>
      </section>

      <section className="w-full bg-background">
        <StatsSection />
      </section>
      <section className="w-full bg-background">
        <InspireSection />
      </section>
    </main>
  );
}
