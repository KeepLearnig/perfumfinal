import type { Product } from '@/types';

export function productSlug(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function productPath(product: Product) {
  return `/productos/${productSlug(product.name)}-${product.id}`;
}

export function getProductImages(product: Product) {
  const gallery = Array.isArray(product.images) ? product.images : [];
  const merged = [product.image, ...gallery].filter((img): img is string => typeof img === 'string' && img.trim().length > 0);
  return [...new Set(merged)];
}

export function getProductIdFromPath(pathname: string) {
  const match = pathname.match(/-(\d+)\/?$/);
  return match ? Number(match[1]) : null;
}
