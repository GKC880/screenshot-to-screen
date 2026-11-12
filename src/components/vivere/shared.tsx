import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowDownRight, ArrowLeft, ArrowRight, CalendarDays, Check, ChevronDown,
  Compass, Filter, Heart, MapPin, Menu, Search, SlidersHorizontal, Sparkles, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import emblem from "@/assets/vivere-emblem.png.asset.json";
import { adventures, type Adventure } from "@/lib/adventures";

export type { Adventure };

export function useSavedAdventures() {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => {
    try {
      const value = window.localStorage.getItem("vivere-saved-adventures");
      if (value) setSaved(JSON.parse(value) as string[]);
    } catch {
      setSaved([]);
    }
  }, []);
  const toggleSaved = (slug: string) => {
    setSaved((current) => {
      const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
      try { window.localStorage.setItem("vivere-saved-adventures", JSON.stringify(next)); } catch { /* Storage can be unavailable in private contexts. */ }
      return next;
    });
  };
  return { saved, toggleSaved };
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Explore", "/explore"], ["Activities", "/categories"],
    ["Destinations", "/destinations"], ["For Operators", "/operators"],
  ];
  return (
    <header className="relative z-30 mx-auto grid w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 sm:px-9 lg:px-12 lg:py-5">
      <Link to="/" aria-label="VIVERE home" className="hidden min-w-0 items-center gap-2 lg:flex">
        <img src={emblem.url} alt="VIVERE mountain and sun emblem" className="h-11 w-11 shrink-0 rounded-full object-cover" />
        <span className="hidden font-display text-[15px] font-extrabold tracking-[0.12em] sm:block">VIVERE</span>
      </Link>
      <Link to="/" aria-label="VIVERE home" className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center lg:hidden"><img src={emblem.url} alt="VIVERE mountain and sun emblem" className="h-9 w-9 rounded-full object-cover" /></Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
        {links.map(([label, href]) => <Link key={href} to={href} className="text-[13px] font-semibold text-muted-foreground transition-colors hover:text-foreground">{label}</Link>)}
      </nav>
      <div className="flex items-center justify-end gap-2">
        <Link to="/explore" aria-label="Search adventures" className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"><Search className="h-[18px] w-[18px]" /></Link>
        <Link to="/login" className="hidden px-3 py-2 text-[13px] font-semibold sm:inline-flex">Log in</Link>
        <Link to="/signup" className="hidden sm:inline-flex"><Button size="sm" className="rounded-full px-5">Sign up</Button></Link>
        <Button size="icon" variant="ghost" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav aria-label="Mobile navigation" className="absolute left-4 right-4 top-full grid gap-1 border border-border bg-card p-3 shadow-lift lg:hidden">{links.map(([label, href]) => <Link key={href} to={href} onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold hover:bg-secondary">{label}</Link>)}<Link to="/map" onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold hover:bg-secondary">Adventure map</Link><Link to="/wishlist" onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold hover:bg-secondary">Saved adventures</Link></nav>}
    </header>
  );
}

export function PageFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <><SiteHeader /><main className={`mx-auto min-h-[70vh] w-full max-w-[1440px] px-5 pb-20 sm:px-9 lg:px-12 ${className}`}>{children}</main><SiteFooter /></>;
}

export function SiteFooter() {
  return <footer className="border-t border-border bg-card/60"><div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-9 sm:grid-cols-[1fr_auto] sm:items-center sm:px-9 lg:px-12"><Link to="/" className="font-display text-sm font-extrabold tracking-[0.14em]">VIVERE <span className="ml-2 font-sans text-xs font-normal tracking-normal text-muted-foreground">Don't just live. Feel alive.</span></Link><nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground"><Link to="/explore">Explore</Link><Link to="/map">Adventure map</Link><Link to="/planner">Trip planner</Link><Link to="/operators">For operators</Link></nav></div></footer>;
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0">{eyebrow && <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-sun">{eyebrow}</p>}<h2 className="truncate font-display text-2xl font-bold sm:text-[29px]">{title}</h2></div>{action}</div>;
}

export function AdventureCard({ adventure, saved, onToggleSaved, compact = false }: { adventure: Adventure; saved: boolean; onToggleSaved: (slug: string) => void; compact?: boolean }) {
  return <article className={`group relative isolate overflow-hidden rounded-[18px] bg-primary ${compact ? "aspect-[0.83] min-w-[245px]" : "aspect-[0.86]"}`}>
    <Link to="/adventures/$slug" params={{ slug: adventure.slug }} aria-label={`Explore ${adventure.title}`} className="absolute inset-0"><img src={adventure.image} alt={adventure.title} loading="lazy" width={1280} height={960} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" /><span className="photo-fade absolute inset-0" /></Link>
    <button type="button" aria-label={saved ? `Remove ${adventure.title} from saved adventures` : `Save ${adventure.title}`} aria-pressed={saved} onClick={() => onToggleSaved(adventure.slug)} className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-on-photo/40 bg-overlay/25 text-on-photo backdrop-blur-sm transition-colors hover:bg-overlay/55"><Heart className={`h-[18px] w-[18px] ${saved ? "fill-sun text-sun" : ""}`} /></button>
    <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 text-on-photo"><p className="mb-1 text-[11px] font-medium text-on-photo/80">{adventure.location}, {adventure.state}</p><h3 className="line-clamp-2 pr-2 font-display text-lg font-bold leading-[1.18] sm:text-xl">{adventure.title}</h3><div className="mt-3 flex items-center justify-between text-xs"><span className="flex items-center gap-1"><span className="text-sun">★</span>{adventure.rating} <span className="text-on-photo/75">({adventure.reviews})</span></span><span className="font-semibold">₹{adventure.price}<span className="font-normal text-on-photo/75"> / person</span></span></div></div>
    <Link to="/adventures/$slug" params={{ slug: adventure.slug }} aria-label={`View ${adventure.title}`} className="absolute bottom-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-card text-foreground transition-transform hover:translate-x-0.5"><ArrowRight className="h-4 w-4" /></Link>
  </article>;
}

export function CategoryRail({ selected, onSelect }: { selected: string; onSelect: (category: string) => void }) {
  const categories = [
    ["All", "⊞"], ["Air", "⌁"], ["Water", "≈"], ["Land", "△"], ["Height", "♙"], ["Camping", "⌂"], ["Snow", "❄"], ["Motorsports", "◉"], ["Extreme", "↗"], ["Nature", "❧"],
  ] as const;
  return <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2" aria-label="Adventure categories">{categories.map(([name, icon]) => <button type="button" key={name} aria-pressed={selected === name} onClick={() => onSelect(name)} className={`flex min-w-[74px] shrink-0 flex-col items-center gap-2 rounded-xl px-3 py-3 transition-colors ${selected === name ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-card"}`}><span className="font-display text-2xl leading-none">{icon}</span><span className="text-[11px] font-semibold">{name}</span></button>)}</div>;
}

export function SearchBar({ onSearch }: { onSearch: (destination: string, activity: string) => void }) {
  const [destination, setDestination] = useState("");
  const [activity, setActivity] = useState("All activities");
  return <form onSubmit={(event) => { event.preventDefault(); onSearch(destination, activity); }} className="grid gap-2 rounded-[18px] border border-border/70 bg-card p-2 shadow-soft sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-center sm:gap-0 sm:rounded-full sm:px-3 sm:py-2">
    <label className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 sm:border-r sm:border-border"><MapPin className="h-[18px] w-[18px] shrink-0 text-primary" /><span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Destination</span><input aria-label="Where to?" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Where to?" className="w-full min-w-0 bg-transparent text-sm font-semibold outline-none placeholder:text-foreground" /></span></label>
    <label className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 sm:border-r sm:border-border"><Compass className="h-[18px] w-[18px] shrink-0 text-primary" /><span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Activity</span><select aria-label="Choose activity" value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none"><option>All activities</option><option>Paragliding</option><option>River Rafting</option><option>Camping</option><option>Scuba Diving</option></select></span><ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground sm:hidden" /></label>
    <label className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 sm:border-r sm:border-border"><CalendarDays className="h-[18px] w-[18px] shrink-0 text-primary" /><span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">When</span><input type="date" aria-label="Choose a date" className="w-full bg-transparent text-sm font-semibold outline-none" /></span></label>
    <Button type="submit" aria-label="Find adventures" className="h-11 rounded-full px-5"><Search className="h-4 w-4" /><span className="sm:hidden">Find adventures</span></Button>
  </form>;
}

export function Eyebrow({ children }: { children: ReactNode }) { return <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.17em] text-sun">{children}</p>; }

export function PageTitle({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-9 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b border-border pb-7"><div className="min-w-0"><Eyebrow>{eyebrow}</Eyebrow><h1 className="font-display text-3xl font-extrabold sm:text-5xl">{title}</h1>{description && <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>}</div>{action}</div>;
}

export function InlineNotice({ children }: { children: ReactNode }) { return <div role="status" className="mt-5 flex items-start gap-2 border-l-2 border-sun bg-secondary/60 px-4 py-3 text-sm text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-sun" />{children}</div>; }

export function DemoNote({ children }: { children: ReactNode }) { return <p className="mt-4 text-xs leading-5 text-muted-foreground">{children}</p>; }

export function FilterButton({ onClick }: { onClick: () => void }) { return <Button type="button" variant="outline" onClick={onClick}><SlidersHorizontal /> Filters <Filter className="hidden sm:block" /></Button>; }

export function PriceLabel({ adventure }: { adventure: Adventure }) { return <span className="font-display text-2xl font-extrabold">₹{adventure.price}<span className="ml-1 font-sans text-xs font-normal text-muted-foreground">/ person</span></span>; }

export function PageBack() { return <Link to="/explore" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to adventures</Link>; }

export function AdventureList({ items, saved, onToggleSaved }: { items: Adventure[]; saved: string[]; onToggleSaved: (slug: string) => void }) {
  return items.length ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{items.map((adventure) => <AdventureCard key={adventure.slug} adventure={adventure} saved={saved.includes(adventure.slug)} onToggleSaved={onToggleSaved} />)}</div> : <div className="border border-dashed border-border px-6 py-14 text-center text-sm text-muted-foreground">No adventures match this selection yet.</div>;
}

export function SaveButton({ adventure, saved, onToggle }: { adventure: Adventure; saved: boolean; onToggle: () => void }) {
  return <Button type="button" variant="soft" size="icon" aria-label={saved ? `Unsave ${adventure.title}` : `Save ${adventure.title}`} aria-pressed={saved} onClick={onToggle}><Heart className={saved ? "fill-sun text-sun" : ""} /></Button>;
}

export function FilterStatus({ children }: { children: ReactNode }) { return <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><ArrowDownRight className="h-3.5 w-3.5" />{children}</span>; }

export function FeatureLink({ to, children, className = "" }: { to: "/map" | "/planner" | "/wishlist"; children: ReactNode; className?: string }) { return <Link to={to} className={`inline-flex items-center gap-2 font-semibold ${className}`}>{children}<ArrowRight className="h-4 w-4" /></Link>; }

export function VibeButton({ selected, children, onClick }: { selected: boolean; children: ReactNode; onClick: () => void }) { return <Button type="button" variant={selected ? "default" : "soft"} onClick={onClick} className="justify-start">{selected ? <Check /> : <Sparkles />}{children}</Button>; }

export function OpenMapLink() { return <Link to="/map" className="inline-flex items-center gap-2 text-sm font-semibold">Open adventure map <ArrowRight className="h-4 w-4" /></Link>; }

export function sampleAdventure() { return adventures[0]; }
