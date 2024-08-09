import Insight from "@/components/main/Insights";
import Hero from "@/components/main/Hero";
import MapWithDirections from "@/components/main/Skills";
import MapWithAccidents from "@/components/main/Projects";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Insight />
        <MapWithAccidents />
        <MapWithDirections />
      </div>
    </main>
  );
}
