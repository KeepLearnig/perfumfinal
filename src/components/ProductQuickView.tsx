import { useMemo, useState } from 'react';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { getProductImages, productPath } from '@/lib/product';

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductQuickView({ product, open, onOpenChange, onAddToCart }: ProductQuickViewProps) {
  const images = useMemo(() => (product ? getProductImages(product) : []), [product]);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return null;

  const currentImage = images[activeImage] ?? product.image;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white">
        <div className="grid md:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b md:border-b-0 md:border-r bg-gray-50 p-4 md:p-6">
            <div className="aspect-square overflow-hidden rounded-2xl bg-white border">
              <img src={currentImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {images.map((image, index) => (
                  <button
                    key={`${product.id}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 ${activeImage === index ? 'border-black' : 'border-transparent'}`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-5 md:p-6 flex flex-col">
            <DialogHeader className="text-left">
              <div className="flex items-start justify-between gap-3">
                <DialogTitle className="text-2xl leading-tight">{product.name}</DialogTitle>
                {product.stock === 0 ? (
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Agotado</Badge>
                ) : product.stock <= 3 ? (
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Últimas unidades</Badge>
                ) : (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Disponible</Badge>
                )}
              </div>
              <DialogDescription className="text-base text-gray-500 pt-1">
                Vista rápida del producto.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-5 space-y-4 flex-1">
              <div>
                <p className="text-3xl font-bold text-black">${product.price.toLocaleString('es-AR')}</p>
                <p className="text-sm text-gray-500">{product.stock === 0 ? 'Sin stock' : `${product.stock} disponibles`}</p>
              </div>

              {product.description && (
                <div className="rounded-2xl border bg-gray-50 p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{product.description}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <Button
                className="bg-black hover:bg-gray-800"
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
              </Button>
              <Button asChild variant="outline">
                <a href={productPath(product)} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />Abrir ficha completa
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
