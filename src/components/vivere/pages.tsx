import { useMemo, useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  ArrowRight, CalendarDays, Check, ChevronLeft, Clock3, Compass, Filter, Heart,
  MapPin, Minus, Plus, Share2, ShieldCheck, SlidersHorizontal, Sparkles, Star, Users, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { adventures, categories } from "@/lib/adventures";
import {
  AdventureCard, AdventureList, CategoryRail, DemoNote, Eyebrow, FilterStatus,
  InlineNotice, OpenMapLink, PageBack, PageFrame, PageTitle, PriceLabel,
  SaveButton, SectionHeading, useSavedAdventures, VibeButton,
} from "@/components/vivere/shared";

function useFilterNotice(initial = "") {
  const [notice, setNotice] = useState(initial);
  return { notice, setNotice };
}

export function ExplorePage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { saved, toggleSaved } = useSavedAdventures();
  const items = adventures.filter((item) => (category === "All" || item.category === category) && `${item.title} ${item.location} ${item.state}`.toLowerCase().includes(search.toLowerCase()));
  return <PageFrame><PageTitle eyebrow="Find your next feeling" title="Explore adventures" description="Discover experiences across India, from mountain air to clear blue water." action={<OpenMapLink />} />
    <div className="mb-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><label className="flex h-12 items-center gap-3 border border-border bg-card px-4"><Compass className="h-4 w-4 shrink-0 text-primary" /><input aria-label="Search adventures" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search an activity or destination" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" /></label><FilterStatus>{items.length} experiences</FilterStatus></div>
    <CategoryRail selected={category} onSelect={setCategory} /><div className="mt-6"><AdventureList items={items} saved={saved} onToggleSaved={toggleSaved} /></div>
  </PageFrame>;
}

export function CategoriesPage() {
  const [category, setCategory] = useState("All");
  const { saved, toggleSaved } = useSavedAdventures();
  const items = adventures.filter((item) => category === "All" || item.category === category);
  return <PageFrame><PageTitle eyebrow="Find your kind of wild" title="Adventure categories" description="Choose a feeling, then find an experience that takes you there." />
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{categories.filter((item) => item.name !== "All").map((item) => <button type="button" key={item.name} aria-pressed={category === item.name} onClick={() => setCategory(category === item.name ? "All" : item.name)} className={`grid min-h-[142px] grid-cols-[auto_1fr_auto] items-center gap-4 border px-5 text-left transition-colors ${category === item.name ? "border-primary bg-secondary" : "border-border bg-card hover:bg-secondary/60"}`}><span className="grid h-12 w-12 place-items-center rounded-full bg-secondary font-display text-2xl">{item.icon}</span><span><span className="block font-display text-lg font-bold">{item.name}</span><span className="mt-1 block text-xs text-muted-foreground">{item.name === "Air" ? "Take the scenic way up" : item.name === "Water" ? "Make a splash somewhere new" : `Explore ${item.name.toLowerCase()} experiences`}</span></span><ArrowRight className="h-4 w-4" /></button>)}</div>
    <div className="mt-12"><SectionHeading eyebrow="Featured" title={`${category === "All" ? "Popular" : category} adventures`} /><AdventureList items={items} saved={saved} onToggleSaved={toggleSaved} /></div>
  </PageFrame>;
}

const destinations = [
  { name: "Bir Billing", state: "Himachal Pradesh", count: 1, image: adventures[0].image, intro: "Take in the Dhauladhar from above." },
  { name: "Rishikesh", state: "Uttarakhand", count: 1, image: adventures[1].image, intro: "Follow the river into the foothills." },
  { name: "Coorg", state: "Karnataka", count: 1, image: adventures[2].image, intro: "Slow down among the Western Ghats." },
  { name: "Goa", state: "West coast", count: 1, image: adventures[3].image, intro: "Find a new perspective beneath the waves." },
];

export function DestinationsPage() {
  const [query, setQuery] = useState("");
  const found = destinations.filter((destination) => `${destination.name} ${destination.state}`.toLowerCase().includes(query.toLowerCase()));
  return <PageFrame><PageTitle eyebrow="From peaks to shorelines" title="Destinations" description="Start with a place. Find the kind of adventure that stays with you." action={<OpenMapLink />} />
    <label className="mb-6 flex h-12 max-w-xl items-center gap-3 border border-border bg-card px-4"><MapPin className="h-4 w-4 text-primary" /><input aria-label="Search destinations" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search destinations" className="w-full bg-transparent text-sm outline-none" /></label>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{found.map((destination) => <Link key={destination.name} to="/explore" className="group overflow-hidden border border-border bg-card"><div className="aspect-[1.12] overflow-hidden"><img src={destination.image} alt={`${destination.name}, ${destination.state}`} loading="lazy" width={1280} height={960} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" /></div><div className="flex items-start justify-between gap-3 p-4"><div><h2 className="font-display text-xl font-bold">{destination.name}</h2><p className="mt-1 text-xs text-muted-foreground">{destination.state}</p><p className="mt-3 text-sm text-muted-foreground">{destination.intro}</p><p className="mt-4 text-xs font-semibold">{destination.count} featured experience</p></div><ArrowRight className="mt-1 h-4 w-4 shrink-0" /></div></Link>)}</div>
    {found.length === 0 && <p className="border border-dashed border-border py-12 text-center text-sm text-muted-foreground">No destinations match that search.</p>}
  </PageFrame>;
}

const mapLocations = [
  { name: "Bir Billing", adventure: adventures[0] },
  { name: "Rishikesh", adventure: adventures[1] },
  { name: "Coorg", adventure: adventures[2] },
  { name: "Goa", adventure: adventures[3] },
];

export function AdventureMapPage() {
  const [selected, setSelected] = useState(adventures[0]);
  const [filter, setFilter] = useState("All activities");
  const [showFilter, setShowFilter] = useState(false);
  const locations = mapLocations.filter(({ adventure }) => filter === "All activities" || adventure.activity === filter);
  return <PageFrame><PageBack /><PageTitle eyebrow="Find your way out there" title="Adventure map" description="Browse a handful of featured places around India." action={<Button type="button" variant="outline" onClick={() => setShowFilter((value) => !value)}><SlidersHorizontal />Filter</Button>} />
    {showFilter && <div className="mb-4 flex flex-wrap gap-2 border border-border bg-card p-4">{["All activities", ...adventures.map((item) => item.activity)].map((name) => <Button key={name} type="button" variant={filter === name ? "default" : "soft"} size="sm" onClick={() => setFilter(name)}>{name}</Button>)}</div>}
    <div className="relative grid min-h-[520px] overflow-hidden border border-border bg-[radial-gradient(ellipse_at_50%_45%,var(--color-card)_20%,var(--color-secondary)_100%)] lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="relative min-h-[460px] overflow-hidden bg-sky/40">
        <div aria-hidden="true" className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(var(--color-sky-deep) 0.7px, transparent 0.7px)", backgroundSize: "22px 22px" }} />
        <svg viewBox="0 0 620 700" role="img" aria-label="Illustrated map of India with adventure locations" className="absolute inset-0 h-full w-full"><path d="M257 66 302 88 330 116 370 127 387 160 414 173 407 208 441 230 429 270 448 299 426 332 434 365 409 391 405 428 379 450 371 492 348 518 341 557 313 590 291 567 284 535 265 506 250 470 225 442 216 407 194 379 183 346 161 317 164 283 147 253 159 223 150 191 174 173 176 141 204 123 213 95 239 89Z" fill="var(--color-sky)" stroke="var(--color-sky-deep)" strokeWidth="3"/><path d="M420 300 478 280 520 293 535 316 508 334 464 328Z" fill="var(--color-sky)" stroke="var(--color-sky-deep)" strokeWidth="2"/><path d="M300 601 317 622 312 654 299 666 285 642Z" fill="var(--color-sky)" stroke="var(--color-sky-deep)" strokeWidth="2"/><path d="M185 142 241 133 293 151M182 205 240 202 328 224M179 299 246 316 345 300M206 394 267 378 384 403M255 476 320 449 393 446" fill="none" stroke="var(--color-card)" strokeWidth="3" strokeDasharray="8 8"/></svg>
        <p className="absolute left-5 top-5 flex items-center gap-2 border border-border bg-card/90 px-3 py-2 text-xs font-semibold shadow-soft"><MapPin className="h-4 w-4 text-sun" />India · {locations.length} featured spots</p>
        {locations.map(({ name, adventure }) => <button key={name} type="button" aria-label={`Select ${name}`} aria-pressed={selected.slug === adventure.slug} onClick={() => setSelected(adventure)} style={{ left: adventure.pin.left, top: adventure.pin.top }} className={`absolute z-10 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 shadow-lift transition-transform hover:scale-110 ${selected.slug === adventure.slug ? "border-card bg-primary text-primary-foreground" : "border-card bg-card text-primary"}`}><MapPin className="h-5 w-5" /></button>)}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">{locations.map(({ name, adventure }) => <button type="button" key={name} onClick={() => setSelected(adventure)} className={`shrink-0 border px-3 py-2 text-xs font-semibold shadow-soft ${selected.slug === adventure.slug ? "bg-primary text-primary-foreground" : "bg-card"}`}>{name}</button>)}</div>
      </div>
      <aside className="hidden border-l border-border bg-card p-5 lg:block"><Eyebrow>Featured places</Eyebrow><h2 className="mb-4 font-display text-xl font-bold">Find the feeling</h2><div className="grid gap-2">{locations.map(({ name, adventure }) => <button type="button" key={name} onClick={() => setSelected(adventure)} className={`flex items-center gap-3 border p-2 text-left ${selected.slug === adventure.slug ? "border-primary bg-secondary" : "border-border hover:bg-secondary/50"}`}><img src={adventure.image} alt="" loading="lazy" width={1280} height={960} className="h-12 w-14 shrink-0 object-cover" /><span className="min-w-0"><span className="block truncate text-sm font-semibold">{name}</span><span className="block truncate text-xs text-muted-foreground">{adventure.activity}</span></span><ArrowRight className="ml-auto h-4 w-4 shrink-0" /></button>)}</div></aside>
      <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-[76px_minmax(0,1fr)_auto] items-center gap-3 border border-border bg-card p-3 shadow-lift sm:bottom-5 sm:left-5 sm:right-auto sm:w-[min(420px,calc(100%-2rem))] sm:grid-cols-[92px_minmax(0,1fr)_auto]"><img src={selected.image} alt={selected.title} loading="lazy" width={1280} height={960} className="h-[70px] w-[76px] object-cover sm:h-[78px] sm:w-[92px]" /><div className="min-w-0"><h2 className="truncate text-sm font-bold">{selected.title}</h2><p className="mt-1 truncate text-xs text-muted-foreground">{selected.location}, {selected.state}</p><p className="mt-1 text-xs"><span className="text-sun">★</span> {selected.rating} <span className="text-muted-foreground">({selected.reviews})</span></p></div><Link to="/adventures/$slug" params={{ slug: selected.slug }} aria-label={`Open ${selected.title}`} className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"><ArrowRight className="h-4 w-4" /></Link></div>
    </div><DemoNote>This illustrative map highlights sample listings and is not a live navigation map.</DemoNote>
  </PageFrame>;
}

function DetailContent({ slug }: { slug: string }) {
  const adventure = adventures.find((item) => item.slug === slug) ?? adventures[0];
  const [tab, setTab] = useState("Overview");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [party, setParty] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingNotice, setBookingNotice] = useState("");
  const { saved, toggleSaved } = useSavedAdventures();
  const tabs = ["Overview", "Packages", "Availability", "Reviews"];
  const submitBooking = () => setBookingNotice(bookingDate ? "Your sample booking request is ready. No reservation has been made." : "Choose a preferred date to continue the sample booking request.");
  const share = async () => {
    try { if (navigator.share) await navigator.share({ title: adventure.title, url: window.location.href }); else await navigator.clipboard.writeText(window.location.href); } catch { /* User cancelled share or clipboard is unavailable. */ }
  };
  return <PageFrame><PageBack />
    <section className="relative isolate h-[380px] overflow-hidden bg-primary sm:h-[460px]"><img src={adventure.image} alt={adventure.title} width={1280} height={960} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover"/><span className="photo-fade absolute inset-0"/><div className="absolute inset-x-4 top-4 flex justify-between sm:inset-x-6 sm:top-6"><Link to="/explore" aria-label="Back to adventures" className="grid h-10 w-10 place-items-center rounded-full bg-overlay/30 text-on-photo backdrop-blur"><ChevronLeft /></Link><div className="flex gap-2"><SaveButton adventure={adventure} saved={saved.includes(adventure.slug)} onToggle={() => toggleSaved(adventure.slug)} /><Button type="button" variant="soft" size="icon" aria-label="Share adventure" onClick={share}><Share2 /></Button></div></div><div className="absolute inset-x-5 bottom-6 text-on-photo sm:inset-x-8 sm:bottom-8"><span className="inline-flex rounded-full bg-card/85 px-3 py-1 text-[11px] font-bold text-foreground">{adventure.category} adventure</span><h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-5xl">{adventure.title}</h1><p className="mt-2 flex items-center gap-1.5 text-sm"><MapPin className="h-4 w-4" />{adventure.location}, {adventure.state}</p><p className="mt-2 text-sm"><span className="text-sun">★</span> {adventure.rating} <span className="text-on-photo/75">({adventure.reviews} reviews)</span></p></div><span className="absolute bottom-6 right-5 rounded-full bg-overlay/45 px-2.5 py-1 text-xs font-semibold text-on-photo sm:bottom-8 sm:right-8">1 / 6</span></section>
    <div className="mt-5 grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10"><div className="min-w-0"><nav aria-label="Experience details" className="no-scrollbar flex gap-6 overflow-x-auto border-b border-border">{tabs.map((item) => <button type="button" key={item} aria-current={tab === item ? "page" : undefined} onClick={() => { setTab(item); document.getElementById("detail-content")?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }} className={`shrink-0 border-b-2 px-1 pb-3 text-sm font-semibold ${tab === item ? "border-primary text-foreground" : "border-transparent text-muted-foreground"}`}>{item}</button>)}</nav>
      <div id="detail-content" className="pt-6"><Eyebrow>{tab}</Eyebrow>{tab === "Overview" && <><h2 className="font-display text-xl font-bold">About the experience</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{adventure.description}</p><div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">{[[Clock3, "Duration", adventure.duration], [Compass, "Difficulty", adventure.difficulty], [Users, "Minimum age", adventure.age], [Users, "Group size", adventure.group]].map(([Icon, name, value]) => { const MetricIcon = Icon as typeof Clock3; return <div key={name as string} className="border-t border-border pt-3"><MetricIcon className="mb-2 h-[18px] w-[18px] text-primary"/><p className="text-xs text-muted-foreground">{name as string}</p><p className="mt-1 text-sm font-semibold">{value as string}</p></div>; })}</div><div className="mt-8 border-t border-border pt-6"><h3 className="font-display text-lg font-bold">A considered adventure</h3><p className="mt-2 flex items-start gap-2 text-sm leading-6 text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary"/>Sample listing for discovery; operator credentials, schedules and safety details require confirmation before booking.</p></div></>}
        {tab === "Packages" && <div className="grid max-w-xl gap-3 sm:grid-cols-2"><div className="border border-border bg-card p-4"><p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Included</p><h3 className="mt-2 font-display text-lg font-bold">Guided experience</h3><p className="mt-2 text-sm text-muted-foreground">A sample package with local guidance and essential equipment.</p><p className="mt-4 font-semibold">From ₹{adventure.price} / person</p></div><div className="border border-border bg-card p-4"><p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Good to know</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Package details are illustrative. Confirm actual inclusions with the operator.</p></div></div>}
        {tab === "Availability" && <div className="max-w-md border border-border bg-card p-5"><label className="block text-sm font-semibold" htmlFor="availability-date">Choose a preferred date</label><input id="availability-date" type="date" value={bookingDate} onChange={(event) => setBookingDate(event.target.value)} className="mt-3 h-11 w-full border border-input bg-background px-3 text-sm"/><p className="mt-3 text-xs text-muted-foreground">Availability shown here is for demonstration and is not live operator inventory.</p><Button className="mt-4" onClick={submitBooking}>Check sample availability</Button></div>}
        {tab === "Reviews" && <div className="max-w-lg border border-border bg-card p-5"><p className="flex items-center gap-2 font-display text-xl font-bold"><Star className="h-5 w-5 fill-sun text-sun"/>{adventure.rating}<span className="text-sm font-normal text-muted-foreground">from {adventure.reviews} sample reviews</span></p><p className="mt-4 text-sm leading-6 text-muted-foreground">Review information is illustrative. Verified operator reviews are not connected in this demo.</p></div>}
      </div></div>
      <aside className="h-fit border border-border bg-card p-5 shadow-soft lg:sticky lg:top-5"><p className="text-xs text-muted-foreground">Starting from</p><div className="mt-1"><PriceLabel adventure={adventure}/></div><p className="mt-1 text-xs text-muted-foreground">Price shown is a sample.</p><Button className="mt-5 w-full rounded-full" size="pill" onClick={() => { setBookingNotice(""); setBookingOpen(true); }}>Book now <ArrowRight /></Button><div className="mt-5 grid gap-3 border-t border-border pt-4 text-xs text-muted-foreground"><p className="flex items-center gap-2"><Check className="h-4 w-4 text-sun"/>Free cancellation is not confirmed</p><p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-sun"/>Operator details to be verified</p></div></aside>
    </div>
    {bookingOpen && <div role="presentation" className="fixed inset-0 z-50 grid place-items-center bg-overlay/55 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setBookingOpen(false); }}><section role="dialog" aria-modal="true" aria-labelledby="booking-heading" className="w-full max-w-md border border-border bg-card p-5 shadow-lift sm:p-7"><div className="flex items-start justify-between gap-4"><div><Eyebrow>Sample booking</Eyebrow><h2 id="booking-heading" className="font-display text-2xl font-bold">Plan your experience</h2></div><Button variant="ghost" size="icon" aria-label="Close booking" onClick={() => setBookingOpen(false)}><X /></Button></div><p className="mt-2 text-sm text-muted-foreground">{adventure.title}</p><label className="mt-5 block text-sm font-semibold" htmlFor="booking-date">Preferred date</label><input id="booking-date" type="date" value={bookingDate} onChange={(event) => setBookingDate(event.target.value)} className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm"/><div className="mt-5 flex items-center justify-between"><span className="text-sm font-semibold">People</span><div className="flex items-center gap-3"><Button type="button" size="icon" variant="outline" aria-label="Remove one person" disabled={party <= 1} onClick={() => setParty((value) => Math.max(1, value - 1))}><Minus /></Button><span className="w-6 text-center font-semibold">{party}</span><Button type="button" size="icon" variant="outline" aria-label="Add one person" onClick={() => setParty((value) => value + 1)}><Plus /></Button></div></div><div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm"><span>Total sample price</span><span className="font-display text-xl font-bold">₹{(Number(adventure.price.replace(",", "")) * party).toLocaleString("en-IN")}</span></div><Button className="mt-5 w-full" onClick={submitBooking}>Continue</Button>{bookingNotice && <InlineNotice>{bookingNotice}</InlineNotice>}<DemoNote>This is a frontend demo. It does not confirm a reservation or process payment.</DemoNote></section></div>}
  </PageFrame>;
}

export function AdventureDetailPage() {
  const { slug } = useParams({ from: "/adventures/$slug" });
  return <DetailContent slug={slug} />;
}

export function WishlistPage() {
  const { saved, toggleSaved } = useSavedAdventures();
  const items = adventures.filter((adventure) => saved.includes(adventure.slug));
  return <PageFrame><PageTitle eyebrow="Keep close what calls you" title="Saved adventures" description="Your shortlist of experiences to come back to." />{items.length ? <AdventureList items={items} saved={saved} onToggleSaved={toggleSaved}/> : <div className="border border-dashed border-border py-16 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary"><Heart className="h-6 w-6"/></span><h2 className="mt-4 font-display text-xl font-bold">Your saved list is waiting</h2><p className="mt-2 text-sm text-muted-foreground">Tap the heart on an adventure to keep it here.</p><Link to="/explore" className="mt-5 inline-flex"><Button>Explore adventures <ArrowRight /></Button></Link></div>}</PageFrame>;
}

export function PlannerPage() {
  const vibes = ["A little adrenaline", "Slow down in nature", "On, in or under water", "A weekend away"];
  const [selected, setSelected] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [destination, setDestination] = useState("");
  const [notice, setNotice] = useState("");
  const { saved, toggleSaved } = useSavedAdventures();
  const toggleVibe = (vibe: string) => setSelected((current) => current.includes(vibe) ? current.filter((item) => item !== vibe) : [...current, vibe]);
  const resultItems = useMemo(() => adventures.filter((adventure) => {
    const placeMatch = !destination || `${adventure.location} ${adventure.state}`.toLowerCase().includes(destination.toLowerCase());
    const vibeMatch = selected.length === 0 || selected.some((vibe) => vibe.includes("adrenaline") ? ["Air", "Water"].includes(adventure.category) : vibe.includes("nature") ? ["Camping", "Land"].includes(adventure.category) : vibe.includes("water") ? adventure.category === "Water" : true);
    return placeMatch && vibeMatch;
  }), [destination, selected]);
  return <PageFrame><PageTitle eyebrow="Your kind of outdoors" title="Adventure trip planner" description="A simple starting point for a trip that feels like you." />
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_350px]"><div><fieldset><legend className="mb-4 font-display text-xl font-bold">What sounds good?</legend><div className="grid gap-2 sm:grid-cols-2">{vibes.map((vibe) => <VibeButton key={vibe} selected={selected.includes(vibe)} onClick={() => toggleVibe(vibe)}>{vibe}</VibeButton>)}</div></fieldset><label className="mt-8 block font-display text-xl font-bold" htmlFor="planner-destination">Any place in mind?</label><div className="mt-3 flex max-w-xl items-center gap-3 border border-border bg-card px-4"><MapPin className="h-4 w-4 shrink-0 text-primary"/><input id="planner-destination" value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="e.g. Goa, Coorg, the Himalayas" className="h-12 w-full bg-transparent text-sm outline-none"/></div><Button className="mt-6" onClick={() => { setShowResults(true); setNotice("Your sample recommendations are ready."); document.getElementById("planner-results")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}><Sparkles />Find my adventures</Button><DemoNote>This planner uses sample listings and simple preference matching. No AI service, live inventory or booking is connected.</DemoNote></div>
      <aside className="h-fit border border-border bg-secondary/65 p-5"><Eyebrow>A trip should feel like yours</Eyebrow><h2 className="font-display text-xl font-bold">Start with a mood, not a checklist.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Pick one or more moods, add a place if you have one, and we’ll narrow down the sample experiences.</p><div className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground"><p className="flex gap-2"><CalendarDays className="h-4 w-4 shrink-0"/>Dates and live schedules are not connected yet.</p></div></aside></div>
    {showResults && <section id="planner-results" className="scroll-mt-5 mt-12"><SectionHeading eyebrow="Your starting point" title="Experiences for you" />{notice && <p role="status" className="mb-4 text-sm text-muted-foreground">{notice}</p>}<AdventureList items={resultItems} saved={saved} onToggleSaved={toggleSaved}/></section>}
  </PageFrame>;
}

function AccessForm({ signup }: { signup: boolean }) {
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  return <PageFrame><div className="mx-auto grid max-w-4xl gap-8 py-8 md:grid-cols-[1fr_0.85fr] md:items-center"><div><Eyebrow>Welcome to VIVERE</Eyebrow><h1 className="max-w-lg font-display text-4xl font-extrabold leading-tight sm:text-5xl">A little more alive starts here.</h1><p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">Save the experiences you love and keep your next outdoor escape close.</p></div><form onSubmit={(event) => { event.preventDefault(); setNotice(`A demo ${signup ? "sign-up" : "sign-in"} for ${email} is not connected to an account service.`); }} className="border border-border bg-card p-6 shadow-soft sm:p-8"><Eyebrow>{signup ? "Create an account" : "Welcome back"}</Eyebrow><h2 className="font-display text-2xl font-bold">{signup ? "Sign up" : "Log in"}</h2>{signup && <label className="mt-5 block text-sm font-semibold">Your name<input required autoComplete="name" className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm" placeholder="Your name"/></label>}<label className="mt-5 block text-sm font-semibold">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm" placeholder="you@example.com"/></label><label className="mt-4 block text-sm font-semibold">Password<input required type="password" autoComplete={signup ? "new-password" : "current-password"} className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm" placeholder="••••••••"/></label><Button className="mt-5 w-full">{signup ? "Create demo account" : "Continue"}<ArrowRight /></Button>{notice && <InlineNotice>{notice}</InlineNotice>}<DemoNote>Account creation and sign-in are not connected in this demo.</DemoNote><p className="mt-5 text-sm text-muted-foreground">{signup ? "Already have an account?" : "New to VIVERE?"} <Link to={signup ? "/login" : "/signup"} className="font-semibold text-foreground underline underline-offset-4">{signup ? "Log in" : "Sign up"}</Link></p></form></div></PageFrame>;
}

export function LoginPage() { return <AccessForm signup={false}/>; }
export function SignupPage() { return <AccessForm signup/>; }

export function OperatorsPage() {
  const [notice, setNotice] = useState("");
  return <PageFrame><PageTitle eyebrow="For local adventure teams" title="Grow with VIVERE" description="Bring your outdoor experiences to travellers looking for their next story." />
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]"><div><Eyebrow>Built around good experiences</Eyebrow><h2 className="max-w-xl font-display text-3xl font-bold">Your local knowledge belongs on the map.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">VIVERE is designed to help people discover adventure operators across India. This page is a preview of the operator portal, not a live partner service.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{[[ShieldCheck, "Trust and details", "Share the information travellers need before they go."], [Compass, "Made for discovery", "Present experiences to people exploring India."], [CalendarDays, "Manage availability", "A future partner portal can support schedules and bookings."], [Users, "Local connections", "Help guests find experienced teams on the ground."]].map(([Icon, title, text]) => { const BenefitIcon = Icon as typeof ShieldCheck; return <div key={title as string} className="border-t border-border py-4"><BenefitIcon className="mb-3 h-5 w-5 text-sun"/><h3 className="font-display font-bold">{title as string}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{text as string}</p></div>; })}</div></div><form onSubmit={(event) => { event.preventDefault(); setNotice("Thanks for your interest. This partner enquiry is a demo and has not been sent."); }} className="h-fit border border-border bg-card p-5 sm:p-7"><Eyebrow>Partner interest</Eyebrow><h2 className="font-display text-xl font-bold">Tell us about your team</h2><label className="mt-5 block text-sm font-semibold">Operator or team name<input required className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm"/></label><label className="mt-4 block text-sm font-semibold">Contact email<input required type="email" className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm"/></label><label className="mt-4 block text-sm font-semibold">What do you offer?<textarea required rows={4} className="mt-2 w-full resize-y border border-input bg-background px-3 py-2 text-sm" placeholder="Activities, location and experience"/></label><Button className="mt-5 w-full">Send partner enquiry <ArrowRight/></Button>{notice && <InlineNotice>{notice}</InlineNotice>}<DemoNote>Partner onboarding and enquiry delivery are not connected in this preview.</DemoNote></form></div>
  </PageFrame>;
}
