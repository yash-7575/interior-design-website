import Hero from "@/sections/Hero";
import About from "@/sections/About";
import FeaturedSlider from "@/sections/FeaturedSlider";
import Services from "@/sections/Services";
import Listings from "@/sections/Listings";
import Journal from "@/sections/Journal";

export default function Home() {
  return (
    <div className="max-w-[1500px] mx-auto rounded-2xl md:rounded-[28px] overflow-hidden shadow-2xl shadow-black/10">
      <Hero />
      <About />
      <FeaturedSlider />
      <Services />
      <Listings />
      <Journal />
    </div>
  );
}
