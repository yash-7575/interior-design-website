import { MessageCircle } from "lucide-react";
import { whatsappLink, defaultEnquiry } from "@/data/business";

/**
 * Persistent floating WhatsApp button. WhatsApp is the studio's primary
 * inquiry channel, so it stays reachable from every page and every scroll
 * position.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(defaultEnquiry)}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 bg-[#25d366] text-white pl-4 pr-5 py-3.5 rounded-full shadow-lg shadow-black/20 hover:bg-[#1fb855] hover:scale-105 transition-all duration-300"
    >
      <MessageCircle className="w-5 h-5" strokeWidth={2} />
      <span className="hidden sm:inline text-sm font-medium">Chat on WhatsApp</span>
    </a>
  );
}
