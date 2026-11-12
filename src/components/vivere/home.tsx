import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Compass, MapPin, Navigation, Sparkles, TrendingUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adventures } from "@/lib/adventures";
import illustration from "@/assets/vivere-adventure-illustration.png.asset.json";
import {
  AdventureCard, CategoryRail, PageFrame, SearchBar, SectionHeading, useSavedAdventures,
} from "@/components/vivere/shared";

const quick = [
  { label: "Near me", icon: Navigation },
  { label: "Trending", icon: TrendingUp },
  { label: "Weekend", icon: CalendarDays },
];

export function ExploreHome() {
  const [category, setCategory] = useState("All");
  const [destination, setDestination] = useState("");
  const [activity, setActivity] = useState("All activities");
  const [quickFilter, setQuickFilter] = useState("");
  const [notice, setNotice] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const { saved, toggleSaved } = useSavedAdventures();

  const visibleAdventures = useMemo(() => adventures.filter((adventure) => {
    const categoryMatch = category === "All" || adventure.category === category;
    const destinationMatch = !destination || `${adventure.location} ${adventure.state}`.toLowerCase().includes(destination.toLowerCase());
    const activityMatch = activity === "All activities" || adventure.activity.toLowerCase().includes(activity.toLowerCase());
    return categoryMatch && destinationMatch && activityMatch;
  }), [category, destination, activity]);

  const runSearch = (place: string, activityChoice: string) => {
    setDestination(place.trim());
    setActivity(activityChoice);
    setQuickFilter("");
    setNotice(place.trim() || activityChoice !== "All activities" ? "Showing adventures that match your search." : "Showing all featured adventures.");
    document.getElementById("trending")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <PageFrame className="!px-0 sm:!px-0">
    <div className="px-5 sm:px-9 lg:px-12">
      <section className="hero-wash relative -mx-5 overflow-hidden px-5 pb-8 pt-7 sm:-mx-9 sm:px-9 sm:pt-12 lg:-mx-12 lg:px-12 lg:pb-12">
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-[22%] bg-sky/55 [clip-path:polygon(0_65%,12%_30%,27%_72%,41%_24%,58%_72%,74%_32%,88%_70%,100%_26%,100%_100%,0_100%)]" />
        <div className="relative z-10 grid items-center gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:gap-0">
          <div className="max-w-[620px] pt-2 sm:pt-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.17em] text-sun sm:text-xs">India, out there</p>
            <h1 className="max-w-[590px] font-display text-[38px] font-extrabold leading-[1.04] sm:text-[54px] lg:text-[64px]">Discover India’s <span className="text-primary">Adventure Playground</span></h1>
            <p className="mt-4 max-w-[480px] text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-base sm:leading-7">Find, compare and book real adventure experiences across India — from the highest peaks to the deepest seas.</p>
            <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground sm:mt-7"><span className="grid h-8 w-8 place-items-center rounded-full bg-card shadow-soft"><Compass className="h-4 w-4 text-sun" /></span>Find your way to a little more alive.</div>
          </div>
          <div className="relative mx-auto flex h-[230px] w-full max-w-[620px] items-center justify-center sm:h-[330px] lg:h-[390px]">
            <img src={illustration.url} alt="VIVERE's mountain and rising sun adventure illustration" width={1536} height={1024} fetchPriority="high" className="relative z-10 max-h-full w-full object-contain mix-blend-multiply" />
            <div aria-hidden="true" className="absolute right-[12%] top-[15%] h-32 w-32 rounded-full bg-sun/20 blur-3xl sm:h-48 sm:w-48" />
          </div>
        </div>
        <div className="relative z-10 mt-2 lg:-mt-2"><SearchBar onSearch={runSearch} /></div>
      </section>

      <section className="mt-4 sm:hidden" aria-label="Quick filters"><div className="grid grid-cols-3 gap-2">{quick.map(({ label, icon: Icon }) => <button key={label} type="button" aria-pressed={quickFilter === label} onClick={() => { setQuickFilter(quickFilter === label ? "" : label); setNotice(`${label} adventures are highlighted below.`); }} className={`grid min-h-[72px] place-items-center gap-1 rounded-xl border border-border bg-card px-2 py-3 text-xs font-semibold ${quickFilter === label ? "bg-secondary" : ""}`}><Icon className="h-[18px] w-[18px] text-primary" />{label}</button>)}</div></section>

      <section className="mt-7 sm:mt-8" aria-label="Browse by category"><div className="mb-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:hidden"><h2 className="font-display text-lg font-bold">Popular Categories</h2><Link to="/categories" className="text-xs font-semibold">All <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></Link></div><CategoryRail selected={category} onSelect={(selected) => { setCategory(selected); setQuickFilter(""); setNotice(selected === "All" ? "All featured adventures are now visible." : `Showing ${selected.toLowerCase()} adventures.`); }} /></section>

      <section id="trending" className="scroll-mt-5 pt-8 sm:pt-11">
        <SectionHeading eyebrow="Find your next feeling" title="Trending Adventures" action={<Link to="/explore" className="inline-flex items-center gap-2 pb-1 text-sm font-semibold">View all <ArrowRight className="h-4 w-4" /></Link>} />
        {(notice || quickFilter) && <div role="status" className="mb-4 flex items-center justify-between gap-3 rounded-lg bg-secondary/70 px-4 py-2.5 text-xs text-muted-foreground"><span>{notice || `Explore ${quickFilter.toLowerCase()} experiences.`}</span><button type="button" aria-label="Clear search filters" onClick={() => { setCategory("All"); setDestination(""); setActivity("All activities"); setQuickFilter(""); setNotice(""); }} className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-foreground hover:bg-card"><X className="h-4 w-4" /></button></div>}
        {visibleAdventures.length ? <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:px-0 lg:grid-cols-4">{visibleAdventures.map((adventure) => <div key={adventure.slug} className="snap-start"><AdventureCard adventure={adventure} saved={saved.includes(adventure.slug)} onToggleSaved={toggleSaved} compact /></div>)}</div> : <div className="border border-dashed border-border px-6 py-12 text-center"><p className="font-semibold">No adventures found just yet.</p><p className="mt-1 text-sm text-muted-foreground">Try another destination or activity.</p></div>}
      </section>

      <section className="mt-5 grid items-center gap-5 overflow-hidden rounded-[20px] bg-secondary/80 px-5 py-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-7 sm:px-7 sm:py-6">
        <div aria-hidden="true" className="hidden h-[78px] w-40 items-center justify-center text-primary sm:flex"><svg viewBox="0 0 180 74" fill="none" className="h-full w-full"><path d="M8 65 55 15l22 24L100 8l38 43 18-15 17 29H8Z" stroke="currentColor" strokeWidth="2"/><path d="m46 65 31-33 19 14 16-18 26 37H46Z" stroke="currentColor" strokeWidth="1.5"/></svg></div>
        <div className="min-w-0"><p className="font-display text-xl font-bold sm:text-2xl">Not sure what to try?</p><p className="mt-1 text-sm text-muted-foreground">Tell us your vibe and we’ll find the right adventures for you.</p></div>
        <Link to="/planner"><Button className="w-full rounded-full sm:w-auto" size="pill"><Sparkles className="h-4 w-4" />Get recommendations <ArrowRight /></Button></Link>
      </section>

      <section className="mt-8 flex items-center justify-between border-t border-border pt-6 sm:hidden"><Link to="/map" className="flex items-center gap-2 text-sm font-semibold"><span className="grid h-9 w-9 place-items-center rounded-full bg-secondary"><MapPin className="h-4 w-4" /></span>Explore the adventure map</Link><ArrowRight className="h-4 w-4" /></section>
    </div>
  </PageFrame>;
}
