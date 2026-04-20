import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Product } from '@/types';
import { defaultSlides, type SlideData } from '@/sections/HeroBanner';
import { arabicPerfumes, karsellProducts, vsBodySplashNoShimmer, vsBodySplashShimmer } from '@/data/products';

export interface NavItem {
  id: number;
  label: string;
  href: string;
  hasDropdown?: boolean;
  content?: string;
}

export interface PromoCard {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  agotado: boolean;
}

export interface CategoryCard {
  id: string;
  label: string;
  badge: string;
  description?: string;
  color: 'amber' | 'purple' | 'pink' | 'blue' | 'green';
}

export interface SeoSettings {
  title: string;
  description: string;
  previewTitle: string;
  previewDescription: string;
  previewImage: string;
}

export interface LogoSettings {
  textTop: string;
  textBottom: string;
  fontFamily: string;
  shape: 'circle' | 'rounded';
}

export interface SocialSettings {
  instagram: string;
  facebook: string;
  whatsapp: string;
}

export interface FooterSettings {
  shippingBadge: string;
  consumerText: string;
  consumerLink: string;
  regretText: string;
  regretLink: string;
  copyright: string;
}

export interface SiteConfig {
  products: Product[];
  slides: SlideData[];
  navItems: NavItem[];
  promoCards: PromoCard[];
  categoryCards: CategoryCard[];
  seo: SeoSettings;
  logo: LogoSettings;
  socials: SocialSettings;
  footer: FooterSettings;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop';

export const defaultNavItems: NavItem[] = [
  { id: 1, label: 'CATEGORÍAS', href: '#productos', hasDropdown: true, content: 'Importados, Árabes, Karsell, Victoria Secret' },
  { id: 2, label: 'INICIO', href: '#' },
  { id: 3, label: 'PRODUCTOS', href: '#productos' },
  { id: 4, label: 'CONTACTO', href: '#footer' },
];

export const defaultPromoCards: PromoCard[] = [
  { id: 1, title: 'Perfumes Árabes', subtitle: 'Fragancias con carácter y gran duración', image: FALLBACK_IMAGE, agotado: false },
  { id: 2, title: 'Victoria Secret', subtitle: 'Mists y lociones para todos los días', image: FALLBACK_IMAGE, agotado: false },
  { id: 3, title: 'Karsell', subtitle: 'Cuidado capilar premium', image: FALLBACK_IMAGE, agotado: false },
];

export const defaultCategoryCards: CategoryCard[] = [
  { id: 'perfumes', label: 'Perfumes', badge: 'Principal', description: 'Fragancias masculinas, femeninas y unisex', color: 'amber' },
  { id: 'body-mist', label: 'Body Mist', badge: 'Body Care', description: 'Splash y brumas corporales', color: 'pink' },
  { id: 'locion-corporal', label: 'Lociones', badge: 'Body Care', description: 'Lociones corporales y shimmer', color: 'purple' },
  { id: 'cuidado-capilar', label: 'Capilar', badge: 'Karsell', description: 'Shampoo, crema y óleo', color: 'blue' },
];

export const defaultSeo: SeoSettings = {
  title: 'Perfumes CS',
  description: 'Perfumes árabes, body mist y cuidado capilar.',
  previewTitle: 'Perfumes CS',
  previewDescription: 'Fragancias y cuidado personal en un solo lugar.',
  previewImage: FALLBACK_IMAGE,
};

export const defaultLogo: LogoSettings = {
  textTop: 'Perfumes',
  textBottom: 'CS',
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  shape: 'circle',
};

export const defaultSocials: SocialSettings = {
  instagram: '',
  facebook: '',
  whatsapp: '',
};

export const defaultFooter: FooterSettings = {
  shippingBadge: 'Envíos a todo el país',
  consumerText: 'Defensa del consumidor',
  consumerLink: '#',
  regretText: 'Botón de arrepentimiento',
  regretLink: '#',
  copyright: 'Perfumes CS ©',
};

function normalizeCategory(raw: string | undefined, name: string): string {
  const value = (raw ?? '').trim().toLowerCase();
  const lowerName = name.toLowerCase();

  if (value) {
    if (value.includes('body mist') || value.includes('mist')) return 'Body Mist';
    if (value.includes('loción') || value.includes('locion')) return 'Loción Corporal';
    if (value.includes('capilar') || value.includes('shampoo') || value.includes('óleo') || value.includes('oleo')) return 'Cuidado Capilar';
    if (value.includes('perfume')) return 'Perfume';
  }

  if (lowerName.includes('victoria') && (lowerName.includes('mist') || lowerName.includes('splash'))) return 'Body Mist';
  if (lowerName.includes('victoria') && (lowerName.includes('locion') || lowerName.includes('loción'))) return 'Loción Corporal';
  if (lowerName.includes('karsell') || lowerName.includes('shampoo') || lowerName.includes('óleo') || lowerName.includes('oleo')) return 'Cuidado Capilar';

  return 'Perfume';
}

function normalizeBrand(raw: string | undefined, name: string): string {
  const value = (raw ?? '').trim();
  if (value) return value;
  if (name.toLowerCase().includes('victoria')) return "Victoria's Secret";
  if (name.toLowerCase().includes('karsell')) return 'Karsell';
  return 'General';
}

function normalizeGender(raw: string | undefined): Product['genderCategory'] {
  if (!raw) return 'Unisex';
  const value = raw.toLowerCase();
  if (value.includes('mas')) return 'Masculino';
  if (value.includes('fem')) return 'Femenino';
  return 'Unisex';
}

function normalizeTags(product: Product): string[] {
  const tags = new Set<string>();
  if (product.brandCategory) tags.add(product.brandCategory);
  if (product.category) tags.add(product.category);
  if (product.genderCategory) tags.add(product.genderCategory);
  return Array.from(tags);
}

function asObject(raw: unknown): Record<string, unknown> {
  return raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
}

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function asNumber(value: unknown, fallback: number, min = 0): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, parsed);
}

function safeParseJson(text: string): unknown | null {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function sanitizeProduct(raw: unknown, fallbackId: number): Product {
  const source = asObject(raw);
  const price = asNumber(source.price, 0);
  const installments = Math.max(1, asNumber(source.installments, 3, 1));
  const image = asString(source.image, FALLBACK_IMAGE);
  const extraImages = Array.isArray(source.images)
    ? source.images.map((item) => String(item).trim()).filter(Boolean)
    : [];

  const product: Product = {
    id: asNumber(source.id, fallbackId, 1),
    name: asString(source.name, `Producto ${fallbackId}`),
    price,
    transferPrice: asNumber(source.transferPrice, price),
    image,
    stock: asNumber(source.stock, 0),
    installments,
    installmentPrice: asNumber(source.installmentPrice, Math.round(price / installments)),
    description: asString(source.description, ''),
    images: Array.from(new Set([image, ...extraImages])),
    category: normalizeCategory(asString(source.category, ''), asString(source.name, `Producto ${fallbackId}`)),
    brandCategory: normalizeBrand(asString(source.brandCategory, ''), asString(source.name, `Producto ${fallbackId}`)),
    genderCategory: normalizeGender(asString(source.genderCategory, 'Unisex')),
    relatedIds: Array.isArray(source.relatedIds)
      ? source.relatedIds.map((item) => Number(item)).filter((item) => Number.isFinite(item))
      : [],
    badgeText: asString(source.badgeText, ''),
    featured: Boolean(source.featured),
    seoTitle: asString(source.seoTitle, ''),
    seoDescription: asString(source.seoDescription, ''),
  };

  product.tags = Array.isArray(source.tags) && source.tags.length
    ? source.tags.map((tag) => String(tag)).filter(Boolean)
    : normalizeTags(product);

  return product;
}

function sanitizeProducts(raw: unknown, defaults: Product[]): Product[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaults.map((item, index) => sanitizeProduct(item, index + 1));
  return raw.map((item, index) => sanitizeProduct(item, index + 1));
}

function sanitizeSlides(raw: unknown): SlideData[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultSlides;
  return raw.map((item, index) => {
    const source = asObject(item);
    return {
      id: asNumber(source.id, index + 1, 1),
      title: asString(source.title, `Slide ${index + 1}`),
      subtitle: asString(source.subtitle, ''),
      features: Array.isArray(source.features) ? source.features.map((feature) => String(feature)) : [],
      image: asString(source.image, defaultSlides[index % defaultSlides.length]?.image ?? FALLBACK_IMAGE),
    };
  });
}

function sanitizeNavItems(raw: unknown): NavItem[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultNavItems;
  return raw.map((item, index) => {
    const source = asObject(item);
    return {
      id: asNumber(source.id, index + 1, 1),
      label: asString(source.label, `Item ${index + 1}`),
      href: asString(source.href, '#'),
      hasDropdown: Boolean(source.hasDropdown),
      content: asString(source.content, ''),
    };
  });
}

function sanitizePromoCards(raw: unknown): PromoCard[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultPromoCards;
  return raw.map((item, index) => {
    const source = asObject(item);
    return {
      id: asNumber(source.id, index + 1, 1),
      title: asString(source.title, `Promo ${index + 1}`),
      subtitle: asString(source.subtitle, ''),
      image: asString(source.image, FALLBACK_IMAGE),
      agotado: Boolean(source.agotado),
    };
  });
}

function sanitizeCategoryCards(raw: unknown): CategoryCard[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultCategoryCards;
  return raw.map((item, index) => {
    const source = asObject(item);
    const colors = ['amber', 'purple', 'pink', 'blue', 'green'] as const;
    const color = colors.includes(source.color as CategoryCard['color']) ? (source.color as CategoryCard['color']) : 'amber';
    return {
      id: asString(source.id, `cat-${index + 1}`),
      label: asString(source.label, `Categoría ${index + 1}`),
      badge: asString(source.badge, ''),
      description: asString(source.description, ''),
      color,
    };
  });
}

function sanitizeTextBlock<T>(defaults: T, raw: unknown): T {
  const source = asObject(raw);
  const next = { ...(defaults as Record<string, string>) };
  for (const key of Object.keys(defaults as Record<string, string>)) {
    next[key] = asString(source[key], (defaults as Record<string, string>)[key]);
  }
  return next as T;
}

function sanitizeLogo(raw: unknown): LogoSettings {
  const source = asObject(raw);
  return {
    textTop: asString(source.textTop, defaultLogo.textTop),
    textBottom: asString(source.textBottom, defaultLogo.textBottom),
    fontFamily: asString(source.fontFamily, defaultLogo.fontFamily),
    shape: source.shape === 'rounded' ? 'rounded' : 'circle',
  };
}

function getDefaultProducts(): Product[] {
  return [...arabicPerfumes, ...karsellProducts, ...vsBodySplashNoShimmer, ...vsBodySplashShimmer].map((product, index) =>
    sanitizeProduct(product, index + 1),
  );
}

function getDefaultConfig(): SiteConfig {
  return {
    products: getDefaultProducts(),
    slides: defaultSlides,
    navItems: defaultNavItems,
    promoCards: defaultPromoCards,
    categoryCards: defaultCategoryCards,
    seo: defaultSeo,
    logo: defaultLogo,
    socials: defaultSocials,
    footer: defaultFooter,
  };
}

function sanitizeConfig(raw?: Partial<SiteConfig> | null): SiteConfig {
  const defaults = getDefaultConfig();
  const source = asObject(raw);
  return {
    products: sanitizeProducts(source.products, defaults.products),
    slides: sanitizeSlides(source.slides),
    navItems: sanitizeNavItems(source.navItems),
    promoCards: sanitizePromoCards(source.promoCards),
    categoryCards: sanitizeCategoryCards(source.categoryCards),
    seo: sanitizeTextBlock(defaultSeo, source.seo),
    logo: sanitizeLogo(source.logo),
    socials: sanitizeTextBlock(defaultSocials, source.socials),
    footer: sanitizeTextBlock(defaultFooter, source.footer),
  };
}

interface SiteCtx extends SiteConfig {
  setAllProducts: (products: Product[]) => void;
  setSlides: (slides: SlideData[]) => void;
  setNavItems: (navItems: NavItem[]) => void;
  setPromoCards: (promos: PromoCard[]) => void;
  setCategoryCards: (cards: CategoryCard[]) => void;
  setSeo: (seo: SeoSettings) => void;
  setLogo: (logo: LogoSettings) => void;
  setSocials: (socials: SocialSettings) => void;
  setFooter: (footer: FooterSettings) => void;
  resetSiteConfig: () => void;
  reloadSiteConfigFromJson: () => Promise<void>;
}

const Ctx = createContext<SiteCtx | null>(null);

function applySeo(seo: SeoSettings) {
  document.title = seo.title;
  const ensureMeta = (selector: string, attr: 'name' | 'property', value: string) => {
    let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, value);
      document.head.appendChild(tag);
    }
    return tag;
  };

  ensureMeta('meta[name="description"]', 'name', 'description').setAttribute('content', seo.description);
  ensureMeta('meta[property="og:title"]', 'property', 'og:title').setAttribute('content', seo.previewTitle || seo.title);
  ensureMeta('meta[property="og:description"]', 'property', 'og:description').setAttribute('content', seo.previewDescription || seo.description);
  ensureMeta('meta[property="og:image"]', 'property', 'og:image').setAttribute('content', seo.previewImage);
  ensureMeta('meta[property="og:type"]', 'property', 'og:type').setAttribute('content', 'website');
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(() => getDefaultConfig());
  const [publishedConfig, setPublishedConfig] = useState<SiteConfig>(() => getDefaultConfig());

  const loadJsonConfig = async () => {
    const defaults = getDefaultConfig();
    let products = defaults.products;
    let content: Partial<SiteConfig> = defaults;

    try {
      const response = await fetch('/data/products.json', { cache: 'no-store' });
      if (response.ok) {
        products = sanitizeProducts(safeParseJson(await response.text()), defaults.products);
      }
    } catch {
      products = defaults.products;
    }

    try {
      const response = await fetch('/data/site-content.json', { cache: 'no-store' });
      if (response.ok) {
        content = asObject(safeParseJson(await response.text())) as Partial<SiteConfig>;
      }
    } catch {
      content = defaults;
    }

    const next = sanitizeConfig({ ...content, products });
    setConfig(next);
    setPublishedConfig(next);
  };

  useEffect(() => {
    void loadJsonConfig();
  }, []);

  useEffect(() => {
    applySeo(config.seo);
  }, [config.seo]);

  const api = useMemo<SiteCtx>(() => ({
    ...config,
    setAllProducts: (products) => setConfig((prev) => ({ ...prev, products: sanitizeProducts(products, prev.products) })),
    setSlides: (slides) => setConfig((prev) => ({ ...prev, slides: sanitizeSlides(slides) })),
    setNavItems: (navItems) => setConfig((prev) => ({ ...prev, navItems: sanitizeNavItems(navItems) })),
    setPromoCards: (promoCards) => setConfig((prev) => ({ ...prev, promoCards: sanitizePromoCards(promoCards) })),
    setCategoryCards: (categoryCards) => setConfig((prev) => ({ ...prev, categoryCards: sanitizeCategoryCards(categoryCards) })),
    setSeo: (seo) => setConfig((prev) => ({ ...prev, seo: sanitizeTextBlock(defaultSeo, seo) })),
    setLogo: (logo) => setConfig((prev) => ({ ...prev, logo: sanitizeLogo(logo) })),
    setSocials: (socials) => setConfig((prev) => ({ ...prev, socials: sanitizeTextBlock(defaultSocials, socials) })),
    setFooter: (footer) => setConfig((prev) => ({ ...prev, footer: sanitizeTextBlock(defaultFooter, footer) })),
    resetSiteConfig: () => setConfig(publishedConfig),
    reloadSiteConfigFromJson: loadJsonConfig,
  }), [config, publishedConfig]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useSite() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSite outside SiteProvider');
  return ctx;
}
