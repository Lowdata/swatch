import Link from "next/link";
import { ArrowRight, Sparkles, Layers, Palette, Blend } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6 py-20 md:py-32">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-medium text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            v3.0 Live
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-foreground">
            Swatch
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
            A premium design utility for front-end developers: tune shadows, gradients, palettes, and full brand themes, then copy the exact code.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/tool" 
              className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 hover:scale-105 transition-all shadow-sm w-full sm:w-auto"
            >
              Open Swatch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-surface-2 border border-border text-foreground px-8 py-4 font-bold text-lg hover:border-accent hover:text-accent transition-all hover:scale-105 shadow-sm w-full sm:w-auto"
            >
              Built for Digital Heroes
            </a>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          
          <div className="flex flex-col p-8 rounded-2xl bg-surface-1 border border-border group hover:bg-surface-2 transition-colors relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center mb-6 shadow-sm border border-border group-hover:border-accent/50 transition-colors">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">AI Theme ✨</h3>
            <p className="text-muted-foreground">Describe a brand, get a full color system.</p>
          </div>

          <div className="flex flex-col p-8 rounded-2xl bg-surface-1 border border-border group hover:bg-surface-2 transition-colors relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center mb-6 shadow-sm border border-border group-hover:border-accent/50 transition-colors">
              <Palette className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Palette</h3>
            <p className="text-muted-foreground">Generate a 5-color harmony from one base hex.</p>
          </div>

          <div className="flex flex-col p-8 rounded-2xl bg-surface-1 border border-border group hover:bg-surface-2 transition-colors relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center mb-6 shadow-sm border border-border group-hover:border-accent/50 transition-colors">
              <Blend className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Gradient</h3>
            <p className="text-muted-foreground">Blend colors into linear or radial gradients.</p>
          </div>

          <div className="flex flex-col p-8 rounded-2xl bg-surface-1 border border-border group hover:bg-surface-2 transition-colors relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center mb-6 shadow-[0_8px_30px_rgba(217,164,65,0.1)] border border-border group-hover:border-accent/50 transition-colors">
              <Layers className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Shadow</h3>
            <p className="text-muted-foreground">Layer and tune box-shadow values.</p>
          </div>

        </section>

        {/* Why this App */}
        <section className="mt-32 max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom-16 duration-1000">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Why I Built Swatch</h2>
          <div className="p-8 rounded-2xl bg-surface-1 border border-border text-left">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I have personally used scattered online tools for generating palettes, CSS gradients, and box-shadows for years. While they exist, they are often cluttered with ads, require paid subscriptions for premium features, or just have a clunky, dated UX.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I wanted a single, unified premium tool that feels like a native desktop app—ad-free, lightning fast, and instantly outputs exact code snippets so I can get back to building. Swatch solves this personal pain point, making UI design workflows simpler, faster, and completely free.
            </p>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-border bg-surface-1 mt-auto">
        <div className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md bg-accent text-accent-foreground px-4 py-2 font-medium text-sm transition-all hover:brightness-110 active:scale-95 shadow-sm"
          >
            Built for Digital Heroes
          </a>
          <div className="text-sm text-muted-foreground text-center sm:text-right">
            Ayush Pahuja <br className="sm:hidden" />
            <span className="hidden sm:inline"> • </span>
            <a href="mailto:ayush.pahuja090@gmail.com" className="hover:text-foreground transition-colors">
              ayush.pahuja090@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
