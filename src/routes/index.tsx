import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroTable from "../assets/hero-table.jpg";
import signatureSeaBass from "../assets/signature-sea-bass.jpg";
import ambienceMain from "../assets/ambience-main.jpg";
import ambienceDetail from "../assets/ambience-detail.jpg";
import ambienceBar from "../assets/ambience-bar.jpg";

type MenuItem = {
  name: string;
  price: string;
  desc: string;
  badge?: string;
};


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lumière — Contemporary Mediterranean Dining" },
      { name: "description", content: "A fine-casual restaurant celebrating seasonal ingredients, architectural plating, and the warmth of a shared table." },
      { property: "og:title", content: "Lumière — Contemporary Mediterranean Dining" },
      { property: "og:description", content: "Seasonal ingredients, architectural plating, and the warmth of a shared table." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function ScrollReveal({
  children,
  className = "",
  delay = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`scroll-reveal ${delay} ${className}`}>
      {children}
    </div>
  );
}

const menuCategories = ["Small Plates", "Mains", "Botanicals", "Desserts"] as const;
const menuData: Record<(typeof menuCategories)[number], MenuItem[]> = {
  "Small Plates": [
    {
      name: "Charred Heirloom Carrots",
      price: "18",
      desc: "Whipped tahini, wildflower honey, toasted dukkah, and micro-cilantro.",
    },
    {
      name: "Wild Mushroom Carpaccio",
      price: "22",
      desc: "Shaved truffle, 24-month aged parmesan, and cold-pressed olive oil.",
    },
    {
      name: "Crispy Salted Artichokes",
      price: "16",
      desc: "Meyer lemon aioli with smoked paprika and flaky sea salt.",
    },
    {
      name: "Burrata & Roasted Peaches",
      price: "20",
      desc: "Aged balsamic, fresh basil, and sourdough crisps.",
    },
  ],
  Mains: [
    {
      name: "Saffron Sea Bass",
      price: "38",
      desc: "Pan-seared wild-caught bass, fennel purée, and hand-threaded saffron foam.",
      badge: "Signature",
    },
    {
      name: "Wood-Fired Lamb Chops",
      price: "44",
      desc: "Charred over olive wood, served with smoked eggplant and mint yogurt.",
      badge: "Signature",
    },
    {
      name: "Hand-Rolled Pappardelle",
      price: "32",
      desc: "Slow-braised short rib ragu, pecorino, and black pepper.",
    },
    {
      name: "Grilled Cauliflower Steak",
      price: "28",
      desc: "Romesco sauce, pickled raisins, and crispy capers.",
    },
  ],
  Botanicals: [
    {
      name: "Garden Herb Salad",
      price: "15",
      desc: "Little gem lettuce, shaved fennel, edible flowers, and citrus vinaigrette.",
    },
    {
      name: "Roasted Beet Tartine",
      price: "17",
      desc: "Whipped ricotta, dill, and toasted sunflower seeds on sourdough.",
    },
  ],
  Desserts: [
    {
      name: "Olive Oil Cake",
      price: "14",
      desc: "Citrus glaze, candied pistachios, and crème fraîche.",
    },
    {
      name: "Chocolate Ganache Tart",
      price: "15",
      desc: "Sea salt, hazelnut praline, and espresso caramel.",
    },
  ],
};

const beverages = [
  { name: "Lumière Spritz", price: "16", desc: "Aperol, prosecco, orange blossom, and Mediterranean tonic." },
  { name: "Saffron Gin Fizz", price: "18", desc: "Botanical gin, saffron syrup, lemon, and egg white." },
  { name: "House Red / White", price: "14 / 52", desc: "Rotating selection from small Mediterranean producers." },
  { name: "Sparkling Rosemary Lemonade", price: "9", desc: "Fresh rosemary, lemon, and soda — non-alcoholic." },
];

function Index() {
  const [activeCategory, setActiveCategory] = useState<(typeof menuCategories)[number]>("Small Plates");

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
        <a href="/" className="font-display italic text-2xl tracking-tight">
          Lumière
        </a>
        <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest items-center">
          <a href="#concept" className="hover:text-primary transition-colors">Concept</a>
          <a href="#menu" className="hover:text-primary transition-colors">Menu</a>
          <a href="#ambience" className="hover:text-primary transition-colors">Ambience</a>
          <a href="#reserve" className="px-4 py-1.5 ring-1 ring-foreground rounded-full hover:bg-foreground hover:text-background transition-all">
            Reservations
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroTable}
            alt="A warm Mediterranean table spread with ceramic plates, golden lighting, and linen napkins"
            width={1920}
            height={1088}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 text-center max-w-3xl px-6 animate-reveal">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/80 mb-6">
            Contemporary Mediterranean Dining
          </p>
          <h1 className="font-display text-6xl md:text-8xl text-white drop-shadow-sm text-balance leading-[0.9]">
            The art of <span className="italic">slow</span> dining.
          </h1>
          <p className="mt-6 text-white/90 font-sans text-lg md:text-xl max-w-xl mx-auto text-pretty">
            Seasonal ingredients, architectural plating, and the warmth of a shared table.
          </p>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="max-w-6xl mx-auto py-24 px-6">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2 block">
                (01) The Concept
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-balance mb-6">
                Where Mediterranean soul meets modern craft.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Lumière is a fine-casual restaurant built on the belief that great food deserves time, attention, and company. We source seasonal produce from local farms and coastal markets, then prepare each dish with fire, restraint, and a deep respect for flavor.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our target guests are curious diners — couples, professionals, and food lovers — who want refined cooking without the formality of traditional fine dining. Every visit should feel like a small celebration of the present moment.
              </p>
            </div>
            <div className="bg-muted/50 border border-border rounded-2xl p-8 md:p-10">
              <h3 className="font-display text-2xl mb-6">At a Glance</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Cuisine</span>
                  <span className="font-medium">Contemporary Mediterranean</span>
                </li>
                <li className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Style</span>
                  <span className="font-medium">Fine-Casual</span>
                </li>
                <li className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Price Range</span>
                  <span className="font-medium">$$$ — Moderate to Premium</span>
                </li>
                <li className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Atmosphere</span>
                  <span className="font-medium">Warm, Intimate, Architectural</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Perfect For</span>
                  <span className="font-medium">Date Nights, Gatherings, Slow Meals</span>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Menu Section */}
      <section id="menu" className="max-w-6xl mx-auto py-24 px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2 block">
                (02) The Menu
              </span>
              <h2 className="font-display text-4xl md:text-5xl">Current Curations</h2>
            </div>
            <div className="flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-tighter">
              {menuCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? "border-b-2 border-primary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
          {menuData[activeCategory].map((item, index) => (
            <ScrollReveal
              key={item.name}
              className={`delay-${(index + 1) * 100}` as string}
            >
              <div className="group">
                <div className="flex justify-between items-baseline border-b border-border pb-2 group-hover:border-primary transition-colors">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    {item.name}
                    {item.badge && (
                      <span className="font-mono text-[9px] uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </h3>
                  <span className="font-mono text-sm">${item.price}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground max-w-[40ch]">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Signature Dish Spotlight */}
      <section className="bg-foreground text-background py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-16">
          <ScrollReveal>
            <img
              src={signatureSeaBass}
              alt="A perfectly plated pan-seared sea bass with saffron foam and microgreens"
              width={1024}
              height={1280}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover rounded-[min(2vw,24px)]"
            />
          </ScrollReveal>
          <ScrollReveal className="delay-200">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4 block">
              Featured Plating
            </span>
            <h2 className="font-display text-5xl md:text-7xl mb-8 leading-tight italic">
              The Saffron <br /> Sea Bass
            </h2>
            <p className="text-background/70 text-lg mb-8 max-w-md">
              Sustainably sourced wild-caught bass, pan-seared to perfection, served over a bed of fennel purée and finished with our signature hand-threaded saffron foam.
            </p>
            <a
              href="#reserve"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-mono text-[11px] uppercase tracking-widest hover:brightness-110 transition-all"
            >
              Reserve this experience
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Beverages Section */}
      <section className="max-w-6xl mx-auto py-24 px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2 block">
                (03) The Bar
              </span>
              <h2 className="font-display text-4xl md:text-5xl">Beverages</h2>
            </div>
            <p className="text-muted-foreground max-w-md text-sm">
              Mediterranean wines, botanical cocktails, and refreshing non-alcoholic options crafted to match the menu.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-10">
          {beverages.map((item, index) => (
            <ScrollReveal key={item.name} className={`delay-${(index + 1) * 100}` as string}>
              <div className="group">
                <div className="flex justify-between items-baseline border-b border-border pb-2 group-hover:border-primary transition-colors">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <span className="font-mono text-sm">${item.price}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground max-w-[40ch]">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Ambience & Interior */}
      <section id="ambience" className="py-24 px-6 max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl italic mb-4">Where Space Meets Spirit</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our dining room is designed as a sanctuary of soft light, natural textures, and quiet architectural detail.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-12 gap-4 h-[600px]">
          <div className="col-span-12 md:col-span-8 h-full scroll-reveal">
            <img
              src={ambienceMain}
              alt="Interior of Lumière restaurant with warm wood, soft lighting, and architectural concrete walls"
              width={1200}
              height={800}
              loading="lazy"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-4 h-full hidden md:grid">
            <div className="scroll-reveal delay-150">
              <img
                src={ambienceDetail}
                alt="Detail of a candle-lit corner table with linen textiles"
                width={816}
                height={816}
                loading="lazy"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="scroll-reveal delay-300">
              <img
                src={ambienceBar}
                alt="Modern bar area with brass accents"
                width={816}
                height={816}
                loading="lazy"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <ScrollReveal>
            <h3 className="font-mono text-[10px] uppercase tracking-widest mb-2">Design Language</h3>
            <p className="text-sm text-muted-foreground">
              Raw concrete, reclaimed oak, and soft linen create a warm, gallery-like atmosphere that lets the food take center stage.
            </p>
          </ScrollReveal>
          <ScrollReveal className="delay-100">
            <h3 className="font-mono text-[10px] uppercase tracking-widest mb-2">Lighting</h3>
            <p className="text-sm text-muted-foreground">
              Golden pendant lights and candlelit tables adapt from bright lunches to intimate dinners, creating a glow that flatters every plate.
            </p>
          </ScrollReveal>
          <ScrollReveal className="delay-200">
            <h3 className="font-mono text-[10px] uppercase tracking-widest mb-2">Service Style</h3>
            <p className="text-sm text-muted-foreground">
              Attentive but unobtrusive. Our team guides you through the menu like hosts, not servers, making every guest feel at home.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Branding & Promotions */}
      <section className="bg-muted/30 border-y border-border py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2 block">
                (04) Brand & Experience
              </span>
              <h2 className="font-display text-4xl md:text-5xl">Brand Ideas & Promotions</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <ScrollReveal>
              <h3 className="font-display text-2xl mb-4">Brand Identity</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>Logo: A minimalist flame mark paired with an elegant serif wordmark.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>Color palette: Warm stone, burnt sienna, soft cream, and deep ink.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>Voice: Refined, warm, and quietly poetic — never pretentious.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>Collaterals: Hand-pressed menus, wax-sealed reservation cards, and ceramic matchbooks.</span>
                </li>
              </ul>
            </ScrollReveal>
            <ScrollReveal className="delay-100">
              <h3 className="font-display text-2xl mb-4">Promotional Offers</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>
                    <strong className="text-foreground">Sunday Supper:</strong> A three-course family-style menu every Sunday, 15% off for parties of four or more.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>
                    <strong className="text-foreground">Lunch Prix Fixe:</strong> Two courses plus coffee, Tuesday through Friday.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>
                    <strong className="text-foreground">Birthday Candle:</strong> Complimentary dessert with a handwritten card for celebrations.
                  </span>
                </li>
              </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal className="delay-200">
            <div className="bg-background border border-border rounded-2xl p-8 md:p-10">
              <h3 className="font-display text-2xl mb-4">Social Media & Marketing Ideas</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-foreground mb-2">Plating Reels</h4>
                  <p>Short videos showing the final moments of a dish being finished — foam, herbs, drizzle.</p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-foreground mb-2">Farmer Spotlights</h4>
                  <p>Introduce the local producers behind the weekly menu to build trust and story.</p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-foreground mb-2">Guest Features</h4>
                  <p>Repost tagged photos from diners, with a monthly "Best Table" gift card giveaway.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Customer Experience */}
      <section className="max-w-6xl mx-auto py-24 px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl mb-6">The Lumière Promise</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              From the moment you arrive to the last sip of wine, we aim to create a sense of ease and occasion. Every detail — the temperature of the bread, the timing of the courses, the quiet refill of water — is considered so that you can focus on conversation, flavor, and connection.
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm border-t border-border pt-10">
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-foreground mb-1">Quality</h4>
                <p className="text-muted-foreground">Fresh, seasonal, and responsibly sourced.</p>
              </div>
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-foreground mb-1">Hospitality</h4>
                <p className="text-muted-foreground">Warm, knowledgeable, and never intrusive.</p>
              </div>
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-foreground mb-1">Consistency</h4>
                <p className="text-muted-foreground">Every plate should match the promise of the menu.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Reservation / Footer CTA */}
      <section id="reserve" className="bg-foreground text-background py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl italic mb-6">Reserve Your Table</h2>
          <p className="text-background/70 max-w-xl mx-auto mb-10">
            Join us for lunch, dinner, or Sunday supper. We recommend booking in advance for weekend evenings.
          </p>
          <a
            href="mailto:hello@lumiere.example.com"
            className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-mono text-[11px] uppercase tracking-widest hover:brightness-110 transition-all"
          >
            Request a Reservation
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 items-start">
          <div className="max-w-xs">
            <span className="font-display italic text-3xl block mb-4">Lumière</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              1242 Architectural Way, Suite 400
              <br />
              San Francisco, CA 94103
            </p>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest mb-4">Hours</h4>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>Tue – Thu: 5pm – 10pm</li>
                <li>Fri – Sat: 5pm – 11pm</li>
                <li>Sun: 11am – 3pm</li>
                <li>Mon: Closed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest mb-4">Follow</h4>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Journal</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Reservations</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          <span>&copy; 2024 Lumière Group</span>
          <span className="text-primary">Taste the Light</span>
        </div>
      </footer>
    </div>
  );
}
