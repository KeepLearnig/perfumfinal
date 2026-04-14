import { Phone, Instagram, Facebook } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import { EditableLogo } from '@/components/EditableLogo';

export function Footer() {
  const { navItems, socials, footer } = useSite();
  const whatsappUrl = `https://wa.me/${(socials.whatsapp || '').replace(/\D/g, '')}`;

  return (
    <footer id="contacto" className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 items-start">
            <div className="flex flex-col items-center lg:items-start gap-4">
              <EditableLogo size="md" />
              <div className="flex gap-3">
                <a href={socials.instagram || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href={socials.facebook || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2">
                {navItems.map(link => (
                  <a key={link.id} href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                ))}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{footer.consumerText} <a href={footer.consumerLink} target="_blank" rel="noopener noreferrer" className="text-[#f5a9a9] hover:underline">Ingresá acá</a>.</p>
              <p className="text-sm"><a href={footer.regretLink} target="_blank" rel="noopener noreferrer" className="text-[#f5a9a9] hover:underline">{footer.regretText}</a></p>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-3">
              <a href={whatsappUrl} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4" /><span>{socials.whatsapp}</span>
              </a>
              <div className="bg-white text-black px-3 py-1 rounded text-xs font-bold">{footer.shippingBadge}</div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-5 text-center text-xs text-gray-400">
            <p>{footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
