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
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getProductIdFromPath } from '@/lib/product';

type SortOption = 'name' | 'price-low' | 'price-high';
type TypeFilter = 'all' | 'perfume' | 'body-mist' | 'locion' | 'capilar';
type GenderFilter = 'all' | 'masculino' | 'femenino' | 'unisex';
type StockFilter = 'all' | 'in-stock' | 'out-of-stock';

function StoreChrome({ children, cart, hideHero = false }: { children: React.ReactNode; cart: ReturnType<typeof useCart>; hideHero?: boolean }) {
  const { slides } = useSite();
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header cartItems={cart.cartItems} totalItems={cart.totalItems} totalPrice={cart.totalPrice}
        totalTransferPrice={cart.totalTransferPrice} onRemoveFromCart={cart.removeFromCart} onUpdateQuantity={cart.updateQuantity} />
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

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function inferType(product: Product): Exclude<TypeFilter, 'all'> {
  if (product.id >= 300) {
    const name = normalizeText(product.name);
    if (name.includes('locion')) return 'locion';
    return 'body-mist';
  }
  if (product.id >= 200) return 'capilar';
  return 'perfume';
}

function inferGender(product: Product): Exclude<GenderFilter, 'all'> {
  if (product.id >= 300 || product.id >= 200) return 'femenino';
  const name = normalizeText(product.name);

  const femaleHints = [
    'femme', 'woman', 'women', 'fem', 'rose', 'pink', 'cherry', 'candy', 'lady', 'queen',
    'princess', 'velvet', 'love', 'aqua kiss', 'romance', 'pure seduction', 'bare vanilla',
    'midnight bloom', 'temptation', 'rush', 'romantic', 'coconut passion', 'yara', 'mayar',
    'eclaire', 'nebras', 'sakeena', 'haya', 'la voie', 'sublime', 'victoria', 'fatima', 'maleka',
  ];
  const maleHints = [
    'pour homme', 'man', 'male', 'him', 'heroic', 'fearless', 'legacy', 'king', 'urban elixir',
    'intense', 'sillage', 'hawas', 'asad', '9pm', '9am', 'victorioso', 'maahir', 'supremacy',
    'khanjar', 'tres nuit', 'liquid brun', 'jean lowe', 'glacier', 'spectre', 'salvo',
  ];

  if (femaleHints.some((hint) => name.includes(hint))) return 'femenino';
  if (maleHints.some((hint) => name.includes(hint))) return 'masculino';
  return 'unisex';
}

function inferBrand(product: Product): string {
  if (product.id >= 300) return "Victoria's Secret";
  if (product.id >= 200) return 'Karsell';

  const name = normalizeText(product.name);
  const brandRules: Array<[string, string]> = [
    ['club de nuit', 'Armaf'],
    ['odyssey', 'Armaf'],
    ['odissey', 'Armaf'],
    ['tres nuit', 'Armaf'],
    ['hunter', 'Armaf'],
    ['tag him', 'Armaf'],
    ['afnan', 'Afnan'],
    ['9pm', 'Afnan'],
    ['9am', 'Afnan'],
    ['supremacy', 'Afnan'],
    ['turathi', 'Afnan'],
    ['hawas', 'Rasasi'],
    ['rasasi', 'Rasasi'],
    ['alhambra', 'Maison Alhambra'],
    ['alahambra', 'Maison Alhambra'],
    ['salvo', 'Maison Alhambra'],
    ['victorioso', 'Maison Alhambra'],
    ['philos', 'Maison Alhambra'],
    ['maison', 'Maison Alhambra'],
    ['lattafa', 'Lattafa'],
    ['yara', 'Lattafa'],
    ['khamrah', 'Lattafa'],
    ['asad', 'Lattafa'],
    ['maahir', 'Lattafa'],
    ['fakhar', 'Lattafa'],
    ['hayaati', 'Lattafa'],
    ['haya', 'Lattafa'],
    ['mayar', 'Lattafa'],
    ['qaed al fursan', 'Lattafa'],
    ['badee al oud', 'Lattafa'],
    ['nebras', 'Lattafa'],
    ['emaan', 'Lattafa'],
    ['sakeena', 'Lattafa'],
    ['teriaq', 'Lattafa'],
    ['the kingdom', 'Lattafa'],
    ['ameerat', 'Lattafa'],
    ['al noble', 'Lattafa'],
    ['eclaire', 'Lattafa'],
    ['rayhaan', 'Rayhaan'],
    ['bharara', 'Bharara'],
    ['zimaya', 'Zimaya'],
    ['al haramain', 'Al Haramain'],
    ['al wataniah', 'Al Wataniah'],
    ['odor', 'Armaf'],
  ];

  for (const [needle, brand] of brandRules) {
    if (name.includes(needle)) return brand;
  }

  return 'Otras marcas';
}


function uniqueById(products: Product[]) {
  const seen = new Set<number>();
  return products.filter((product) => {
    if (seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-200 pb-5 last:border-b-0 last:pb-0">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function FilterOption({ active, label, count, onClick }: { active: boolean; label: string; count?: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
        active ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span>{label}</span>
      {typeof count === 'number' && (
        <span className={`text-xs ${active ? 'text-white/80' : 'text-gray-400'}`}>{count}</span>
      )}
    </button>
  );
}

function StorePage({ cart }: { cart: ReturnType<typeof useCart> }) {
  const { products } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [selectedType, setSelectedType] = useState<TypeFilter>('all');
  const [selectedGender, setSelectedGender] = useState<GenderFilter>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<StockFilter>('all');

  const handleAddToCart = (product: Product) => {
    cart.addToCart(product);
    toast.success('Producto agregado al carrito', {
      description: `${product.name} ya está listo para tu pedido.`,
      duration: 3200,
    });
  };

  const productMeta = useMemo(() => {
    return products.map((product) => ({
      product,
      type: inferType(product),
      gender: inferGender(product),
      brand: inferBrand(product),
      search: normalizeText(`${product.name} ${product.description ?? ''} ${inferBrand(product)} ${inferType(product)} ${inferGender(product)}`),
    }));
  }, [products]);

  const countByType = useMemo(() => {
    const counts: Record<TypeFilter, number> = { all: productMeta.length, perfume: 0, 'body-mist': 0, locion: 0, capilar: 0 };
    productMeta.forEach(({ type }) => { counts[type] += 1; });
    return counts;
  }, [productMeta]);

  const countByGender = useMemo(() => {
    const counts: Record<GenderFilter, number> = { all: productMeta.length, masculino: 0, femenino: 0, unisex: 0 };
    productMeta.forEach(({ gender }) => { counts[gender] += 1; });
    return counts;
  }, [productMeta]);

  const countByStock = useMemo(() => ({
    all: productMeta.length,
    'in-stock': productMeta.filter(({ product }) => product.stock > 0).length,
    'out-of-stock': productMeta.filter(({ product }) => product.stock === 0).length,
  }), [productMeta]);

  const brandCounts = useMemo(() => {
    const map = new Map<string, number>();
    productMeta.forEach(({ brand }) => map.set(brand, (map.get(brand) ?? 0) + 1));
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0], 'es'));
  }, [productMeta]);

  const filteredProducts = useMemo(() => {
    const query = normalizeText(searchQuery);
    const filtered = productMeta.filter(({ product, type, gender, brand, search }) => {
      if (selectedType !== 'all' && type !== selectedType) return false;
      if (selectedGender !== 'all' && gender !== selectedGender) return false;
      if (selectedBrand !== 'all' && brand !== selectedBrand) return false;
      if (stockFilter === 'in-stock' && product.stock <= 0) return false;
      if (stockFilter === 'out-of-stock' && product.stock > 0) return false;
      if (query && !search.includes(query)) return false;
      return true;
    }).map(({ product }) => product);

    return filtered.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return a.name.localeCompare(b.name, 'es');
    });
  }, [productMeta, searchQuery, selectedType, selectedGender, selectedBrand, stockFilter, sortBy]);

  const hasActiveFilters = Boolean(searchQuery.trim()) || selectedType !== 'all' || selectedGender !== 'all' || selectedBrand !== 'all' || stockFilter !== 'all' || sortBy !== 'name';

  const showcaseSections = useMemo(() => {
    if (hasActiveFilters) return [] as Array<{ key: string; title: string; subtitle: string; products: Product[] }>;

    const take = (items: Product[], limit = 5) => uniqueById(items).slice(0, limit);

    return [
      {
        key: 'perfumes',
        title: 'Perfumes',
        subtitle: 'Solo 5 productos destacados de esta familia',
        products: take(productMeta.filter(({ type }) => type === 'perfume').map(({ product }) => product)),
      },
      {
        key: 'body-mist',
        title: 'Body Mist',
        subtitle: 'Mostramos solo 5 para que la home se vea más limpia',
        products: take(productMeta.filter(({ type }) => type === 'body-mist').map(({ product }) => product)),
      },
      {
        key: 'lociones',
        title: 'Lociones',
        subtitle: 'Una selección corta de esta categoría',
        products: take(productMeta.filter(({ type }) => type === 'locion').map(({ product }) => product)),
      },
      {
        key: 'capilar',
        title: 'Cuidado capilar',
        subtitle: '5 productos para mantener esta sección compacta',
        products: take(productMeta.filter(({ type }) => type === 'capilar').map(({ product }) => product)),
      },
      {
        key: 'lattafa',
        title: 'Lattafa',
        subtitle: '5 productos destacados por marca',
        products: take(productMeta.filter(({ brand }) => brand === 'Lattafa').map(({ product }) => product)),
      },
      {
        key: 'armaf',
        title: 'Armaf',
        subtitle: '5 productos destacados por marca',
        products: take(productMeta.filter(({ brand }) => brand === 'Armaf').map(({ product }) => product)),
      },
      {
        key: 'victoria-secret',
        title: "Victoria's Secret",
        subtitle: '5 productos destacados por marca',
        products: take(productMeta.filter(({ brand }) => brand === "Victoria's Secret").map(({ product }) => product)),
      },
    ].filter((section) => section.products.length > 0);
  }, [productMeta, hasActiveFilters]);

  const resetFilters = () => {
    setSearchQuery('');
    setSortBy('name');
    setSelectedType('all');
    setSelectedGender('all');
    setSelectedBrand('all');
    setStockFilter('all');
  };

  const SidebarContent = (
    <div className="space-y-5">
      <FilterSection title="Categorías">
        <div className="space-y-1.5">
          <FilterOption active={selectedType === 'all'} label="Todo" count={countByType.all} onClick={() => setSelectedType('all')} />
          <FilterOption active={selectedType === 'perfume'} label="Perfumes" count={countByType.perfume} onClick={() => setSelectedType('perfume')} />
          <FilterOption active={selectedType === 'body-mist'} label="Body Mist" count={countByType['body-mist']} onClick={() => setSelectedType('body-mist')} />
          <FilterOption active={selectedType === 'locion'} label="Lociones" count={countByType.locion} onClick={() => setSelectedType('locion')} />
          <FilterOption active={selectedType === 'capilar'} label="Cuidado capilar" count={countByType.capilar} onClick={() => setSelectedType('capilar')} />
        </div>
      </FilterSection>

      <FilterSection title="Filtrar por género">
        <div className="space-y-1.5">
          <FilterOption active={selectedGender === 'all'} label="Todos" count={countByGender.all} onClick={() => setSelectedGender('all')} />
          <FilterOption active={selectedGender === 'masculino'} label="Masculino" count={countByGender.masculino} onClick={() => setSelectedGender('masculino')} />
          <FilterOption active={selectedGender === 'femenino'} label="Femenino" count={countByGender.femenino} onClick={() => setSelectedGender('femenino')} />
          <FilterOption active={selectedGender === 'unisex'} label="Unisex" count={countByGender.unisex} onClick={() => setSelectedGender('unisex')} />
        </div>
      </FilterSection>

      <FilterSection title="Stock">
        <div className="space-y-1.5">
          <FilterOption active={stockFilter === 'all'} label="Todos" count={countByStock.all} onClick={() => setStockFilter('all')} />
          <FilterOption active={stockFilter === 'in-stock'} label="En stock" count={countByStock['in-stock']} onClick={() => setStockFilter('in-stock')} />
          <FilterOption active={stockFilter === 'out-of-stock'} label="Sin stock" count={countByStock['out-of-stock']} onClick={() => setStockFilter('out-of-stock')} />
        </div>
      </FilterSection>

      <FilterSection title="Marcas">
        <div className="space-y-1.5 max-h-72 overflow-auto pr-1">
          <FilterOption active={selectedBrand === 'all'} label="Todas" count={productMeta.length} onClick={() => setSelectedBrand('all')} />
          {brandCounts.map(([brand, count]) => (
            <FilterOption key={brand} active={selectedBrand === brand} label={brand} count={count} onClick={() => setSelectedBrand(brand)} />
          ))}
        </div>
      </FilterSection>

      <Button type="button" variant="outline" className="w-full" onClick={resetFilters}>
        Limpiar filtros
      </Button>
    </div>
  );

  return (
    <StoreChrome cart={cart}>
      <section id="productos" className="py-8 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-black">Catálogo</h2>
            <p className="text-gray-600 mt-1">Explorá el catálogo con menú lateral. En la home mostramos solo 5 productos por familia o marca para que se vea más limpia.</p>
          </div>

          <div className="lg:hidden mb-5 rounded-2xl border bg-white p-4 shadow-sm">
            <details>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium text-sm">
                <span className="inline-flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" />Filtros del catálogo</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </summary>
              <div className="mt-4">{SidebarContent}</div>
            </details>
          </div>

          <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] gap-6 items-start">
            <aside className="hidden lg:block sticky top-24 rounded-2xl border bg-white p-5 shadow-sm">
              {SidebarContent}
            </aside>

            <div className="min-w-0">
              <div className="bg-white rounded-2xl border shadow-sm p-4 md:p-5 mb-6">
                <div className="flex flex-col xl:flex-row gap-3 xl:items-center xl:justify-between">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold">Resultados</h3>
                      <Badge variant="secondary">{filteredProducts.length} productos</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Menú lateral al estilo catálogo para navegar más rápido.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 xl:items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Buscar por nombre o marca..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full sm:w-72"
                      />
                    </div>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value as SortOption)}
                        className="w-full sm:w-52 h-10 px-3 border rounded-md bg-white text-sm appearance-none cursor-pointer"
                      >
                        <option value="name">Ordenar por nombre</option>
                        <option value="price-low">Precio: menor a mayor</option>
                        <option value="price-high">Precio: mayor a menor</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {hasActiveFilters ? (
                <ProductGrid
                  products={filteredProducts}
                  onAddToCart={handleAddToCart}
                  title="Catálogo filtrado"
                  subtitle="Cuando usás filtros o búsqueda, acá sí ves todos los resultados"
                  compactHeader
                />
              ) : (
                <div className="space-y-10">
                  {showcaseSections.map((section) => (
                    <ProductGrid
                      key={section.key}
                      products={section.products}
                      onAddToCart={handleAddToCart}
                      title={section.title}
                      subtitle={section.subtitle}
                      compactHeader
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

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

function AppShell() {
  const cart = useCart();
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const handleNavigation = () => setPathname(window.location.pathname);
    window.addEventListener('pushstate', handleNavigation as EventListener);
    window.addEventListener('replacestate', handleNavigation as EventListener);
    return () => {
      window.removeEventListener('pushstate', handleNavigation as EventListener);
      window.removeEventListener('replacestate', handleNavigation as EventListener);
    };
  }, []);

  if (pathname === '/admin') return <AdminPage />;
  if (pathname.startsWith('/producto/')) return <ProductRoute cart={cart} pathname={pathname} />;
  return <StorePage cart={cart} />;
}

export default function App() {
  return (
    <SiteProvider>
      <AppShell />
    </SiteProvider>
  );
}
