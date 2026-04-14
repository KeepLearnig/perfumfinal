import { MessageCircle } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export function WhatsAppButton() {
  const { socials } = useSite();
  const whatsapp = (socials.whatsapp || '').replace(/\D/g, '');

  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" />
    </a>
  );
}
