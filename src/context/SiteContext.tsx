import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Product } from '@/types';
import { defaultSlides, type SlideData } from '@/sections/HeroBanner';
import {
  arabicPerfumes,
  karsellProducts,
  vsBodySplashNoShimmer,
  vsBodySplashShimmer,
} from '@/data/products';

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

export const defaultNavItems: NavItem[] = [
  { id: 1, label: 'CATEGORÍAS', href: '#productos', hasDropdown: true, content: '<p>Podés editar este contenido desde el panel.</p>' },
  { id: 2, label: 'INICIO', href: '#' },
  { id: 3, label: 'PRODUCTOS', href: '#productos' },
  { id: 4, label: 'CONTACTO', href: '#contacto' },
  { id: 5, label: 'QUIÉNES SOMOS', href: '#quienes-somos' },
  { id: 6, label: 'PREGUNTAS FRECUENTES', href: '#faq' },
  { id: 7, label: '¿CÓMO COMPRAR?', href: '#como-comprar' },
];

export const defaultPromoCards: PromoCard[] = [
  { id: 1, title: 'PROMO ESPECIAL', subtitle: '4 perfumes de 60ml a elección', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop', agotado: true },
  { id: 2, title: 'PROMO 3x2', subtitle: '3 perfumes de 60 ml', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop', agotado: true },
  { id: 3, title: 'PROMO DUO', subtitle: '2 perfumes 60 ml', image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=400&fit=crop', agotado: true },
  { id: 4, title: 'PROMO FAMILIAR', subtitle: '6 perfumes de 60 ml', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop', agotado: true },
];

export const defaultCategoryCards: CategoryCard[] = [
  { id: 'perfumes', label: 'Perfumes Árabes', badge: 'Destacado', description: 'Fragancias de alta duración', color: 'amber' },
  { id: 'karsell', label: 'Productos Karsell', badge: 'Cuidado Capilar', description: 'Tratamientos y cuidado', color: 'purple' },
  { id: 'victoria-secret', label: 'Body Splash VS', badge: 'Fragancias', description: 'Body splash y shimmer', color: 'pink' },
];

export const defaultSeo: SeoSettings = {
  title: 'Perfumes CS | Fragancias y cuidado personal',
  description: 'Tienda online de perfumes, body splash y productos de cuidado personal.',
  previewTitle: 'Perfumes CS',
  previewDescription: 'Fragancias exclusivas con envío a todo el país.',
  previewImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&h=630&fit=crop',
};

export const defaultLogo: LogoSettings = {
  textTop: 'CS',
  textBottom: 'PERFUMES',
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  shape: 'circle',
};

export const defaultSocials: SocialSettings = {
  instagram: '#',
  facebook: '#',
  whatsapp: '542975003159',
};

export const defaultFooter: FooterSettings = {
  shippingBadge: 'CORREO ARGENTINO',
  consumerText: 'Defensa de las y los consumidores. Para reclamos ingresá acá.',
  consumerLink: 'https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario',
  regretText: 'Botón de arrepentimiento',
  regretLink: '#',
  copyright: 'Copyright CSPERFUMES - 2026. Todos los derechos reservados.',
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop';
const VALID_CATEGORY_IDS = ['perfumes', 'karsell', 'victoria-secret'] as const;
const VALID_COLORS: CategoryCard['color'][] = ['amber', 'purple', 'pink', 'blue', 'green'];

function getDefaultProducts(): Product[] {
  return [...arabicPerfumes, ...karsellProducts, ...vsBodySplashNoShimmer, ...vsBodySplashShimmer].map((product) => ({
    ...product,
    description: product.description ?? '',
  }));
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

function asObject(raw: unknown): Record<string, unknown> {
  return raw && typeof raw === 'object' ? raw as Record<string, unknown> : {};
}

function asNonEmptyString(value: unknown, fallback: string): string {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : fallback;
  }
  return fallback;
}

function asOptionalString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function asSafeNumber(value: unknown, fallback: number, min?: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  if (typeof min === 'number' && parsed < min) return min;
  return parsed;
}

function dedupeNumericId(id: number, used: Set<number>): number {
  let next = id;
  while (used.has(next) || next <= 0) next += 1;
  used.add(next);
  return next;
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
  const price = asSafeNumber(source.price, 0, 0);
  const installments = Math.max(1, asSafeNumber(source.installments, 3, 1));
  return {
    id: asSafeNumber(source.id, fallbackId, 1),
    name: asNonEmptyString(source.name, `Producto ${fallbackId}`),
    price,
    transferPrice: asSafeNumber(source.transferPrice, price, 0),
    image: asNonEmptyString(source.image, FALLBACK_IMAGE),
    stock: asSafeNumber(source.stock, 0, 0),
    installments,
    installmentPrice: asSafeNumber(source.installmentPrice, Math.round(price / installments), 0),
    description: typeof source.description === 'string' ? source.description : '',
  };
}

function sanitizeProducts(raw: unknown, defaults: Product[]): Product[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaults;
  const usedIds = new Set<number>();
  const sanitized = raw.map((item, index) => {
    const product = sanitizeProduct(item, index + 1);
    return { ...product, id: dedupeNumericId(product.id, usedIds) };
  });
  return sanitized.length > 0 ? sanitized : defaults;
}

function sanitizeSlides(raw: unknown): SlideData[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultSlides;
  const usedIds = new Set<number>();
  const slides = raw.map((item, index) => {
    const source = asObject(item);
    const id = dedupeNumericId(asSafeNumber(source.id, index + 1, 1), usedIds);
    return {
      id,
      title: asNonEmptyString(source.title, `Slide ${index + 1}`),
      subtitle: typeof source.subtitle === 'string' ? source.subtitle : '',
      features: Array.isArray(source.features) ? source.features.map((feature) => String(feature)).filter(Boolean) : [],
      image: asNonEmptyString(source.image, defaultSlides[index % defaultSlides.length]?.image ?? FALLBACK_IMAGE),
    };
  });
  return slides.length > 0 ? slides : defaultSlides;
}

function sanitizeNavItems(raw: unknown): NavItem[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultNavItems;
  const usedIds = new Set<number>();
  const navItems = raw.map((item, index) => {
    const source = asObject(item);
    return {
      id: dedupeNumericId(asSafeNumber(source.id, index + 1, 1), usedIds),
      label: asNonEmptyString(source.label, `Item ${index + 1}`),
      href: asNonEmptyString(source.href, '#'),
      hasDropdown: Boolean(source.hasDropdown),
      content: asOptionalString(source.content),
    };
  });
  return navItems.length > 0 ? navItems : defaultNavItems;
}

function sanitizePromoCards(raw: unknown): PromoCard[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultPromoCards;
  const usedIds = new Set<number>();
  const promoCards = raw.map((item, index) => {
    const source = asObject(item);
    return {
      id: dedupeNumericId(asSafeNumber(source.id, index + 1, 1), usedIds),
      title: asNonEmptyString(source.title, `Promo ${index + 1}`),
      subtitle: typeof source.subtitle === 'string' ? source.subtitle : '',
      image: asNonEmptyString(source.image, defaultPromoCards[index % defaultPromoCards.length]?.image ?? FALLBACK_IMAGE),
      agotado: Boolean(source.agotado),
    };
  });
  return promoCards.length > 0 ? promoCards : defaultPromoCards;
}

function sanitizeCategoryCards(raw: unknown): CategoryCard[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultCategoryCards;
  const byId = new Map<string, CategoryCard>();

  for (const item of raw) {
    const source = asObject(item);
    const id = VALID_CATEGORY_IDS.includes(source.id as typeof VALID_CATEGORY_IDS[number])
      ? String(source.id)
      : undefined;
    if (!id || byId.has(id)) continue;
    byId.set(id, {
      id,
      label: asNonEmptyString(source.label, defaultCategoryCards.find((card) => card.id === id)?.label ?? id),
      badge: typeof source.badge === 'string' ? source.badge : '',
      description: typeof source.description === 'string' ? source.description : '',
      color: VALID_COLORS.includes(source.color as CategoryCard['color']) ? source.color as CategoryCard['color'] : 'amber',
    });
  }

  return VALID_CATEGORY_IDS.map((id) => byId.get(id) ?? defaultCategoryCards.find((card) => card.id === id)!).filter(Boolean);
}

function sanitizeTextBlock<T extends Record<string, string>>(defaults: T, raw: unknown): T {
  const source = asObject(raw);
  const result = { ...defaults };
  for (const key of Object.keys(defaults) as Array<keyof T>) {
    result[key] = asNonEmptyString(source[key as string], defaults[key]);
  }
  return result;
}

function sanitizeLogo(raw: unknown): LogoSettings {
  const source = asObject(raw);
  return {
    textTop: asNonEmptyString(source.textTop, defaultLogo.textTop),
    textBottom: asNonEmptyString(source.textBottom, defaultLogo.textBottom),
    fontFamily: asNonEmptyString(source.fontFamily, defaultLogo.fontFamily),
    shape: source.shape === 'rounded' ? 'rounded' : 'circle',
  };
}

function sanitizeContentBlock(raw: unknown, defaults: SiteConfig): Omit<SiteConfig, 'products'> {
  const source = asObject(raw);
  return {
    slides: sanitizeSlides(source.slides),
    navItems: sanitizeNavItems(source.navItems),
    promoCards: sanitizePromoCards(source.promoCards),
    categoryCards: sanitizeCategoryCards(source.categoryCards),
    seo: sanitizeTextBlock(defaults.seo, source.seo),
    logo: sanitizeLogo(source.logo),
    socials: sanitizeTextBlock(defaults.socials, source.socials),
    footer: sanitizeTextBlock(defaults.footer, source.footer),
  };
}

function sanitizeConfig(raw?: Partial<SiteConfig> | null): SiteConfig {
  const defaults = getDefaultConfig();
  return {
    products: sanitizeProducts(raw?.products, defaults.products),
    ...sanitizeContentBlock(raw, defaults),
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
    let content = sanitizeContentBlock(defaults, defaults);

    try {
      const productsResponse = await fetch('/data/products.json', { cache: 'no-store' });
      if (productsResponse.ok) {
        const productsText = await productsResponse.text();
        const productsRaw = safeParseJson(productsText);
        products = sanitizeProducts(productsRaw, defaults.products);
      }
    } catch {
      products = defaults.products;
    }

    try {
      const contentResponse = await fetch('/data/site-content.json', { cache: 'no-store' });
      if (contentResponse.ok) {
        const contentText = await contentResponse.text();
        const contentRaw = safeParseJson(contentText);
        content = sanitizeContentBlock(contentRaw, defaults);
      }
    } catch {
      content = sanitizeContentBlock(defaults, defaults);
    }

    const next = sanitizeConfig({ products, ...content });
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
