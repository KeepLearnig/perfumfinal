import { useState } from 'react';
import { ShoppingCart, Search, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { ProductQuickView } from '@/components/ProductQuickView';
import { productPath } from '@/lib/product';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section className="pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              {products.length > 16 ? 'Catálogo Completo' : 'Destacados'}
            </h2>
            <p className="text-gray-600 mt-1">Explorá nuestra selección de fragancias y cuidado personal</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <a href={productPath(product)} target="_blank" rel="noopener noreferrer" className="relative aspect-square overflow-hidden bg-gray-50 block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                {product.stock === 0 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">AGOTADO</div>
                )}
                {product.stock > 0 && product.stock <= 3 && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">ÚLTIMAS</div>
                )}
              </a>

              <div className="p-4 flex flex-col flex-1">
                <a href={productPath(product)} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2">
                  <h3 className="font-semibold text-sm md:text-base mb-1 text-gray-900 line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>
                </a>
                {product.description && (
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2 min-h-[2rem]">{product.description}</p>
                )}

                <div className="flex items-center justify-between text-xs mb-3">
                  <span className={`px-2 py-1 rounded-full font-medium ${
                    product.stock === 0
                      ? 'bg-red-100 text-red-700'
                      : product.stock <= 3
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-green-100 text-green-700'
                  }`}>
                    {product.stock === 0 ? 'Agotado' : `${product.stock} disponibles`}
                  </span>
                </div>

                <div className="mt-2 space-y-1">
                  <p className="text-lg font-bold text-black">${product.price.toLocaleString('es-AR')}</p>
                </div>

                <div className="grid grid-cols-1 gap-2 mt-auto pt-3">
                  <Button
                    variant="outline"
                    className="text-sm"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <Search className="w-4 h-4 mr-2" />Ver producto
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      className="bg-black hover:bg-gray-800 text-sm"
                      onClick={() => onAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.stock === 0 ? 'Agotado' : 'Comprar'}
                    </Button>
                    <Button asChild variant="secondary" className="text-sm">
                      <a href={productPath(product)} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />Ficha
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductQuickView
        product={selectedProduct}
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
}
