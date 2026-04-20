import { useEffect, useMemo, useState } from 'react';
import { ChevronRight, ShoppingCart, ExternalLink } from 'lucide-react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getProductImages, productPath } from '@/lib/product';
import { getRelatedProducts, inferBadge, inferBrand, inferCategory, inferGender } from '@/lib/catalog';
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

export default function ProductDetailPage({ product, onAddToCart }: ProductDetailPageProps) {
  const { seo, products } = useSite();
  const images = useMemo(() => (product ? getProductImages(product) : []), [product]);
  const relatedProducts = useMemo(() => (product ? getRelatedProducts(product, products, 4) : []), [product, products]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!product) return;

    const originalTitle = document.title;
    const originalDescription = (document.head.querySelector('meta[name="description"]') as HTMLMetaElement | null)?.getAttribute('content') ?? seo.description;
    const originalOgTitle = (document.head.querySelector('meta[property="og:title"]') as HTMLMetaElement | null)?.getAttribute('content') ?? (seo.previewTitle || seo.title);
    const originalOgDescription = (document.head.querySelector('meta[property="og:description"]') as HTMLMetaElement | null)?.getAttribute('content') ?? (seo.previewDescription || seo.description);
    const originalOgImage = (document.head.querySelector('meta[property="og:image"]') as HTMLMetaElement | null)?.getAttribute('content') ?? seo.previewImage;

    const description = product.description?.trim() || `${product.name} disponible en Perfumes CS.`;
    const image = images[0] || product.image || seo.previewImage;
    const title = `${product.name} | Perfumes CS`;

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
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-14">
        <div className="rounded-3xl border bg-gray-50 p-10 text-center">
          <h1 className="text-2xl font-bold mb-2">Producto no encontrado</h1>
          <p className="text-gray-600 mb-6">La ficha que querés abrir no existe o cambió de URL.</p>
          <Button asChild className="bg-black hover:bg-gray-800"><a href="/">Volver al catálogo</a></Button>
        </div>
      </main>
    );
  }

  const currentImage = images[activeImage] ?? product.image;

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-black">Inicio</a>
        <ChevronRight className="w-4 h-4" />
        <a href="/#productos" className="hover:text-black">Productos</a>
        <ChevronRight className="w-4 h-4" />
        <span className="text-black">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
        <div>
          <div className="aspect-square rounded-3xl overflow-hidden border bg-gray-50 shadow-sm">
            <img src={currentImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-4">
              {images.map((image, index) => (
                <button
                  key={`${product.id}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 bg-white ${activeImage === index ? 'border-black' : 'border-gray-200'}`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24">
          <div className="rounded-3xl border p-6 md:p-8 bg-white shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary">{inferBrand(product)}</Badge>
                  <Badge variant="secondary">{inferCategory(product)}</Badge>
                  <Badge variant="secondary">{inferGender(product)}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight">{product.name}</h1>
                <p className="text-gray-500 mt-2">Fragancia disponible en tienda.</p>
              </div>
              {product.stock === 0 ? (
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">{inferBadge(product) ?? 'Agotado'}</Badge>
              ) : product.stock <= 3 ? (
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">{inferBadge(product) ?? 'Últimas unidades'}</Badge>
              ) : (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{inferBadge(product) ?? 'En stock'}</Badge>
              )}
            </div>

            <div className="mt-6 border-y py-5 space-y-2">
              <p className="text-4xl font-bold">${product.price.toLocaleString('es-AR')}</p>
              <p className="text-sm text-gray-500">{product.stock === 0 ? 'Sin stock por el momento' : `${product.stock} unidades disponibles`}</p>
            </div>

            {product.description && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Descripción</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              <Button
                className="bg-black hover:bg-gray-800 h-11"
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
              </Button>
              <Button asChild variant="outline" className="h-11">
                <a href="/" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />Seguir comprando
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-12 md:mt-16">
          <div className="flex items-end justify-between gap-3 mb-5">
            <div>
              <h2 className="text-2xl font-bold">Productos relacionados</h2>
              <p className="text-sm text-gray-500">Te pueden interesar por marca, tipo o estilo similar.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <a key={item.id} href={productPath(item)} className="group rounded-2xl border bg-white overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-50 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <div className="flex flex-wrap gap-1 mb-2 text-[10px]">
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">{inferBrand(item)}</span>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">{inferGender(item)}</span>
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">{item.name}</h3>
                  <p className="text-sm font-bold mt-2">${item.price.toLocaleString('es-AR')}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
