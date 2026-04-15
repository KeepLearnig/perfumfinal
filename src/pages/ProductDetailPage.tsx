import { useMemo, useState } from 'react';
import { ChevronRight, ShoppingCart, ExternalLink } from 'lucide-react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getProductImages } from '@/lib/product';

interface ProductDetailPageProps {
  product: Product | null;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailPage({ product, onAddToCart }: ProductDetailPageProps) {
  const images = useMemo(() => (product ? getProductImages(product) : []), [product]);
  const [activeImage, setActiveImage] = useState(0);

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
                <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight">{product.name}</h1>
                <p className="text-gray-500 mt-2">Fragancia disponible en tienda.</p>
              </div>
              {product.stock === 0 ? (
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Agotado</Badge>
              ) : product.stock <= 3 ? (
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Últimas unidades</Badge>
              ) : (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">En stock</Badge>
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
    </main>
  );
}
