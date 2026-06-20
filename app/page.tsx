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
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 flex flex-col md:flex-row">
      <Tabs defaultValue="shadow" orientation="vertical" className="flex flex-col md:flex-row w-full flex-1">
        
        {/* Left Rail */}
        <aside className="w-full md:w-[300px] flex-shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-6 flex flex-col min-h-screen">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Swatch</h1>
            <p className="text-sm text-neutral-500 mt-1">Premium Design Utility</p>
          </div>

          <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-1 items-stretch w-full mb-8">
            <TabsTrigger value="shadow" className="justify-start px-4 py-2.5 data-[state=active]:bg-neutral-100 dark:data-[state=active]:bg-neutral-800 rounded-lg">
              Shadow
            </TabsTrigger>
            <TabsTrigger value="gradient" className="justify-start px-4 py-2.5 data-[state=active]:bg-neutral-100 dark:data-[state=active]:bg-neutral-800 rounded-lg">
              Gradient
            </TabsTrigger>
            <TabsTrigger value="palette" className="justify-start px-4 py-2.5 data-[state=active]:bg-neutral-100 dark:data-[state=active]:bg-neutral-800 rounded-lg">
              Palette
            </TabsTrigger>
            <TabsTrigger value="ai-theme" className="justify-start px-4 py-2.5 data-[state=active]:bg-neutral-100 dark:data-[state=active]:bg-neutral-800 rounded-lg">
              AI Theme ✨
            </TabsTrigger>
          </TabsList>

          <div className="mt-auto pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <footer className="flex flex-col gap-4 text-sm">
              <a
                href="https://digitalheroesco.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit rounded-md bg-black dark:bg-white text-white dark:text-black px-4 py-2 font-medium transition-transform hover:scale-105 active:scale-95"
              >
                Built for Digital Heroes
              </a>
              <div className="text-neutral-500">
                Ayush Pahuja
                <br />
                <a href="mailto:ayush.pahuja090@gmail.com" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
                  ayush.pahuja090@gmail.com
                </a>
              </div>
            </footer>
          </div>
        </aside>

        {/* Flexible Preview Stage */}
        <section className="flex-1 bg-neutral-50 dark:bg-neutral-900 p-6 md:p-12 overflow-y-auto">
          <TabsContent value="shadow" className="mt-0 h-full">
            <ShadowGenerator />
          </TabsContent>
          <TabsContent value="gradient" className="mt-0 h-full">
            <GradientGenerator />
          </TabsContent>
          <TabsContent value="palette" className="mt-0 h-full">
            <PaletteGenerator />
          </TabsContent>
          <TabsContent value="ai-theme" className="mt-0 h-full">
            <AIThemeGenerator />
          </TabsContent>
        </section>

      </Tabs>
    </main>
  );
}