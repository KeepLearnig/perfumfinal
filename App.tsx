import { useEffect, useMemo, useState } from 'react';
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
import ProductDetailPage from '@/pages/ProductDetailPage';
import { useCart } from '@/hooks/useCart';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, Sparkles, Heart, Droplets, Tag, Venus, Mars, Circle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getProductIdFromPath } from '@/lib/product';

const GRADIENT: Record<string, string> = {
  amber: 'from-amber-900 to-amber-700',
  purple: 'from-purple-900 to-purple-700',
  pink: 'from-pink-600 to-rose-500',
  blue: 'from-blue-900 to-blue-700',
  green: 'from-green-900 to-green-700',
};

const BORDER_HOVER: Record<string, string> = {
  amber: 'hover:border-amber-300',
  purple: 'hover:border-purple-300',
  pink: 'hover:border-pink-300',
  blue: 'hover:border-blue-300',
  green: 'hover:border-green-300',
};

const BADGE_BG: Record<string, string> = {
  amber: 'bg-amber-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
};

const CATEGORY_COLORS = ['amber', 'purple', 'pink', 'blue', 'green'] as const;

const SparklesIcon = ({ className }: { className?: string }) => <Sparkles className={className} />;
const DropletsIcon = ({ className }: { className?: string }) => <Droplets className={className} />;
const HeartIcon = ({ className }: { className?: string }) => <Heart className={className} />;
const TagIcon = ({ className }: { className?: string }) => <Tag className={className} />;

function normalizeText(value?: string) {
  return (value ?? '').trim();
}

function getProductCategory(product: Product) {
  return normalizeText(product.category) || 'Perfume';
}

function getProductBrand(product: Product) {
  return normalizeText(product.brandCategory) || 'Sin marca';
}

function getProductGender(product: Product) {
  const gender = normalizeText(product.genderCategory);
  return gender || 'Unisex';
}

function getCategoryMeta(name: string, index: number) {
  const lower = name.toLowerCase();
  const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

  if (lower.includes('mist')) {
    return {
      color,
      badge: 'Body Care',
      description: 'Brumas corporales y fragancias ligeras.',
      Icon: HeartIcon,
    };
  }

  if (lower.includes('loción') || lower.includes('locion') || lower.includes('capilar')) {
    return {
      color,
      badge: 'Cuidado',
      description: 'Lociones y productos de cuidado personal.',
      Icon: DropletsIcon,
    };
  }

  return {
    color,
    badge: 'Fragancias',
    description: 'Perfumes y aromas destacados del catálogo.',
    Icon: SparklesIcon,
  };
}

function StoreChrome({ children, cart, hideHero = false }: { children: React.ReactNode; cart: ReturnType<typeof useCart>; hideHero?: boolean }) {
  const { slides } = useSite();

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header
        cartItems={cart.cartItems}
        totalItems={cart.totalItems}
        totalPrice={cart.totalPrice}
        totalTransferPrice={cart.totalTransferPrice}
        onRemoveFromCart={cart.removeFromCart}
        onUpdateQuantity={cart.updateQuantity}
      />
      <Navigation />
      <main>
        {!hideHero && <HeroBanner slides={slides} />}
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="bottom-right" richColors closeButton expand visibleToasts={3} />
    </div>
  );
}

function StorePage({ cart }: { cart: ReturnType<typeof useCart> }) {
  const { products } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeBrand, setActiveBrand] = useState('Todas');
  const [activeGender, setActiveGender] = useState('Todos');

  const categoryCards = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((product) => {
      const category = getProductCategory(product);
      counts.set(category, (counts.get(category) ?? 0) + 1);
    });

    return Array.from(counts.entries()).map(([name, count], index) => ({
      id: name,
      label: name,
      count,
      ...getCategoryMeta(name, index),
    }));
  }, [products]);

  useEffect(() => {
    if (!activeCategory && categoryCards.length > 0) {
      setActiveCategory(categoryCards[0].id);
    }
  }, [activeCategory, categoryCards]);

  const availableBrands = useMemo(() => {
    const values = Array.from(new Set(products.map(getProductBrand))).filter(Boolean).sort((a, b) => a.localeCompare(b));
    return ['Todas', ...values];
  }, [products]);

  const availableGenders = useMemo(() => {
    const values = Array.from(new Set(products.map(getProductGender))).filter(Boolean);
    const ordered = ['Masculino', 'Femenino', 'Unisex'].filter((item) => values.includes(item));
    const extras = values.filter((item) => !ordered.includes(item)).sort((a, b) => a.localeCompare(b));
    return ['Todos', ...ordered, ...extras];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const activeCategoryValue = activeCategory || categoryCards[0]?.id || '';

    return products
      .filter((product) => !activeCategoryValue || getProductCategory(product) === activeCategoryValue)
      .filter((product) => activeBrand === 'Todas' || getProductBrand(product) === activeBrand)
      .filter((product) => activeGender === 'Todos' || getProductGender(product) === activeGender)
      .filter((product) => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return true;
        return [
          product.name,
          product.description ?? '',
          getProductBrand(product),
          getProductCategory(product),
          getProductGender(product),
        ].some((value) => value.toLowerCase().includes(q));
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return a.name.localeCompare(b.name);
      });
  }, [products, activeCategory, activeBrand, activeGender, searchQuery, sortBy, categoryCards]);

  const handleAddToCart = (product: Product) => {
    cart.addToCart(product);
    toast.success('Producto agregado al carrito', {
      description: `${product.name} ya está listo para tu pedido.`,
      duration: 3200,
    });
  };

  const activeCategoryLabel = activeCategory || categoryCards[0]?.label || 'Catálogo';

  return (
    <StoreChrome cart={cart}>
      <section id="productos" className="py-8 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Nuestros Productos</h2>
          <p className="text-gray-600 text-center mb-8">Filtrá por categoría, marca o segmento para navegar mejor el catálogo.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {categoryCards.map((cat) => {
              const isActive = activeCategory === cat.id;
              const IconComp = cat.Icon ?? TagIcon;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative overflow-hidden rounded-xl p-6 text-left transition-all ${
                    isActive
                      ? `bg-gradient-to-br ${GRADIENT[cat.color] ?? 'from-gray-900 to-gray-700'} text-white shadow-lg scale-[1.02]`
                      : `bg-white border-2 border-gray-100 ${BORDER_HOVER[cat.color] ?? ''} hover:shadow-md`
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <IconComp className={`w-8 h-8 mb-3 ${isActive ? 'text-white/70' : 'text-gray-600'}`} />
                      <h3 className="text-xl font-bold mb-1">{cat.label}</h3>
                      <p className={`text-sm ${isActive ? 'text-white/70' : 'text-gray-500'}`}>{cat.count} productos</p>
                      <p className={`text-sm mt-2 ${isActive ? 'text-white/80' : 'text-gray-600'}`}>{cat.description}</p>
                    </div>
                    <Badge className={isActive ? (BADGE_BG[cat.color] ?? 'bg-gray-500') : 'bg-gray-200 text-gray-700'}>
                      {cat.badge}
                    </Badge>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4 mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-semibold text-lg">{activeCategoryLabel}</h3>
                <Badge variant="secondary">{filteredProducts.length} productos</Badge>
                <Badge variant="outline" className="gap-1"><Tag className="w-3 h-3" />{activeBrand}</Badge>
                <Badge variant="outline" className="gap-1">
                  {activeGender === 'Masculino' ? <Mars className="w-3 h-3" /> : activeGender === 'Femenino' ? <Venus className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                  {activeGender}
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar producto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-60"
                  />
                </div>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full sm:w-48 h-10 px-3 border rounded-md bg-white text-sm appearance-none cursor-pointer"
                  >
                    <option value="name">Ordenar por nombre</option>
                    <option value="price-low">Precio: menor a mayor</option>
                    <option value="price-high">Precio: mayor a menor</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_1fr] gap-4 border-t pt-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Marcas</p>
                <div className="flex flex-wrap gap-2">
                  {availableBrands.map((brand) => (
                    <Button
                      key={brand}
                      type="button"
                      size="sm"
                      variant={activeBrand === brand ? 'default' : 'outline'}
                      className={activeBrand === brand ? 'bg-black hover:bg-gray-800' : ''}
                      onClick={() => setActiveBrand(brand)}
                    >
                      {brand}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Segmento</p>
                <div className="flex flex-wrap gap-2">
                  {availableGenders.map((gender) => (
                    <Button
                      key={gender}
                      type="button"
                      size="sm"
                      variant={activeGender === gender ? 'default' : 'outline'}
                      className={activeGender === gender ? 'bg-black hover:bg-gray-800' : ''}
                      onClick={() => setActiveGender(gender)}
                    >
                      {gender}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {searchQuery && (
            <p className="mb-4 text-sm text-gray-600">
              {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''} para "{searchQuery}"
            </p>
          )}
        </div>
      </section>

      <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
      <PromotionsSection />
      <section id="quienes-somos"><Testimonials /></section>
      <section id="faq"><Newsletter /></section>
    </StoreChrome>
  );
}

function ProductRoute({ cart, pathname }: { cart: ReturnType<typeof useCart>; pathname: string }) {
  const { products } = useSite();
  const productId = getProductIdFromPath(pathname);
  const product = useMemo(() => products.find((item) => item.id === productId) ?? null, [products, productId]);

  const handleAddToCart = (item: Product) => {
    cart.addToCart(item);
    toast.success('Producto agregado al carrito', {
      description: `${item.name} se sumó correctamente.`,
      duration: 3200,
    });
  };

  return (
    <StoreChrome cart={cart} hideHero>
      <ProductDetailPage product={product} onAddToCart={handleAddToCart} />
    </StoreChrome>
  );
}

function Router() {
  const [path, setPath] = useState(window.location.pathname);
  const cart = useCart();

  useEffect(() => {
    const h = () => setPath(window.location.pathname);
    window.addEventListener('popstate', h);
    return () => window.removeEventListener('popstate', h);
  }, []);

  if (path === '/admin' || path === '/admin/') return <AdminPage />;
  if (path.startsWith('/productos/')) return <ProductRoute cart={cart} pathname={path} />;
  return <StorePage cart={cart} />;
}

export default function App() {
  return (
    <SiteProvider>
      <Router />
    </SiteProvider>
  );
}
