import { useMemo, useState } from 'react';
import { useSite } from '@/context/SiteContext';
import type { Product } from '@/types';
import { ArrowLeft, Download, RefreshCw, Save, Search, LogOut, Box, FilterX, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const STORAGE_KEY = 'cs_admin_password';
const SESSION_KEY = 'cs_admin_session';
const DEFAULT_PASS = 'admin1234';

function getStoredPassword(): string {
  return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_PASS;
}

function isSessionActive(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

function setSession() {
  sessionStorage.setItem(SESSION_KEY, '1');
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const attempt = () => {
    if (pass === getStoredPassword()) {
      setSession();
      onLogin();
      return;
    }
    setError('Contraseña incorrecta');
    setPass('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">Panel admin</div>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Perfumes CS</h1>
          <p className="mt-1 text-sm text-gray-500">Ingresá para editar catálogo, filtros y relacionados.</p>
        </div>
        <Input
          type="password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
            setError('');
          }}
          onKeyDown={(e) => e.key === 'Enter' && attempt()}
          placeholder="Contraseña"
          autoFocus
        />
        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        <Button className="mt-4 w-full" onClick={attempt}>Ingresar</Button>
      </div>
    </div>
  );
}

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function parseRelatedIds(value: string): number[] {
  return value
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((item) => Number.isFinite(item) && item > 0);
}

function buildTags(product: Product) {
  return [product.brandCategory, product.category, product.genderCategory].filter(Boolean) as string[];
}

function Metric({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
      <div className="mt-1 text-sm text-gray-500">{helper}</div>
    </div>
  );
}

export default function AdminPage() {
  const site = useSite();
  const [loggedIn, setLoggedIn] = useState(isSessionActive());
  const [products, setProducts] = useState<Product[]>(site.products);
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('Todas');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [genderFilter, setGenderFilter] = useState('Todos');
  const [stockFilter, setStockFilter] = useState<'todos' | 'en-stock' | 'sin-stock'>('todos');
  const [bulkBrand, setBulkBrand] = useState('');
  const [bulkCategory, setBulkCategory] = useState('');
  const [bulkGender, setBulkGender] = useState('');
  const [bulkBadge, setBulkBadge] = useState('');
  const [status, setStatus] = useState('');

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

  const metrics = useMemo(() => {
    const total = products.length;
    const withStock = products.filter((item) => item.stock > 0).length;
    const withoutStock = products.filter((item) => item.stock === 0).length;
    const missingImage = products.filter((item) => !(item.image ?? '').trim()).length;
    const missingDescription = products.filter((item) => !(item.description ?? '').trim()).length;
    return { total, withStock, withoutStock, missingImage, missingDescription };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((product) => {
      if (brandFilter !== 'Todas' && product.brandCategory !== brandFilter) return false;
      if (categoryFilter !== 'Todas' && product.category !== categoryFilter) return false;
      if (genderFilter !== 'Todos' && product.genderCategory !== genderFilter) return false;
      if (stockFilter === 'en-stock' && product.stock <= 0) return false;
      if (stockFilter === 'sin-stock' && product.stock > 0) return false;
      if (!q) return true;
      const haystack = [
        product.name,
        product.brandCategory,
        product.category,
        product.genderCategory,
        product.description,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [products, search, brandFilter, categoryFilter, genderFilter, stockFilter]);

  const updateProduct = (id: number, patch: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              ...patch,
              tags: buildTags({ ...product, ...patch }),
            }
          : product,
      ),
    );
    setStatus('Cambios en memoria. Exportá el JSON para publicarlos.');
  };

  const applyBulkChanges = () => {
    const visibleIds = new Set(filteredProducts.map((item) => item.id));
    setProducts((prev) =>
      prev.map((product) => {
        if (!visibleIds.has(product.id)) return product;
        const next = {
          ...product,
          brandCategory: bulkBrand || product.brandCategory,
          category: bulkCategory || product.category,
          genderCategory: bulkGender || product.genderCategory,
          badgeText: bulkBadge || product.badgeText,
        };
        next.tags = buildTags(next);
        return next;
      }),
    );
    setStatus('Cambios masivos aplicados sobre los productos filtrados.');
  };

  const setFilteredStockZero = () => {
    const visibleIds = new Set(filteredProducts.map((item) => item.id));
    setProducts((prev) =>
      prev.map((product) => (visibleIds.has(product.id) ? { ...product, stock: 0, badgeText: 'Sin stock' } : product)),
    );
    setStatus('Productos filtrados marcados como sin stock.');
  };

  const saveProducts = () => {
    site.setAllProducts(products);
    setStatus('Catálogo actualizado en el panel. Exportá products.json para subirlo.');
  };

  const exportProducts = () => {
    downloadJson('products.json', products);
    setStatus('Se descargó el JSON del catálogo.');
  };

  const clearFilters = () => {
    setSearch('');
    setBrandFilter('Todas');
    setCategoryFilter('Todas');
    setGenderFilter('Todos');
    setStockFilter('todos');
  };

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
              <ArrowLeft className="h-4 w-4" />
              Volver a la tienda
            </a>
            <h1 className="mt-2 text-3xl font-bold">Panel de catálogo</h1>
            <p className="mt-1 text-sm text-gray-600">
              Filtros reales, métricas, edición rápida y relacionados por producto.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => { clearSession(); setLoggedIn(false); }}>
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
            <Button variant="outline" onClick={() => void site.reloadSiteConfigFromJson()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Recargar JSON publicado
            </Button>
            <Button variant="outline" onClick={exportProducts}>
              <Download className="mr-2 h-4 w-4" />
              Exportar JSON
            </Button>
            <Button onClick={saveProducts}>
              <Save className="mr-2 h-4 w-4" />
              Guardar en panel
            </Button>
          </div>
        </div>

        {status ? <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{status}</div> : null}

        <div className="grid gap-4 md:grid-cols-5">
          <Metric label="Productos" value={String(metrics.total)} helper="Catálogo total" />
          <Metric label="Con stock" value={String(metrics.withStock)} helper="Listos para vender" />
          <Metric label="Sin stock" value={String(metrics.withoutStock)} helper="Revisar reposición" />
          <Metric label="Sin imagen" value={String(metrics.missingImage)} helper="Conviene completar" />
          <Metric label="Sin descripción" value={String(metrics.missingDescription)} helper="Afecta la conversión" />
        </div>

        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Sparkles className="h-4 w-4" />
            Filtros y edición masiva
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-6">
            <div className="relative lg:col-span-2">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre, marca o descripción" className="pl-9" />
            </div>

            <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="h-10 rounded-md border border-gray-200 px-3 text-sm">
              {brands.map((item) => <option key={item}>{item}</option>)}
            </select>

            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-10 rounded-md border border-gray-200 px-3 text-sm">
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>

            <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} className="h-10 rounded-md border border-gray-200 px-3 text-sm">
              {genders.map((item) => <option key={item}>{item}</option>)}
            </select>

            <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value as typeof stockFilter)} className="h-10 rounded-md border border-gray-200 px-3 text-sm">
              <option value="todos">Todo el stock</option>
              <option value="en-stock">Solo con stock</option>
              <option value="sin-stock">Solo sin stock</option>
            </select>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <Input value={bulkBrand} onChange={(e) => setBulkBrand(e.target.value)} placeholder="Marca masiva" />
            <Input value={bulkCategory} onChange={(e) => setBulkCategory(e.target.value)} placeholder="Categoría masiva" />
            <Input value={bulkGender} onChange={(e) => setBulkGender(e.target.value)} placeholder="Género masivo" />
            <Input value={bulkBadge} onChange={(e) => setBulkBadge(e.target.value)} placeholder='Badge masivo, ej. "Nuevo"' />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" onClick={clearFilters}>
              <FilterX className="mr-2 h-4 w-4" />
              Limpiar filtros
            </Button>
            <Button variant="outline" onClick={applyBulkChanges}>
              <Box className="mr-2 h-4 w-4" />
              Aplicar sobre filtrados
            </Button>
            <Button variant="outline" onClick={setFilteredStockZero}>Marcar filtrados sin stock</Button>
            <div className="ml-auto text-sm text-gray-500">{filteredProducts.length} producto(s) visibles</div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500">#{product.id}</div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">
                    <span>{product.brandCategory || 'Sin marca'}</span>
                    <span>•</span>
                    <span>{product.category || 'Sin categoría'}</span>
                    <span>•</span>
                    <span>{product.genderCategory || 'Sin segmento'}</span>
                  </div>
                </div>
                <div className="rounded-full border border-gray-200 px-3 py-1 text-xs">
                  {product.stock === 0 ? 'Sin stock' : `${product.stock} en stock`}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <Input value={product.name} onChange={(e) => updateProduct(product.id, { name: e.target.value })} placeholder="Nombre" />
                <Input value={product.brandCategory ?? ''} onChange={(e) => updateProduct(product.id, { brandCategory: e.target.value })} placeholder="Marca" />
                <Input value={product.category ?? ''} onChange={(e) => updateProduct(product.id, { category: e.target.value })} placeholder="Categoría" />
                <Input value={product.genderCategory ?? ''} onChange={(e) => updateProduct(product.id, { genderCategory: e.target.value })} placeholder="Género" />

                <Input value={String(product.price)} onChange={(e) => updateProduct(product.id, { price: Number(e.target.value) || 0 })} placeholder="Precio" />
                <Input value={String(product.transferPrice)} onChange={(e) => updateProduct(product.id, { transferPrice: Number(e.target.value) || 0 })} placeholder="Precio transferencia" />
                <Input value={String(product.stock)} onChange={(e) => updateProduct(product.id, { stock: Number(e.target.value) || 0 })} placeholder="Stock" />
                <Input value={product.badgeText ?? ''} onChange={(e) => updateProduct(product.id, { badgeText: e.target.value })} placeholder='Badge: Nuevo, Sin stock, etc.' />

                <div className="md:col-span-2 xl:col-span-4">
                  <Input value={product.image} onChange={(e) => updateProduct(product.id, { image: e.target.value })} placeholder="URL de imagen" />
                </div>

                <div className="md:col-span-2 xl:col-span-4">
                  <textarea
                    value={product.description ?? ''}
                    onChange={(e) => updateProduct(product.id, { description: e.target.value })}
                    placeholder="Descripción"
                    rows={5}
                    className="min-h-[120px] w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                  />
                </div>

                <div className="md:col-span-2 xl:col-span-4">
                  <Input
                    value={(product.relatedIds ?? []).join(', ')}
                    onChange={(e) => updateProduct(product.id, { relatedIds: parseRelatedIds(e.target.value) })}
                    placeholder="IDs relacionados separados por coma. Ej: 12, 18, 33"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
