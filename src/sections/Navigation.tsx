import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSite } from '@/context/SiteContext';

function NavLink({ label, href, hasDropdown, content, onNavigate }: { label: string; href: string; hasDropdown?: boolean; content?: string; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      event.preventDefault();
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (href === '#') window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    onNavigate?.();
  };

  return (
    <div className="relative">
      <a
        href={href}
        onClick={handleClick}
        onMouseEnter={() => hasDropdown && setOpen(true)}
        onMouseLeave={() => hasDropdown && setOpen(false)}
        className="flex items-center gap-1 text-sm font-medium hover:text-[#f5a9a9] transition-colors"
      >
        {label}
        {hasDropdown && <ChevronDown className="w-4 h-4" />}
      </a>
      {hasDropdown && content && open && (
        <div
          className="absolute left-0 top-full mt-2 z-30 min-w-[260px] rounded-xl border bg-white text-gray-700 shadow-xl p-4"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const { navItems } = useSite();

  return (
    <nav className="bg-[#1a1a1a] text-white sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="hidden md:flex items-center justify-center gap-8 py-3">
          {navItems.map(item => (
            <NavLink key={item.id} label={item.label} href={item.href} hasDropdown={item.hasDropdown} content={item.content} />
          ))}
        </div>
        <div className="md:hidden">
          <div className="flex items-center justify-between py-3">
            <Button variant="ghost" size="icon" className="text-white" onClick={() => setOpen(!open)}>
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
            <span className="text-sm font-medium">MENÚ</span>
            <div className="w-10" />
          </div>
          {open && (
            <div className="pb-4 space-y-1">
              {navItems.map(item => (
                <div key={item.id} className="rounded-lg hover:bg-gray-800">
                  <NavLink label={item.label} href={item.href} hasDropdown={item.hasDropdown} content={item.content} onNavigate={() => setOpen(false)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
