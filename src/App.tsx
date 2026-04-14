import { useState, useEffect } from 'react';
import { SiteProvider, useSite } from '@/context/SiteContext';
import { AnnouncementBar } from '@/sections/AnnouncementBar';
import { Header } from '@/sections/Header';
import { Navigation } from '@/sections/Navigation';
import { HeroBanner } from '@/sections/HeroBanner';
import { ProductGrid } from '@/sections/ProductGrid';
import { PromotionsSection } from '@/sections/PromotionsSection';
import { Testimonials } from '@/sections/Testimonials';
import { Newsletter } from '@/sections/Newsletter';
import { Footer } from '@/sections/Footer';
import { WhatsAppButton } from '@/sections/WhatsAppButton';
import AdminPage from '@/pages/AdminPage';
import { useCart } from '@/hooks/useCart';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, Sparkles, Heart, Droplets } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type CategoryKey = 'perfumes' | 'karsell' | 'victoria-secret';

const GRADIENT: Record<string, string> = {
  amber: 'from-amber-900 to-amber-700', purple: 'from-purple-900 to-purple-700',
  pink: 'from-pink-600 to-rose-500', blue: 'from-blue-900 to-blue-700', green: 'from-green-900 to-green-700',
};
const BORDER_HOVER: Record<string, string> = {
  amber: 'hover:border-amber-300', purple: 'hover:border-purple-300',
  pink: 'hover:border-pink-300', blue: 'hover:border-blue-300', green: 'hover:border-green-300',
};
const BADGE_BG: Record<string, string> = {
  amber: 'bg-amber-500', purple: 'bg-purple-500', pink: 'bg-pink-500',
  blue: 'bg-blue-500', green: 'bg-green-500',
};

const SparklesIcon = ({ className }: { className?: string }) => <Sparkles className={className} />;
const DropletsIcon = ({ className }: { className?: string }) => <Droplets className={className} />;
const HeartIcon = ({ className }: { className?: string }) => <Heart className={className} />;
const CAT_ICON: Record<string, ({ className }: { className?: string }) => React.ReactElement> = {
  perfumes: SparklesIcon, karsell: DropletsIcon, 'victoria-secret': HeartIcon,
};

function StorePage() {
  const { products, slides, categoryCards } = useSite();
  const { cartItems, totalItems, totalPrice, totalTransferPrice, addToCart, removeFromCart, updateQuantity } = useCart();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('perfumes');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [viewAllPerfumes, setViewAllPerfumes] = useState(false);

  const perfumes = products.filter((p) => p.id < 200);
  const karsell = products.filter((p) => p.id >= 200 && p.id < 300);
  const victoriaSecret = products.filter((p) => p.id >= 300);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} agregado al carrito`);
  };

  const getProducts = (): Product[] => {
    if (activeCategory === 'karsell') return karsell;
    if (activeCategory === 'victoria-secret') return victoriaSecret;
    return viewAllPerfumes ? perfumes : perfumes.slice(0, 16);
  };

  const categoryCounts: Record<CategoryKey, number> = {
    perfumes: perfumes.length,
    karsell: karsell.length,
    'victoria-secret': victoriaSecret.length,
  };

  const sorted = [...getProducts().filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header cartItems={cartItems} totalItems={totalItems} totalPrice={totalPrice}
        totalTransferPrice={totalTransferPrice} onRemoveFromCart={removeFromCart} onUpdateQuantity={updateQuantity} />
      <Navigation />
      <main>
        <HeroBanner slides={slides} />

        <section id="productos" className="py-8 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Nuestros Productos</h2>
            <p className="text-gray-600 text-center mb-8">Seleccioná una categoría para ver nuestro catálogo</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {categoryCards.map(cat => {
                const catId = cat.id as CategoryKey;
                const isActive = activeCategory === catId;
                const IconComp = CAT_ICON[catId] ?? SparklesIcon;
                const count = categoryCounts[catId] ?? 0;
                return (
                  <button key={cat.id} onClick={() => setActiveCategory(catId)}
                    className={`relative overflow-hidden rounded-xl p-6 text-left transition-all ${
                      isActive
                        ? `bg-gradient-to-br ${GRADIENT[cat.color] ?? 'from-gray-900 to-gray-700'} text-white shadow-lg scale-[1.02]`
                        : `bg-white border-2 border-gray-100 ${BORDER_HOVER[cat.color] ?? ''} hover:shadow-md`
                    }`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <IconComp className={`w-8 h-8 mb-3 ${isActive ? 'text-white/70' : 'text-gray-600'}`} />
                        <h3 className="text-xl font-bold mb-1">{cat.label}</h3>
                        <p className={`text-sm ${isActive ? 'text-white/70' : 'text-gray-500'}`}>{count} productos</p>
                        {cat.description && <p className={`text-sm mt-2 ${isActive ? 'text-white/80' : 'text-gray-600'}`}>{cat.description}</p>}
                      </div>
                      <Badge className={isActive ? (BADGE_BG[cat.color] ?? 'bg-gray-500') : 'bg-gray-200 text-gray-700'}>
                        {cat.badge}
                      </Badge>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg">{categoryCards.find(c => c.id === activeCategory)?.label ?? activeCategory}</h3>
                  <Badge variant="secondary">{sorted.length} productos</Badge>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input type="text" placeholder="Buscar producto..." value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)} className="pl-10 w-full sm:w-56" />
                  </div>
                  <div className="relative">
                    <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
                      className="w-full sm:w-48 h-10 px-3 border rounded-md bg-white text-sm appearance-none cursor-pointer">
                      <option value="name">Ordenar por nombre</option>
                      <option value="price-low">Precio: menor a mayor</option>
                      <option value="price-high">Precio: mayor a menor</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              {activeCategory === 'perfumes' && (
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button size="sm" variant={!viewAllPerfumes ? 'default' : 'outline'}
                    onClick={() => setViewAllPerfumes(false)} className={!viewAllPerfumes ? 'bg-black' : ''}>
                    Destacados (16)
                  </Button>
                  <Button size="sm" variant={viewAllPerfumes ? 'default' : 'outline'}
                    onClick={() => setViewAllPerfumes(true)} className={viewAllPerfumes ? 'bg-black' : ''}>
                    Ver Todos ({perfumes.length})
                  </Button>
                </div>
              )}
            </div>
            {searchQuery && <p className="mb-4 text-sm text-gray-600">{sorted.length} resultado{sorted.length !== 1 ? 's' : ''} para "{searchQuery}"</p>}
          </div>
        </section>

        <ProductGrid products={sorted} onAddToCart={handleAddToCart} />
        <PromotionsSection />
        <section id="quienes-somos"><Testimonials /></section>
        <section id="faq"><Newsletter /></section>
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="bottom-right" />
    </div>
  );
}

function Router() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const h = () => setPath(window.location.pathname);
    window.addEventListener('popstate', h);
    return () => window.removeEventListener('popstate', h);
  }, []);
  if (path === '/admin' || path === '/admin/') return <AdminPage />;
  return <StorePage />;
}

export default function App() {
  return (
    <SiteProvider>
      <Router />
    </SiteProvider>
  );
}
