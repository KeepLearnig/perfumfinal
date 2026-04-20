import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { productPath } from '@/lib/product';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <section>
      <h2 className="mb-1 text-2xl font-bold">{products.length > 16 ? 'Catálogo completo' : 'Catálogo'}</h2>
      <p className="mb-6 text-gray-600">Explorá perfumes, body mist, lociones y cuidado capilar.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <a href={productPath(product)} className="block">
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  {product.stock === 0 ? <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">SIN STOCK</span> : null}
                  {product.stock > 0 && product.stock <= 3 ? <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">ÚLTIMAS</span> : null}
                  {product.badgeText ? <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">{product.badgeText}</span> : null}
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2 flex flex-wrap gap-2 text-xs text-gray-500">
                  {product.brandCategory ? <span className="rounded-full border px-2 py-1">{product.brandCategory}</span> : null}
                  {product.category ? <span className="rounded-full border px-2 py-1">{product.category}</span> : null}
                  {product.genderCategory ? <span className="rounded-full border px-2 py-1">{product.genderCategory}</span> : null}
                </div>
                <h3 className="line-clamp-2 min-h-[3.5rem] font-semibold text-gray-900">{product.name}</h3>
                {product.description ? <p className="mt-2 line-clamp-3 text-sm text-gray-600">{product.description}</p> : null}
                <div className="mt-3 text-sm text-gray-500">{product.stock === 0 ? 'Agotado' : `${product.stock} disponibles`}</div>
                <div className="mt-3 text-xl font-bold text-gray-900">${product.price.toLocaleString('es-AR')}</div>
              </div>
            </a>

            <div className="p-4 pt-0">
              <Button className="w-full" onClick={() => onAddToCart(product)} disabled={product.stock === 0}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.stock === 0 ? 'Agotado' : 'Comprar'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
