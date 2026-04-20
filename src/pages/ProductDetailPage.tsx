import { useEffect, useMemo, useState } from 'react';
import { ChevronRight, ShoppingCart, ExternalLink, Sparkles } from 'lucide-react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getProductImages, productPath } from '@/lib/product';
import { useSite } from '@/context/SiteContext';

interface ProductDetailPageProps {
  product: Product | null;
  onAddToCart: (product: Product) => void;
}

function upsertMeta(selector: string, attr: 'name' | 'property', value: string, content: string) {
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function buildAutoRelated(product: Product, products: Product[]) {
  const explicit = new Set(product.relatedIds ?? []);
  const explicitMatches = products.filter((item) => explicit.has(item.id) && item.id !== product.id);

  const scored = products
    .filter((item) => item.id !== product.id && !explicit.has(item.id))
    .map((item) => {
      let score = 0;
      if (item.brandCategory && item.brandCategory === product.brandCategory) score += 5;
      if (item.category && item.category === product.category) score += 4;
      if (item.genderCategory && item.genderCategory === product.genderCategory) score += 3;
      if (Math.abs(item.price - product.price) <= Math.max(10000, product.price * 0.15)) score += 2;
      if (item.stock > 0) score += 1;
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
    .slice(0, Math.max(0, 4 - explicitMatches.length))
    .map(({ item }) => item);

  return [...explicitMatches, ...scored].slice(0, 4);
}

function ProductCard({ item, onAddToCart }: { item: Product; onAddToCart: (product: Product) => void }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <a href={productPath(item)} className="block">
        <div className="aspect-square overflow-hidden rounded-2xl bg-gray-50">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.brandCategory ? <Badge variant="outline">{item.brandCategory}</Badge> : null}
          {item.stock === 0 ? <Badge variant="destructive">Sin stock</Badge> : item.stock <= 3 ? <Badge>Últimas</Badge> : null}
        </div>
        <h3 className="mt-3 font-semibold text-gray-900">{item.name}</h3>
        {item.description ? <p className="mt-1 line-clamp-3 text-sm text-gray-600">{item.description}</p> : null}
      </a>
      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="font-bold text-gray-900">${item.price.toLocaleString('es-AR')}</div>
        <Button size="sm" onClick={() => onAddToCart(item)} disabled={item.stock === 0}>
          {item.stock === 0 ? 'Agotado' : 'Comprar'}
        </Button>
      </div>
    </div>
  );
}

export default function ProductDetailPage({ product, onAddToCart }: ProductDetailPageProps) {
  const { seo, products } = useSite();
  const images = useMemo(() => (product ? getProductImages(product) : []), [product]);
  const relatedProducts = useMemo(() => (product ? buildAutoRelated(product, products) : []), [product, products]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!product) return;

    const originalTitle = document.title;
    const originalDescription = (document.head.querySelector('meta[name="description"]') as HTMLMetaElement | null)?.getAttribute('content') ?? seo.description;
    const originalOgTitle = (document.head.querySelector('meta[property="og:title"]') as HTMLMetaElement | null)?.getAttribute('content') ?? (seo.previewTitle || seo.title);
    const originalOgDescription = (document.head.querySelector('meta[property="og:description"]') as HTMLMetaElement | null)?.getAttribute('content') ?? (seo.previewDescription || seo.description);
    const originalOgImage = (document.head.querySelector('meta[property="og:image"]') as HTMLMetaElement | null)?.getAttribute('content') ?? seo.previewImage;
    const description = product.seoDescription?.trim() || product.description?.trim() || `${product.name} disponible en Perfumes CS.`;
    const image = images[0] || product.image || seo.previewImage;
    const title = product.seoTitle?.trim() || `${product.name} | Perfumes CS`;

    document.title = title;
    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', image);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'product');

    return () => {
      document.title = originalTitle;
      upsertMeta('meta[name="description"]', 'name', 'description', originalDescription);
      upsertMeta('meta[property="og:title"]', 'property', 'og:title', originalOgTitle);
      upsertMeta('meta[property="og:description"]', 'property', 'og:description', originalOgDescription);
      upsertMeta('meta[property="og:image"]', 'property', 'og:image', originalOgImage);
      upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    };
  }, [product, images, seo]);

  useEffect(() => {
    setActiveImage(0);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Producto no encontrado</h1>
        <p className="mt-3 text-gray-600">La ficha que querés abrir no existe o cambió de URL.</p>
        <a href="/" className="mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-gray-50">
          Volver al catálogo
        </a>
      </div>
    );
  }

  const currentImage = images[activeImage] ?? product.image;
  const shortStatus =
    product.stock === 0 ? 'Agotado' : product.stock <= 3 ? 'Últimas unidades' : 'En stock';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <a href="/" className="hover:text-black">Inicio</a>
        <ChevronRight className="h-4 w-4" />
        <a href="/#productos" className="hover:text-black">Productos</a>
        <ChevronRight className="h-4 w-4" />
        <span className="text-black">{product.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="aspect-square overflow-hidden rounded-3xl border border-gray-200 bg-white">
            <img src={currentImage} alt={product.name} className="h-full w-full object-cover" />
          </div>

          {images.length > 1 ? (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square overflow-hidden rounded-2xl border-2 bg-white ${activeImage === index ? 'border-black' : 'border-gray-200'}`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {product.brandCategory ? <Badge variant="outline">{product.brandCategory}</Badge> : null}
            {product.category ? <Badge variant="outline">{product.category}</Badge> : null}
            {product.genderCategory ? <Badge variant="outline">{product.genderCategory}</Badge> : null}
            {product.badgeText ? <Badge>{product.badgeText}</Badge> : null}
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight">{product.name}</h1>
          <p className="mt-3 text-gray-600">Fragancia disponible en tienda.</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Badge variant={product.stock === 0 ? 'destructive' : 'default'}>{shortStatus}</Badge>
            <span className="text-sm text-gray-500">
              {product.stock === 0 ? 'Sin stock por el momento' : `${product.stock} unidades disponibles`}
            </span>
          </div>

          <div className="mt-6 text-4xl font-bold text-gray-900">${product.price.toLocaleString('es-AR')}</div>
          {product.transferPrice > 0 ? (
            <p className="mt-2 text-sm text-gray-500">Transferencia: ${product.transferPrice.toLocaleString('es-AR')}</p>
          ) : null}

          {product.description ? (
            <div className="mt-8 rounded-3xl border border-gray-200 bg-gray-50 p-5">
              <h2 className="text-lg font-semibold">Descripción</h2>
              <p className="mt-3 whitespace-pre-line text-gray-700">{product.description}</p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => onAddToCart(product)} disabled={product.stock === 0}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
            </Button>
            <a href="/#productos" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-gray-50">
              <ExternalLink className="h-4 w-4" />
              Seguir comprando
            </a>
          </div>
        </div>
      </div>

      <section className="mt-14">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          <h2 className="text-2xl font-bold">Productos relacionados</h2>
        </div>
        <p className="mb-6 text-sm text-gray-600">
          Seleccionados por marca, categoría, segmento y rango de precio para mejorar la navegación.
        </p>

        {relatedProducts.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} item={item} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-sm text-gray-500">
            Todavía no hay suficientes coincidencias para mostrar relacionados en esta ficha.
          </div>
        )}
      </section>
    </div>
  );
}
