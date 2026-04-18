import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const productsPath = path.join(root, 'public', 'data', 'products.json');
const siteContentPath = path.join(root, 'public', 'data', 'site-content.json');
const outputPath = path.join(root, 'src', 'generated', 'product-og-data.ts');

function slugify(name) {
  return String(name ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function firstImage(product, fallbackImage) {
  const images = [product?.image, ...(Array.isArray(product?.images) ? product.images : [])]
    .filter((value) => typeof value === 'string' && value.trim().length > 0);
  return images[0] || fallbackImage;
}

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const siteContent = JSON.parse(fs.readFileSync(siteContentPath, 'utf8'));
const seo = siteContent?.seo ?? {};
const fallbackImage = seo.previewImage || '';

const entries = Array.isArray(products) ? products.map((product) => {
  const id = Number(product?.id);
  const name = String(product?.name ?? `Producto ${id || ''}`).trim();
  const slug = `${slugify(name)}-${id}`;
  return {
    slug,
    id,
    name,
    description: String(product?.description || `${name} disponible en Perfumes CS.`).trim(),
    shortDescription: String(product?.description || 'Fragancias premium y envíos a todo el país').trim().slice(0, 90),
    price: Number(product?.price) || undefined,
    image: firstImage(product, fallbackImage),
  };
}).filter((item) => Number.isFinite(item.id) && item.slug && item.image) : [];

const bySlug = Object.fromEntries(entries.map((item) => [item.slug, item]));

const source = `export interface ProductOgEntry {\n  slug: string;\n  id: number;\n  name: string;\n  description: string;\n  shortDescription: string;\n  price?: number;\n  image: string;\n}\n\nexport const productOgData: Record<string, ProductOgEntry> = ${JSON.stringify(bySlug, null, 2)};\n`;

fs.writeFileSync(outputPath, source, 'utf8');
console.log(`Generated OG data for ${entries.length} products -> ${path.relative(root, outputPath)}`);
