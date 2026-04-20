import type { Product } from '@/types';

export type Segment = 'Masculino' | 'Femenino' | 'Unisex';

const BRAND_RULES: Array<{ test: RegExp; brand: string }> = [
  { test: /^9AM|^9PM|AFNAN/i, brand: 'Afnan' },
  { test: /^ALAHAMBRA|^AL HAMBRA|^ALHAMBRA|^MAISON ALHAMBRA|^JEAN LOWE|^GLACIER|^SALVO|^VICTORIOSO|^LA VOIE|^DELILAH|^KISMET|^EXPOSE|^CHANTS/i, brand: 'Maison Alhambra' },
  { test: /^AL HARAMAIN|^AMBER OUD/i, brand: 'Al Haramain' },
  { test: /^AL WATANIAH|^SABAH AL WARD/i, brand: 'Al Wataniah' },
  { test: /^AMERAT|^AMEERAT/i, brand: 'Asdaaf' },
  { test: /^ASAD|^BADEE AL OUD|^KHAMRAH|^LATTAFA|^YARA|^MAYAR|^NEBRAS|^EMAAN|^HAYA|^HAYAATI|^FAKHAR|^MAAHIR|^SAKEENA|^TERIAQ|^SHAHEEN|^THE KINGDOM|^SEHR|^QAED AL FURSAN|^HONOR AND GLORY|^ISHQ AL SHUYUKH|^ECLAIRE|^ANA ABIYEDH|^AL NOBLE|^AMEER AL OUD/i, brand: 'Lattafa' },
  { test: /^BHARARA/i, brand: 'Bharara' },
  { test: /^CLUB DE NUIT|^ODYSSEY|^ODISSEY|^TRES NUIT|^UNTOLD|^SILLAGE|^SUPREMACY/i, brand: 'Armaf' },
  { test: /^RASASI HAWAS|^RASASI/i, brand: 'Rasasi' },
  { test: /^RAYHAAN/i, brand: 'Rayhaan' },
  { test: /^ZIMAYA/i, brand: 'Zimaya' },
  { test: /^VICTORIA'?S SECRET|^LOVE SPELL|^AQUA KISS|^PURE SEDUCTION|^BARE VANILLA|^COCONUT PASSION|^VELVET PETALS|^AMBER ROMANCE|^MIDNIGHT BLOOM|^RUSH|^TEMPTATION|^ROMANTIC/i, brand: "Victoria's Secret" },
  { test: /^KARSELL|CREMA KARSELL|ÓLEO KARSELL|OLEO KARSELL|SHAMPOO KARSELL/i, brand: 'Karsell' },
  { test: /^PHILOS/i, brand: 'Maison Alhambra' },
  { test: /^PRIDE /i, brand: 'Fragrance World' },
  { test: /^VULCAN /i, brand: 'French Avenue' },
  { test: /^ISLAND /i, brand: 'French Avenue' },
  { test: /^LIQUID BRUN/i, brand: 'French Avenue' },
  { test: /^SPECTRE /i, brand: 'Fragrance World' },
];

const FEMININE_HINTS = /(WOMAN|FEMME|POUR FEMME|FEM|FOR HER|HER|ROSE|PINK|LOVE|QUEEN|LADY|GIRL|VANILLA|CHERRY|CANDY|BLUSH|BLOSSOM|BELLA|ROMANCE|AQUA KISS|LOVE SPELL|PURE SEDUCTION|VELVET PETALS|MIDNIGHT BLOOM|YARA|MAYAR|ECLAIRE|HAYA|SAKEENA|SABAH AL WARD|FATIMA)/i;
const MASC_HINTS = /(POUR HOMME|HOMME|MAN|MASC|FOR HIM|HIM|ELIXIR|INTENSE|SILLAGE|LEGACY|VICTORIOSO|ASAD|HAWAS|9PM|TRES NUIT|IMMORTAL|KHANJAR|TYRANT|AQUA DUBAI)/i;

export function inferBrand(product: Product): string {
  if (product.brandCategory?.trim()) return product.brandCategory.trim();
  if (product.id >= 300) return "Victoria's Secret";
  if (product.id >= 200 && product.id < 300) return 'Karsell';
  const name = product.name.trim();
  for (const rule of BRAND_RULES) {
    if (rule.test.test(name)) return rule.brand;
  }
  return 'General';
}

export function inferCategory(product: Product): string {
  if (product.category?.trim()) return product.category.trim();
  if (product.id >= 200 && product.id < 300) return 'Cuidado Capilar';
  if (product.id >= 300) {
    const lower = product.name.toLowerCase();
    if (lower.includes('loción') || lower.includes('locion')) return 'Loción Corporal';
    return 'Body Mist';
  }
  return 'Perfume';
}

export function inferGender(product: Product): Segment {
  if (product.genderCategory === 'Masculino' || product.genderCategory === 'Femenino' || product.genderCategory === 'Unisex') {
    return product.genderCategory;
  }
  const brand = inferBrand(product);
  const category = inferCategory(product);
  const name = product.name.trim();

  if (brand === 'Karsell' || brand === "Victoria's Secret" || category === 'Body Mist' || category === 'Loción Corporal') return 'Femenino';
  if (FEMININE_HINTS.test(name) && !MASC_HINTS.test(name)) return 'Femenino';
  if (MASC_HINTS.test(name) && !FEMININE_HINTS.test(name)) return 'Masculino';
  return 'Unisex';
}

export function inferTopLevelCollection(product: Product): 'perfumes' | 'karsell' | 'victoria-secret' {
  const brand = inferBrand(product);
  if (brand === 'Karsell' || product.id >= 200 && product.id < 300) return 'karsell';
  if (brand === "Victoria's Secret" || product.id >= 300) return 'victoria-secret';
  return 'perfumes';
}

export function inferBadge(product: Product): string | undefined {
  if (product.badgeText?.trim()) return product.badgeText.trim();
  if (product.stock === 0) return 'Sin stock';
  if (product.stock > 0 && product.stock <= 3) return 'Últimas unidades';
  return undefined;
}

export function productMatchesQuery(product: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    product.name,
    product.description ?? '',
    inferBrand(product),
    inferCategory(product),
    inferGender(product),
  ].join(' ').toLowerCase();
  return haystack.includes(q);
}

export function getRelatedProducts(product: Product, products: Product[], limit = 4): Product[] {
  const sameCollection = inferTopLevelCollection(product);
  const brand = inferBrand(product);
  const category = inferCategory(product);
  const gender = inferGender(product);
  const preferredIds = Array.isArray(product.relatedIds) ? product.relatedIds : [];

  const byId = new Map(products.map((item) => [item.id, item]));
  const preferred = preferredIds.map((id) => byId.get(id)).filter((item): item is Product => Boolean(item) && item!.id !== product.id);

  const scored = products
    .filter((item) => item.id !== product.id && inferTopLevelCollection(item) === sameCollection)
    .map((item) => {
      let score = 0;
      if (inferBrand(item) === brand) score += 5;
      if (inferCategory(item) === category) score += 4;
      if (inferGender(item) === gender) score += 3;
      const priceGap = Math.abs((item.price || 0) - (product.price || 0));
      if (priceGap <= 15000) score += 2;
      else if (priceGap <= 30000) score += 1;
      if (item.stock > 0) score += 0.5;
      return { item, score };
    })
    .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
    .map(({ item }) => item);

  return [...new Map([...preferred, ...scored].map((item) => [item.id, item])).values()].slice(0, limit);
}
