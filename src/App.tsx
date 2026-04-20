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
import { Search, Sparkles, Layers3, Users, ShieldCheck, FilterX } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getProductIdFromPath } from '@/lib/product';

function StoreChrome({ children, cart, hideHero = false }: { children: React.ReactNode; cart: ReturnType<typeof useCart>; hideHero?: boolean }) {
  const { slides } = useSite();
  return (
    <div className="min-h-screen bg-white text-black">
      <AnnouncementBar />
      <Header
        cart={cart.cart}
        onRemoveFromCart={cart.removeFromCart}
        onUpdateQuantity={cart.updateQuantity}
        getTotalPrice={cart.getTotalPrice}
      />
      <Navigation />
      {!hideHero && <HeroBanner slides={slides} />}
      {children}
      <PromotionsSection />
      <Testimonials />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
      <Toaster />
    </div>
  );
}

function MetricCard({ label, value, help }: { label: string; value: string; help: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
      <div className="mt-1 text-sm text-gray-500">{help}</div>
    </div>
  );
}

function useCatalogMetrics(products: Product[]) {
  return useMemo(() => {
    const inStock = products.filter((p) => p.stock > 0).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;
    const brands = new Set(products.map((p) => p.brandCategory).filter(Boolean));
    const missingDescriptions = products.filter((p) => !(p.description ?? '').trim()).length;
    return {
      total: products.length,
      inStock,
      outOfStock,
      brands: brands.size,
      missingDescriptions,
    };
  }, [products]);
}

function StorePage({ cart }: { cart: ReturnType<typeof useCart> }) {
  const { products } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [brandFilter, setBrandFilter] = useState('Todas');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [genderFilter, setGenderFilter] = useState('Todos');
  const [stockFilter, setStockFilter] = useState<'todos' | 'en-stock' | 'sin-stock'>('todos');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const metrics = useCatalogMetrics(products);

  const brands = useMemo(
    () => ['Todas', ...Array.from(new Set(products.map((p) => p.brandCategory).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b))],
    [products],
  );
  const categories = useMemo(
    () => ['Todas', ...Array.from(new Set(products.map((p) => p.category).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b))],
    [products],
  );
  const genders = useMemo(
    () => ['Todos', ...Array.from(new Set(products.map((p) => p.genderCategory).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();

    return [...products]
      .filter((product) => {
        if (brandFilter !== 'Todas' && product.brandCategory !== brandFilter) return false;
        if (categoryFilter !== 'Todas' && product.category !== categoryFilter) return false;
        if (genderFilter !== 'Todos' && product.genderCategory !== genderFilter) return false;
        if (stockFilter === 'en-stock' && product.stock <= 0) return false;
        if (stockFilter === 'sin-stock' && product.stock > 0) return false;
        if (featuredOnly && !product.featured) return false;

        if (!search) return true;

        const haystack = [
          product.name,
          product.description,
          product.brandCategory,
          product.category,
          product.genderCategory,
          ...(product.tags ?? []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return haystack.includes(search);
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return a.name.localeCompare(b.name);
      });
  }, [products, searchQuery, brandFilter, categoryFilter, genderFilter, stockFilter, featuredOnly, sortBy]);

  const handleAddToCart = (product: Product) => {
    cart.addToCart(product);
    toast.success('Producto agregado al carrito', {
      description: `${product.name} ya está listo para tu pedido.`,
      duration: 3200,
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setBrandFilter('Todas');
    setCategoryFilter('Todas');
    setGenderFilter('Todos');
    setStockFilter('todos');
    setFeaturedOnly(false);
  };

  return (
    <StoreChrome cart={cart}>
      <section id="productos" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 grid gap-4 md:grid-cols-5">
          <MetricCard label="Productos" value={String(metrics.total)} help="Catálogo cargado" />
          <MetricCard label="Con stock" value={String(metrics.inStock)} help="Listos para vender" />
          <MetricCard label="Sin stock" value={String(metrics.outOfStock)} help="Necesitan reposición" />
          <MetricCard label="Marcas" value={String(metrics.brands)} help="Segmentación activa" />
          <MetricCard label="Sin descripción" value={String(metrics.missingDescriptions)} help="Conviene completarlos" />
        </div>

        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Sparkles className="h-4 w-4" />
                Catálogo inteligente
              </div>
              <h2 className="mt-2 text-2xl font-bold">Filtrá por marca, tipo y segmento</h2>
              <p className="mt-1 text-sm text-gray-600">
                La tienda ahora trabaja con categorías reales del JSON, no por rangos de ID.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="rounded-full px-3 py-1">Búsqueda por nombre, marca y descripción</Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">Badges automáticos</Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">Listo para relacionados</Badge>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            <div className="relative xl:col-span-2">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar perfume, marca, notas, género..."
                className="pl-9"
              />
            </div>

            <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm">
              {brands.map((item) => <option key={item}>{item}</option>)}
            </select>

            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm">
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>

            <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm">
              {genders.map((item) => <option key={item}>{item}</option>)}
            </select>

            <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value as typeof stockFilter)} className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm">
              <option value="todos">Todo el stock</option>
              <option value="en-stock">Solo con stock</option>
              <option value="sin-stock">Solo sin stock</option>
            </select>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button variant={featuredOnly ? 'default' : 'outline'} size="sm" onClick={() => setFeaturedOnly((prev) => !prev)}>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Destacados
            </Button>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="h-9 rounded-md border border-gray-200 bg-white px-3 text-sm">
              <option value="name">Ordenar por nombre</option>
              <option value="price-low">Precio: menor a mayor</option>
              <option value="price-high">Precio: mayor a menor</option>
            </select>

            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <FilterX className="mr-2 h-4 w-4" />
              Limpiar filtros
            </Button>

            <div className="ml-auto text-sm text-gray-500">
              {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.filter((item) => item !== 'Todas').map((item) => {
              const count = products.filter((product) => product.category === item).length;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategoryFilter(item)}
                  className={`rounded-full border px-3 py-1 text-sm transition ${
                    categoryFilter === item ? 'border-black bg-black text-white' : 'border-gray-200 bg-white text-gray-700'
                  }`}
                >
                  {item} <span className="ml-1 opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Layers3 className="h-4 w-4" />
              Segmentación activa
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Usá marca, categoría y género para ordenar mejor el catálogo y encontrar productos más rápido.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Users className="h-4 w-4" />
              Relacionados automáticos
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Cada ficha puede sugerir productos de la misma marca, género o categoría sin cargar todo a mano.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Sparkles className="h-4 w-4" />
              Mejor conversión
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Los badges de “Nuevo”, “Últimas unidades” y “Sin stock” ayudan a dar contexto y mover ventas.
            </p>
          </div>
        </div>
      </section>
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
    const handler = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
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
