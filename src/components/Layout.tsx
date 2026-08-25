import { Outlet } from "react-router";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#e9ebef]">
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
