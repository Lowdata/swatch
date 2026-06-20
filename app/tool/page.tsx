import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import GradientGenerator from "@/components/tools/GradientGenerator";
import PaletteGenerator from "@/components/tools/PaletteGenerator";
import ShadowGenerator from "@/components/tools/ShadowGenerator";
import AIThemeGenerator from "@/components/tools/AIThemeGenerator";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Tabs defaultValue="ai-theme" orientation="vertical" className="flex flex-col md:flex-row w-full flex-1">
        
        {/* Left Rail */}
        <aside className="w-full md:w-[300px] flex-shrink-0 border-r border-border bg-card p-6 flex flex-col sticky top-0 h-screen overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Swatch</h1>
            <p className="text-sm text-muted-foreground mt-1">Premium Design Utility</p>
          </div>

          <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-2 items-stretch w-full mb-8">
            <TabsTrigger value="ai-theme" className="flex flex-col items-start text-left px-4 py-3 data-[state=active]:bg-secondary rounded-lg transition-colors hover:bg-secondary/50">
              <span className="font-semibold text-sm">AI Theme ✨</span>
            </TabsTrigger>
            <TabsTrigger value="palette" className="flex flex-col items-start text-left px-4 py-3 data-[state=active]:bg-secondary rounded-lg transition-colors hover:bg-secondary/50">
              <span className="font-semibold text-sm">Palette</span>
            </TabsTrigger>
            <TabsTrigger value="gradient" className="flex flex-col items-start text-left px-4 py-3 data-[state=active]:bg-secondary rounded-lg transition-colors hover:bg-secondary/50">
              <span className="font-semibold text-sm">Gradient</span>
            </TabsTrigger>
            <TabsTrigger value="shadow" className="flex flex-col items-start text-left px-4 py-3 data-[state=active]:bg-secondary rounded-lg transition-colors hover:bg-secondary/50">
              <span className="font-semibold text-sm">Shadow</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-auto pt-8 border-t border-border">
            <footer className="flex flex-col gap-4 text-sm">
              <a
                href="https://digitalheroesco.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit rounded-md bg-accent text-accent-foreground px-4 py-2 font-medium transition-all hover:brightness-110 active:scale-95 shadow-sm"
              >
                Built for Digital Heroes
              </a>
              <div className="text-muted-foreground">
                Ayush Pahuja
                <br />
                <a href="mailto:ayush.pahuja090@gmail.com" className="hover:text-foreground transition-colors">
                  ayush.pahuja090@gmail.com
                </a>
              </div>
            </footer>
          </div>
        </aside>

        {/* Flexible Preview Stage */}
        <section className="flex-1 bg-background p-6 md:p-12 overflow-y-auto">
          <TabsContent value="ai-theme" className="mt-0 h-full">
            <AIThemeGenerator />
          </TabsContent>
          <TabsContent value="palette" className="mt-0 h-full">
            <PaletteGenerator />
          </TabsContent>
          <TabsContent value="gradient" className="mt-0 h-full">
            <GradientGenerator />
          </TabsContent>
          <TabsContent value="shadow" className="mt-0 h-full">
            <ShadowGenerator />
          </TabsContent>
        </section>

      </Tabs>
    </main>
  );
}