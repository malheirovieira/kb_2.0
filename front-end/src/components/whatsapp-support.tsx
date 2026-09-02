import { MessageCircle } from "lucide-react";

export function WhatsappSupport() {
  return (
    <a
      href="https://wa.me/"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={2} />
      WhatsApp Suporte
    </a>
  );
}
