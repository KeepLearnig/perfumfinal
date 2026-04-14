import { useMemo, useState } from 'react';
import { useSite, type NavItem, type PromoCard, type CategoryCard } from '@/context/SiteContext';
import type { Product } from '@/types';
import type { SlideData } from '@/sections/HeroBanner';
import {
  Package, Image as ImageIcon, Tag, LayoutGrid, Plus, Trash2, ChevronDown, ChevronUp, Save, ArrowLeft,
  Percent, DollarSign, Navigation2, Check, AlertCircle, Lock, Eye, EyeOff, KeyRound, LogOut, Search,
  Globe, Palette, Download, RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const STORAGE_KEY = 'cs_admin_password';
const SESSION_KEY = 'cs_admin_session';
const DEFAULT_PASS = 'admin1234';

function getStoredPassword(): string {
  return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_PASS;
}
function setStoredPassword(p: string) {
  localStorage.setItem(STORAGE_KEY, p);
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
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const attempt = () => {
    if (pass === getStoredPassword()) {
      setSession();
      onLogin();
    } else {
      setError('Contraseña incorrecta');
      setPass('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Panel Admin</h1>
          <p className="text-sm text-gray-500 mt-1">CS Perfumes</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">Contraseña</label>
            <div className="relative">
              <Input
                type={show ? 'text' : 'password'}
                placeholder="Ingresá tu contraseña"
                value={pass}
                onChange={e => { setPass(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && attempt()}
                className={`pr-10 ${error ? 'border-red-400' : ''}`}
                autoFocus
              />
              <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" type="button">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
          </div>

          <Button onClick={attempt} className="w-full bg-gray-900 hover:bg-gray-700 text-white h-11">
            Ingresar
          </Button>
          <p className="text-xs text-gray-400 text-center">Contraseña inicial: admin1234</p>
        </div>
      </div>
    </div>
  );
}

type Tab = 'products' | 'stock' | 'slider' | 'nav' | 'promos' | 'categories' | 'branding' | 'security';

const TABS = [
  { id: 'products', label: 'Productos', Icon: Package },
  { id: 'stock', label: 'Stock', Icon: AlertCircle },
  { id: 'slider', label: 'Slider', Icon: ImageIcon },
  { id: 'nav', label: 'Navegación', Icon: Navigation2 },
  { id: 'promos', label: 'Promos', Icon: Tag },
  { id: 'categories', label: 'Categorías', Icon: LayoutGrid },
  { id: 'branding', label: 'SEO / Marca', Icon: Globe },
  { id: 'security', label: 'Seguridad', Icon: Lock },
] satisfies { id: Tab; label: string; Icon: typeof Package }[];

const FONT_OPTIONS = [
  { label: 'Sans', value: 'ui-sans-serif, system-ui, sans-serif' },
  { label: 'Serif', value: 'Georgia, serif' },
  { label: 'Monospace', value: 'ui-monospace, SFMono-Regular, monospace' },
  { label: 'Cursive', value: 'cursive' },
];

const COLOR_OPTIONS: CategoryCard['color'][] = ['amber', 'purple', 'pink', 'blue', 'green'];
const COLOR_CLASSES: Record<string, string> = {
  amber: 'bg-amber-100 text-amber-800 border-amber-300',
  purple: 'bg-purple-100 text-purple-800 border-purple-300',
  pink: 'bg-pink-100 text-pink-800 border-pink-300',
  blue: 'bg-blue-100 text-blue-800 border-blue-300',
  green: 'bg-green-100 text-green-800 border-green-300',
};

function SectionTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-500 mt-0.5">{sub}</p>
    </div>
  );
}

function ExpandRow({ label, sub, img, agotado, expanded, onToggle, onDelete, children }: {
  label: string; sub?: string; img?: string; agotado?: boolean;
  expanded: boolean; onToggle: () => void; onDelete?: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border rounded-xl overflow-hidden bg-white">
      <div className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors" onClick={onToggle}>
        {img && (
          <div className="relative flex-shrink-0">
            <img src={img} className="w-12 h-12 object-cover rounded-lg" alt={label} />
            {agotado && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                <span className="text-white text-[7px] font-bold">AGOTADO</span>
              </div>
            )}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate text-gray-900">{label}</p>
          {sub && <p className="text-xs text-gray-400 truncate">{sub}</p>}
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {onDelete && (
            <button onClick={e => { e.stopPropagation(); onDelete(); }} type="button"
              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </div>
      </div>
      {expanded && <div className="border-t bg-gray-50 p-4">{children}</div>}
    </div>
  );
}

function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const apply = (command: string) => {
    document.execCommand(command);
    onChange((document.getElementById('rt-editor') as HTMLDivElement | null)?.innerHTML ?? value);
  };

  return (
    <div className="border rounded-xl overflow-hidden bg-white">
      <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">
        <Button size="sm" type="button" variant="outline" onClick={() => apply('bold')}>Negrita</Button>
        <Button size="sm" type="button" variant="outline" onClick={() => apply('italic')}>Itálica</Button>
        <Button size="sm" type="button" variant="outline" onClick={() => apply('insertUnorderedList')}>Lista</Button>
        <Button size="sm" type="button" variant="outline" onClick={() => apply('removeFormat')}>Limpiar</Button>
      </div>
      <div
        id="rt-editor"
        className="min-h-[140px] p-3 text-sm focus:outline-none"
        contentEditable
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
      />
    </div>
  );
}

function downloadExcelCompatible(products: Product[]) {
  const rows = products.map((product) => `
    <tr>
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.description ?? ''}</td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td>${product.image}</td>
    </tr>`).join('');

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head><meta charset="UTF-8"></head>
      <body>
        <table>
          <tr><th>ID</th><th>Producto</th><th>Descripción</th><th>Precio</th><th>Stock</th><th>Imagen</th></tr>
          ${rows}
        </table>
      </body>
    </html>`;

  const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'productos_cs.xls';
  link.click();
  URL.revokeObjectURL(url);
}

function ProductsTab() {
  const { products, setAllProducts } = useSite();
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [bulkMode, setBulkMode] = useState<'percent' | 'amount'>('percent');
  const [bulkVal, setBulkVal] = useState('');
  const [bulkTarget, setBulkTarget] = useState<'all' | 'perfumes' | 'karsell' | 'vs'>('all');
  const [flash, setFlash] = useState(false);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const toggle = (product: Product) => {
    if (expandedId === product.id) {
      setExpandedId(null);
      setEditing(null);
    } else {
      setExpandedId(product.id);
      setEditing({ ...product });
    }
  };

  const save = () => {
    if (!editing) return;
    setAllProducts(products.map(p => p.id === editing.id ? editing : p));
    setExpandedId(null);
    setEditing(null);
  };

  const del = (id: number) => {
    if (!confirm('¿Eliminar este producto?')) return;
    setAllProducts(products.filter(p => p.id !== id));
  };

  const addProduct = () => {
    const maxId = Math.max(...products.map(p => p.id), 0);
    const categoryBase = bulkTarget === 'karsell' ? 200 : bulkTarget === 'vs' ? 300 : 1;
    const newId = maxId + 1 < categoryBase ? categoryBase : maxId + 1;
    const product: Product = {
      id: newId,
      name: 'Nuevo Producto',
      description: 'Descripción editable',
      price: 10000,
      transferPrice: 10000,
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop',
      stock: 5,
      installments: 3,
      installmentPrice: 3333,
    };
    setAllProducts([product, ...products]);
    setExpandedId(product.id);
    setEditing(product);
  };

  const applyBulk = () => {
    const value = parseFloat(bulkVal);
    if (Number.isNaN(value)) return;
    const updated = products.map((product) => {
      const match = bulkTarget === 'all'
        || (bulkTarget === 'perfumes' && product.id < 200)
        || (bulkTarget === 'karsell' && product.id >= 200 && product.id < 300)
        || (bulkTarget === 'vs' && product.id >= 300);
      if (!match) return product;
      const newPrice = bulkMode === 'percent'
        ? Math.round((product.price * (1 + value / 100)) / 100) * 100
        : Math.round((product.price + value) / 100) * 100;
      return {
        ...product,
        price: Math.max(newPrice, 0),
        transferPrice: Math.max(newPrice, 0),
        installmentPrice: Math.round(Math.max(newPrice, 0) / Math.max(product.installments || 3, 1)),
      };
    });
    setAllProducts(updated);
    setBulkVal('');
    setFlash(true);
    setTimeout(() => setFlash(false), 1600);
  };

  return (
    <div className="space-y-5">
      <SectionTitle title="Productos" sub="Gestioná nombre, imagen, descripción, precio y exportación" />

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-900 mb-3 flex items-center gap-2">
          <DollarSign className="w-4 h-4" /> Modificación masiva de precios
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Tipo</label>
            <div className="flex rounded-lg overflow-hidden border border-amber-300">
              {(['percent', 'amount'] as const).map(mode => (
                <button key={mode} onClick={() => setBulkMode(mode)} type="button"
                  className={`flex-1 py-2 text-xs font-semibold ${bulkMode === mode ? 'bg-amber-600 text-white' : 'bg-white text-gray-500 hover:bg-amber-100'}`}>
                  {mode === 'percent' ? <span className="inline-flex items-center gap-1"><Percent className="w-3 h-3" />%</span> : <span className="inline-flex items-center gap-1"><DollarSign className="w-3 h-3" />$</span>}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Valor</label>
            <Input type="number" value={bulkVal} onChange={e => setBulkVal(e.target.value)} placeholder={bulkMode === 'percent' ? '+10 o -5' : '5000'} className="bg-white" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Aplicar a</label>
            <select className="w-full h-10 px-3 border rounded-lg bg-white text-sm" value={bulkTarget} onChange={e => setBulkTarget(e.target.value as typeof bulkTarget)}>
              <option value="all">Todos</option>
              <option value="perfumes">Solo Perfumes</option>
              <option value="karsell">Solo Karsell</option>
              <option value="vs">Solo Vic. Secret</option>
            </select>
          </div>
          <Button onClick={applyBulk} className={`${flash ? 'bg-green-600 hover:bg-green-700' : 'bg-amber-600 hover:bg-amber-700'} text-white`}>
            {flash ? <><Check className="w-4 h-4 mr-1" />Listo</> : 'Aplicar'}
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Buscar producto..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Button type="button" variant="outline" onClick={() => downloadExcelCompatible(products)}><Download className="w-4 h-4 mr-2" />Exportar a Excel</Button>
        <Button onClick={addProduct} className="bg-gray-900 hover:bg-gray-700 text-white"><Plus className="w-4 h-4 mr-1" />Agregar</Button>
      </div>

      <div className="rounded-xl border bg-blue-50 border-blue-200 p-4 text-sm text-blue-900">
        Para cambiar imágenes rápido, podés hacerlo de dos formas: desde este panel pegando una URL, o directamente editando la propiedad <strong>image</strong> en <code>src/data/products.ts</code> si querés tocar el código fuente.
      </div>

      <div className="space-y-2">
        {filtered.map(product => (
          <ExpandRow key={product.id} label={product.name} sub={`$${product.price.toLocaleString('es-AR')} — stock: ${product.stock}`} img={product.image}
            expanded={expandedId === product.id} onToggle={() => toggle(product)} onDelete={() => del(product.id)}>
            {editing && editing.id === product.id && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-gray-600 block mb-1">Nombre</label>
                  <Input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Precio ($)</label>
                  <Input type="number" value={editing.price} onChange={e => {
                    const price = Number(e.target.value);
                    setEditing({ ...editing, price, transferPrice: price, installmentPrice: Math.round(price / Math.max(editing.installments || 3, 1)) });
                  }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Stock</label>
                  <Input type="number" min={0} value={editing.stock} onChange={e => setEditing({ ...editing, stock: Number(e.target.value) })} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-gray-600 block mb-1">URL de imagen</label>
                  <Input value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} placeholder="https://..." />
                  {editing.image && <img src={editing.image} className="mt-2 w-20 h-20 object-cover rounded-lg border" alt="preview" />}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-gray-600 block mb-1">Descripción</label>
                  <textarea className="w-full border rounded-lg px-3 py-2 text-sm resize-none bg-white" rows={3}
                    value={editing.description ?? ''}
                    onChange={e => setEditing({ ...editing, description: e.target.value })}
                    placeholder="Descripción del producto" />
                </div>
                <div className="sm:col-span-2 flex gap-2">
                  <Button className="flex-1 bg-gray-900 hover:bg-gray-700 text-white" onClick={save}><Save className="w-4 h-4 mr-1" />Guardar</Button>
                  <Button variant="outline" className="flex-1" onClick={() => { setEditing(null); setExpandedId(null); }}>Cancelar</Button>
                </div>
              </div>
            )}
          </ExpandRow>
        ))}
      </div>
    </div>
  );
}

function StockTab() {
  const { products, setAllProducts } = useSite();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'low' | 'out'>('all');

  const filtered = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => filter === 'all' || (filter === 'low' && p.stock > 0 && p.stock <= 3) || (filter === 'out' && p.stock === 0));

  const setStock = (id: number, value: number) => {
    setAllProducts(products.map(p => p.id === id ? { ...p, stock: Math.max(0, value) } : p));
  };

  return (
    <div className="space-y-5">
      <SectionTitle title="Gestión de Stock" sub="Controlá el estado agotado de cada producto" />
      <div className="flex flex-col sm:flex-row gap-2">
        <Input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1" />
        <div className="flex rounded-lg overflow-hidden border">
          {([['all', 'Todos'], ['low', 'Stock bajo'], ['out', 'Agotados']] as const).map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} type="button" className={`px-3 py-2 text-xs font-medium ${filter === val ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>{label}</button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {filtered.map(product => (
          <div key={product.id} className={`flex items-center gap-3 p-3 rounded-xl border bg-white ${product.stock === 0 ? 'border-red-200' : product.stock <= 3 ? 'border-amber-200' : ''}`}>
            <img src={product.image} className="w-10 h-10 object-cover rounded-lg flex-shrink-0" alt={product.name} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{product.name}</p>
              <p className="text-xs text-gray-400">${product.price.toLocaleString('es-AR')}</p>
            </div>
            {product.stock === 0 && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">Agotado</span>}
            <button onClick={() => setStock(product.id, product.stock - 1)} type="button" className="w-7 h-7 rounded-lg border bg-white hover:bg-gray-100">−</button>
            <span className="w-8 text-center text-sm font-semibold">{product.stock}</span>
            <button onClick={() => setStock(product.id, product.stock + 1)} type="button" className="w-7 h-7 rounded-lg border bg-white hover:bg-gray-100">+</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SliderTab() {
  const { slides, setSlides } = useSite();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editing, setEditing] = useState<SlideData | null>(null);

  const toggle = (slide: SlideData) => {
    if (expandedId === slide.id) { setExpandedId(null); setEditing(null); }
    else { setExpandedId(slide.id); setEditing({ ...slide }); }
  };

  const save = () => {
    if (!editing) return;
    setSlides(slides.map(s => s.id === editing.id ? editing : s));
    setExpandedId(null);
    setEditing(null);
  };

  const add = () => {
    const id = Math.max(...slides.map(s => s.id), 0) + 1;
    const slide: SlideData = { id, title: 'NUEVO TÍTULO', subtitle: 'SUBTÍTULO', features: ['Característica 1'], image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&h=500&fit=crop' };
    setSlides([...slides, slide]);
    setExpandedId(id);
    setEditing(slide);
  };

  return (
    <div className="space-y-4">
      <SectionTitle title="Slider / Banner" sub="Editá los slides del banner principal" />
      <div className="flex justify-end"><Button onClick={add} className="bg-gray-900 hover:bg-gray-700 text-white"><Plus className="w-4 h-4 mr-1" />Nuevo slide</Button></div>
      {slides.map((slide, index) => (
        <ExpandRow key={slide.id} label={slide.title} sub={`Slide #${index + 1}`} img={slide.image} expanded={expandedId === slide.id} onToggle={() => toggle(slide)} onDelete={slides.length > 1 ? () => setSlides(slides.filter(x => x.id !== slide.id)) : undefined}>
          {editing && editing.id === slide.id && (
            <div className="space-y-3">
              <Input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
              <Input value={editing.subtitle} onChange={e => setEditing({ ...editing, subtitle: e.target.value })} />
              <textarea className="w-full border rounded-lg px-3 py-2 text-sm resize-none bg-white" rows={3} value={editing.features.join('\n')} onChange={e => setEditing({ ...editing, features: e.target.value.split('\n').filter(Boolean) })} />
              <Input value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} />
              <div className="flex gap-2">
                <Button className="flex-1 bg-gray-900 hover:bg-gray-700 text-white" onClick={save}><Save className="w-4 h-4 mr-1" />Guardar</Button>
                <Button variant="outline" className="flex-1" onClick={() => { setExpandedId(null); setEditing(null); }}>Cancelar</Button>
              </div>
            </div>
          )}
        </ExpandRow>
      ))}
    </div>
  );
}

function NavTab() {
  const { navItems, setNavItems } = useSite();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editing, setEditing] = useState<NavItem | null>(null);

  const toggle = (item: NavItem) => {
    if (expandedId === item.id) { setExpandedId(null); setEditing(null); }
    else { setExpandedId(item.id); setEditing({ ...item }); }
  };

  const save = () => {
    if (!editing) return;
    setNavItems(navItems.map(item => item.id === editing.id ? editing : item));
    setExpandedId(null);
    setEditing(null);
  };

  const add = () => {
    const id = Math.max(...navItems.map(item => item.id), 0) + 1;
    const item: NavItem = { id, label: 'NUEVO LINK', href: '#', content: '<p>Contenido editable</p>' };
    setNavItems([...navItems, item]);
    setExpandedId(id);
    setEditing(item);
  };

  return (
    <div className="space-y-4">
      <SectionTitle title="Menú de Navegación" sub="Editá los ítems y su contenido enriquecido estilo TinyMCE" />
      <div className="flex justify-end"><Button onClick={add} className="bg-gray-900 hover:bg-gray-700 text-white"><Plus className="w-4 h-4 mr-1" />Agregar</Button></div>
      {navItems.map(item => (
        <ExpandRow key={item.id} label={item.label} sub={item.href} expanded={expandedId === item.id} onToggle={() => toggle(item)} onDelete={() => setNavItems(navItems.filter(x => x.id !== item.id))}>
          {editing && editing.id === item.id && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input value={editing.label} onChange={e => setEditing({ ...editing, label: e.target.value })} />
                <Input value={editing.href} onChange={e => setEditing({ ...editing, href: e.target.value })} placeholder="#productos" />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" checked={!!editing.hasDropdown} onChange={e => setEditing({ ...editing, hasDropdown: e.target.checked })} />
                Mostrar dropdown
              </label>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-2">Contenido del dropdown</label>
                <RichTextEditor value={editing.content ?? ''} onChange={(content) => setEditing({ ...editing, content })} />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-gray-900 hover:bg-gray-700 text-white" onClick={save}><Save className="w-4 h-4 mr-1" />Guardar</Button>
                <Button variant="outline" className="flex-1" onClick={() => { setExpandedId(null); setEditing(null); }}>Cancelar</Button>
              </div>
            </div>
          )}
        </ExpandRow>
      ))}
    </div>
  );
}

function PromosTab() {
  const { promoCards, setPromoCards } = useSite();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editing, setEditing] = useState<PromoCard | null>(null);

  const toggle = (promo: PromoCard) => {
    if (expandedId === promo.id) { setExpandedId(null); setEditing(null); }
    else { setExpandedId(promo.id); setEditing({ ...promo }); }
  };

  const save = () => {
    if (!editing) return;
    setPromoCards(promoCards.map(p => p.id === editing.id ? editing : p));
    setExpandedId(null);
    setEditing(null);
  };

  const add = () => {
    const id = Math.max(...promoCards.map(p => p.id), 0) + 1;
    const promo: PromoCard = { id, title: 'NUEVA PROMO', subtitle: 'Descripción', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop', agotado: false };
    setPromoCards([...promoCards, promo]);
    setExpandedId(id);
    setEditing(promo);
  };

  return (
    <div className="space-y-4">
      <SectionTitle title="Promociones" sub="Las promos ya no están hardcodeadas" />
      <div className="flex justify-end"><Button onClick={add} className="bg-gray-900 hover:bg-gray-700 text-white"><Plus className="w-4 h-4 mr-1" />Agregar</Button></div>
      {promoCards.map(promo => (
        <ExpandRow key={promo.id} label={promo.title} sub={promo.subtitle} img={promo.image} agotado={promo.agotado} expanded={expandedId === promo.id} onToggle={() => toggle(promo)} onDelete={() => setPromoCards(promoCards.filter(x => x.id !== promo.id))}>
          {editing && editing.id === promo.id && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
                <Input value={editing.subtitle} onChange={e => setEditing({ ...editing, subtitle: e.target.value })} />
              </div>
              <Input value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} />
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" checked={editing.agotado} onChange={e => setEditing({ ...editing, agotado: e.target.checked })} />
                Marcar como agotado
              </label>
              <div className="flex gap-2">
                <Button className="flex-1 bg-gray-900 hover:bg-gray-700 text-white" onClick={save}><Save className="w-4 h-4 mr-1" />Guardar</Button>
                <Button variant="outline" className="flex-1" onClick={() => { setExpandedId(null); setEditing(null); }}>Cancelar</Button>
              </div>
            </div>
          )}
        </ExpandRow>
      ))}
    </div>
  );
}

function CategoriesTab() {
  const { categoryCards, setCategoryCards } = useSite();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editing, setEditing] = useState<CategoryCard | null>(null);

  const toggle = (card: CategoryCard) => {
    if (expandedId === card.id) { setExpandedId(null); setEditing(null); }
    else { setExpandedId(card.id); setEditing({ ...card }); }
  };

  const save = () => {
    if (!editing) return;
    setCategoryCards(categoryCards.map(card => card.id === editing.id ? editing : card));
    setExpandedId(null);
    setEditing(null);
  };

  return (
    <div className="space-y-4">
      <SectionTitle title="Categorías" sub="Editá el texto visible de cada categoría" />
      {categoryCards.map(card => (
        <ExpandRow key={card.id} label={card.label} sub={`Badge: ${card.badge} · Color: ${card.color}`} expanded={expandedId === card.id} onToggle={() => toggle(card)}>
          {editing && editing.id === card.id && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input value={editing.label} onChange={e => setEditing({ ...editing, label: e.target.value })} />
                <Input value={editing.badge} onChange={e => setEditing({ ...editing, badge: e.target.value })} />
              </div>
              <textarea className="w-full border rounded-lg px-3 py-2 text-sm resize-none bg-white" rows={3} value={editing.description ?? ''} onChange={e => setEditing({ ...editing, description: e.target.value })} placeholder="Descripción breve" />
              <div className="flex gap-2 flex-wrap">
                {COLOR_OPTIONS.map(color => (
                  <button key={color} type="button" onClick={() => setEditing({ ...editing, color })} className={`px-3 py-1.5 rounded-lg text-sm border-2 capitalize ${COLOR_CLASSES[color]} ${editing.color === color ? 'border-gray-900' : 'border-transparent'}`}>{color}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-gray-900 hover:bg-gray-700 text-white" onClick={save}><Save className="w-4 h-4 mr-1" />Guardar</Button>
                <Button variant="outline" className="flex-1" onClick={() => { setExpandedId(null); setEditing(null); }}>Cancelar</Button>
              </div>
            </div>
          )}
        </ExpandRow>
      ))}
    </div>
  );
}

function BrandingTab() {
  const { seo, setSeo, logo, setLogo, socials, setSocials, footer, setFooter, resetSiteConfig } = useSite();
  const previewTitle = useMemo(() => seo.previewTitle || seo.title, [seo]);
  const previewDescription = useMemo(() => seo.previewDescription || seo.description, [seo]);

  return (
    <div className="space-y-8">
      <SectionTitle title="SEO / Marca / Redes" sub="Configurá cómo se ve la tienda y cómo se comparte" />

      <div className="bg-white border rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2"><Globe className="w-4 h-4" /><h3 className="font-semibold">SEO editable</h3></div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2"><label className="text-xs text-gray-600 block mb-1">Title</label><Input value={seo.title} onChange={e => setSeo({ ...seo, title: e.target.value })} /></div>
          <div className="md:col-span-2"><label className="text-xs text-gray-600 block mb-1">Description</label><textarea className="w-full border rounded-lg px-3 py-2 text-sm resize-none bg-white" rows={3} value={seo.description} onChange={e => setSeo({ ...seo, description: e.target.value })} /></div>
          <div><label className="text-xs text-gray-600 block mb-1">Preview title</label><Input value={seo.previewTitle} onChange={e => setSeo({ ...seo, previewTitle: e.target.value })} /></div>
          <div><label className="text-xs text-gray-600 block mb-1">Preview description</label><Input value={seo.previewDescription} onChange={e => setSeo({ ...seo, previewDescription: e.target.value })} /></div>
          <div className="md:col-span-2"><label className="text-xs text-gray-600 block mb-1">Preview image</label><Input value={seo.previewImage} onChange={e => setSeo({ ...seo, previewImage: e.target.value })} /></div>
        </div>
        <div className="rounded-xl border overflow-hidden max-w-xl">
          <div className="aspect-[1.91/1] bg-gray-100"><img src={seo.previewImage} alt="preview" className="w-full h-full object-cover" /></div>
          <div className="p-4">
            <p className="text-sm text-gray-500">Vista previa al compartir</p>
            <h4 className="font-semibold text-lg">{previewTitle}</h4>
            <p className="text-sm text-gray-600">{previewDescription}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2"><Palette className="w-4 h-4" /><h3 className="font-semibold">Logo editable</h3></div>
        <div className="grid gap-3 md:grid-cols-2">
          <div><label className="text-xs text-gray-600 block mb-1">Texto superior</label><Input value={logo.textTop} onChange={e => setLogo({ ...logo, textTop: e.target.value })} /></div>
          <div><label className="text-xs text-gray-600 block mb-1">Texto inferior</label><Input value={logo.textBottom} onChange={e => setLogo({ ...logo, textBottom: e.target.value })} /></div>
          <div><label className="text-xs text-gray-600 block mb-1">Fuente</label><select className="w-full h-10 px-3 border rounded-lg bg-white text-sm" value={logo.fontFamily} onChange={e => setLogo({ ...logo, fontFamily: e.target.value })}>{FONT_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
          <div><label className="text-xs text-gray-600 block mb-1">Forma</label><select className="w-full h-10 px-3 border rounded-lg bg-white text-sm" value={logo.shape} onChange={e => setLogo({ ...logo, shape: e.target.value as typeof logo.shape })}><option value="circle">Circular</option><option value="rounded">Redondeado</option></select></div>
        </div>
        <div className="w-24 h-24 bg-black text-white flex items-center justify-center" style={{ fontFamily: logo.fontFamily, borderRadius: logo.shape === 'circle' ? 9999 : 24 }}>
          <div className="text-center leading-tight"><div className="text-sm font-bold uppercase">{logo.textTop}</div><div className="text-[10px] uppercase">{logo.textBottom}</div></div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-5 space-y-4">
        <h3 className="font-semibold">Redes y footer</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <Input value={socials.instagram} onChange={e => setSocials({ ...socials, instagram: e.target.value })} placeholder="Instagram URL" />
          <Input value={socials.facebook} onChange={e => setSocials({ ...socials, facebook: e.target.value })} placeholder="Facebook URL" />
          <Input value={socials.whatsapp} onChange={e => setSocials({ ...socials, whatsapp: e.target.value })} placeholder="WhatsApp" />
          <Input value={footer.shippingBadge} onChange={e => setFooter({ ...footer, shippingBadge: e.target.value })} placeholder="Badge envío" />
          <Input value={footer.regretText} onChange={e => setFooter({ ...footer, regretText: e.target.value })} placeholder="Texto arrepentimiento" />
          <Input value={footer.regretLink} onChange={e => setFooter({ ...footer, regretLink: e.target.value })} placeholder="Link arrepentimiento" />
          <div className="md:col-span-2"><textarea className="w-full border rounded-lg px-3 py-2 text-sm resize-none bg-white" rows={3} value={footer.consumerText} onChange={e => setFooter({ ...footer, consumerText: e.target.value })} /></div>
          <div className="md:col-span-2"><Input value={footer.copyright} onChange={e => setFooter({ ...footer, copyright: e.target.value })} /></div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => { if (confirm('¿Restaurar valores por defecto?')) resetSiteConfig(); }}>
          <RefreshCw className="w-4 h-4 mr-2" />Restaurar configuración inicial
        </Button>
      </div>
    </div>
  );
}

function SecurityTab({ onLogout }: { onLogout: () => void }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const handleChange = () => {
    setMsg(null);
    if (current !== getStoredPassword()) return setMsg({ type: 'err', text: 'La contraseña actual no es correcta' });
    if (next.length < 6) return setMsg({ type: 'err', text: 'La nueva contraseña debe tener al menos 6 caracteres' });
    if (next !== confirmPass) return setMsg({ type: 'err', text: 'Las contraseñas no coinciden' });
    setStoredPassword(next);
    setCurrent('');
    setNext('');
    setConfirmPass('');
    setMsg({ type: 'ok', text: 'Contraseña actualizada correctamente' });
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="Seguridad" sub="Protegé el acceso al panel" />
      <div className="bg-white border rounded-xl p-6 space-y-4 max-w-md">
        <Input type="password" value={current} onChange={e => setCurrent(e.target.value)} placeholder="Contraseña actual" />
        <Input type="password" value={next} onChange={e => setNext(e.target.value)} placeholder="Nueva contraseña" />
        <Input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder="Confirmar nueva contraseña" />
        {msg && <div className={`text-sm px-3 py-2 rounded-lg ${msg.type === 'ok' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{msg.text}</div>}
        <Button onClick={handleChange} className="w-full bg-gray-900 hover:bg-gray-700 text-white"><KeyRound className="w-4 h-4 mr-2" />Cambiar contraseña</Button>
        <Button variant="outline" onClick={onLogout} className="w-full text-red-600 border-red-200 hover:bg-red-50"><LogOut className="w-4 h-4 mr-2" />Cerrar sesión</Button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(isSessionActive());
  const [tab, setTab] = useState<Tab>('products');

  const handleLogout = () => {
    clearSession();
    setAuthed(false);
    setTab('products');
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-gray-900 text-white h-14 flex items-center px-6 gap-4 shrink-0">
        <div>
          <p className="text-sm font-bold leading-none">Panel Admin</p>
          <p className="text-gray-400 text-[10px]">CS Perfumes</p>
        </div>
        <div className="flex-1" />
        <button onClick={handleLogout} type="button" className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 text-sm transition-colors mr-3"><LogOut className="w-4 h-4" /> Salir</button>
        <a href="/" className="flex items-center gap-1.5 text-gray-300 hover:text-white text-sm transition-colors"><ArrowLeft className="w-4 h-4" /> Ver tienda</a>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 bg-white border-r shrink-0 flex flex-col overflow-y-auto">
          <nav className="flex-1 p-3 space-y-0.5">
            {TABS.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setTab(id)} type="button" className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${tab === id ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                <Icon className="w-4 h-4 shrink-0" />{label}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t"><p className="text-[10px] text-gray-400 text-center leading-snug">Los cambios se guardan en el navegador y se reflejan en la web al instante.</p></div>
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {tab === 'products' && <ProductsTab />}
            {tab === 'stock' && <StockTab />}
            {tab === 'slider' && <SliderTab />}
            {tab === 'nav' && <NavTab />}
            {tab === 'promos' && <PromosTab />}
            {tab === 'categories' && <CategoriesTab />}
            {tab === 'branding' && <BrandingTab />}
            {tab === 'security' && <SecurityTab onLogout={handleLogout} />}
          </div>
        </main>
      </div>
    </div>
  );
}
