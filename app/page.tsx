import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import GradientGenerator from "@/components/tools/GradientGenerator";
import PaletteGenerator from "@/components/tools/PaletteGenerator";
import ShadowGenerator from "@/components/tools/ShadowGenerator";
export default function Home() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto p-8">

      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          Swatch
        </h1>

        <p className="text-muted-foreground mt-2">
          CSS Shadow, Gradient &
          Palette Lab
        </p>

      </div>

      <Tabs defaultValue="palette">

        <TabsList>
          <TabsTrigger value="shadow">
            Shadow
          </TabsTrigger>

          <TabsTrigger value="gradient">
            Gradient
          </TabsTrigger>

          <TabsTrigger value="palette">
            Palette
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shadow">
          <ShadowGenerator />
        </TabsContent>

        <TabsContent value="gradient">
          <GradientGenerator />
        </TabsContent>

        <TabsContent value="palette">
          <PaletteGenerator />
        </TabsContent>

      </Tabs>

      <footer className="mt-20 flex flex-col gap-4">

        <a
          href="https://digitalheroesco.com"
          target="_blank"
          className="inline-flex w-fit rounded-full bg-black text-white px-5 py-2"
        >
          Built for Digital Heroes
        </a>

        <div>
          Ayush Pahuja
          <br />
          your-email@example.com
        </div>

      </footer>

    </main>
  );
}