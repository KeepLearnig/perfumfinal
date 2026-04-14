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

function sanitizeProduct(raw: unknown, fallbackId: number): Product {
  const source = (raw && typeof raw === 'object') ? raw as Partial<Product> : {};
  const price = Number(source.price ?? 0);
  const installments = Number(source.installments ?? 3) || 3;
  return {
    id: Number(source.id ?? fallbackId) || fallbackId,
    name: String(source.name ?? 'Producto'),
    price,
    transferPrice: Number(source.transferPrice ?? price) || price,
    image: String(source.image ?? ''),
    stock: Math.max(0, Number(source.stock ?? 0) || 0),
    installments,
    installmentPrice: Number(source.installmentPrice ?? Math.round(price / installments)) || Math.round(price / installments),
    description: String(source.description ?? ''),
  };
}

function sanitizeSlides(raw: unknown): SlideData[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultSlides;
  return raw.map((item, index) => {
    const source = (item && typeof item === 'object') ? item as Partial<SlideData> : {};
    return {
      id: Number(source.id ?? index + 1) || index + 1,
      title: String(source.title ?? `Slide ${index + 1}`),
      subtitle: String(source.subtitle ?? ''),
      features: Array.isArray(source.features) ? source.features.map((feature) => String(feature)) : [],
      image: String(source.image ?? ''),
    };
  });
}

function sanitizeNavItems(raw: unknown): NavItem[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultNavItems;
  return raw.map((item, index) => {
    const source = (item && typeof item === 'object') ? item as Partial<NavItem> : {};
    return {
      id: Number(source.id ?? index + 1) || index + 1,
      label: String(source.label ?? `Item ${index + 1}`),
      href: String(source.href ?? '#'),
      hasDropdown: Boolean(source.hasDropdown),
      content: source.content ? String(source.content) : undefined,
    };
  });
}

function sanitizePromoCards(raw: unknown): PromoCard[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultPromoCards;
  return raw.map((item, index) => {
    const source = (item && typeof item === 'object') ? item as Partial<PromoCard> : {};
    return {
      id: Number(source.id ?? index + 1) || index + 1,
      title: String(source.title ?? `Promo ${index + 1}`),
      subtitle: String(source.subtitle ?? ''),
      image: String(source.image ?? ''),
      agotado: Boolean(source.agotado),
    };
  });
}

function sanitizeCategoryCards(raw: unknown): CategoryCard[] {
  const validColors: CategoryCard['color'][] = ['amber', 'purple', 'pink', 'blue', 'green'];
  if (!Array.isArray(raw) || raw.length === 0) return defaultCategoryCards;
  return raw.map((item, index) => {
    const source = (item && typeof item === 'object') ? item as Partial<CategoryCard> : {};
    const color = validColors.includes(source.color as CategoryCard['color']) ? source.color as CategoryCard['color'] : 'amber';
    return {
      id: String(source.id ?? `category-${index + 1}`),
      label: String(source.label ?? `Categoría ${index + 1}`),
      badge: String(source.badge ?? ''),
      description: String(source.description ?? ''),
      color,
    };
  });
}

function sanitizeTextBlock<T extends Record<string, string>>(defaults: T, raw: unknown): T {
  const source = (raw && typeof raw === 'object') ? raw as Record<string, unknown> : {};
  const result = { ...defaults };
  for (const key of Object.keys(defaults) as Array<keyof T>) {
    result[key] = String(source[key as string] ?? defaults[key]);
  }
  return result;
}

function sanitizeLogo(raw: unknown): LogoSettings {
  const source = (raw && typeof raw === 'object') ? raw as Partial<LogoSettings> : {};
  return {
    textTop: String(source.textTop ?? defaultLogo.textTop),
    textBottom: String(source.textBottom ?? defaultLogo.textBottom),
    fontFamily: String(source.fontFamily ?? defaultLogo.fontFamily),
    shape: source.shape === 'rounded' ? 'rounded' : 'circle',
  };
}

function sanitizeConfig(raw?: Partial<SiteConfig> | null): SiteConfig {
  const defaults = getDefaultConfig();
  return {
    products: Array.isArray(raw?.products) && raw.products.length > 0
      ? raw.products.map((product, index) => sanitizeProduct(product, index + 1))
      : defaults.products,
    slides: sanitizeSlides(raw?.slides),
    navItems: sanitizeNavItems(raw?.navItems),
    promoCards: sanitizePromoCards(raw?.promoCards),
    categoryCards: sanitizeCategoryCards(raw?.categoryCards),
    seo: sanitizeTextBlock(defaults.seo, raw?.seo),
    logo: sanitizeLogo(raw?.logo),
    socials: sanitizeTextBlock(defaults.socials, raw?.socials),
    footer: sanitizeTextBlock(defaults.footer, raw?.footer),
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

  useEffect(() => {
    let isMounted = true;

    const loadJsonConfig = async () => {
      try {
        const [productsResponse, contentResponse] = await Promise.all([
          fetch('/data/products.json', { cache: 'no-store' }),
          fetch('/data/site-content.json', { cache: 'no-store' }),
        ]);

        const defaults = getDefaultConfig();
        const next: Partial<SiteConfig> = {};

        if (productsResponse.ok) {
          const productsRaw = await productsResponse.json();
          if (Array.isArray(productsRaw)) next.products = productsRaw as Product[];
        }

        if (contentResponse.ok) {
          const contentRaw = await contentResponse.json();
          if (contentRaw && typeof contentRaw === 'object') {
            const content = contentRaw as Partial<SiteConfig>;
            next.slides = content.slides;
            next.navItems = content.navItems;
            next.promoCards = content.promoCards;
            next.categoryCards = content.categoryCards;
            next.seo = content.seo;
            next.logo = content.logo;
            next.socials = content.socials;
            next.footer = content.footer;
          }
        }

        if (isMounted) {
          setConfig(sanitizeConfig({ ...defaults, ...next }));
        }
      } catch {
        if (isMounted) {
          setConfig(getDefaultConfig());
        }
      }
    };

    void loadJsonConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    applySeo(config.seo);
  }, [config.seo]);

  const api = useMemo<SiteCtx>(() => ({
    ...config,
    setAllProducts: (products) => setConfig((prev) => ({ ...prev, products: products.map((product, index) => sanitizeProduct(product, index + 1)) })),
    setSlides: (slides) => setConfig((prev) => ({ ...prev, slides: sanitizeSlides(slides) })),
    setNavItems: (navItems) => setConfig((prev) => ({ ...prev, navItems: sanitizeNavItems(navItems) })),
    setPromoCards: (promoCards) => setConfig((prev) => ({ ...prev, promoCards: sanitizePromoCards(promoCards) })),
    setCategoryCards: (categoryCards) => setConfig((prev) => ({ ...prev, categoryCards: sanitizeCategoryCards(categoryCards) })),
    setSeo: (seo) => setConfig((prev) => ({ ...prev, seo: sanitizeTextBlock(defaultSeo, seo) })),
    setLogo: (logo) => setConfig((prev) => ({ ...prev, logo: sanitizeLogo(logo) })),
    setSocials: (socials) => setConfig((prev) => ({ ...prev, socials: sanitizeTextBlock(defaultSocials, socials) })),
    setFooter: (footer) => setConfig((prev) => ({ ...prev, footer: sanitizeTextBlock(defaultFooter, footer) })),
    resetSiteConfig: () => setConfig(getDefaultConfig()),
  }), [config]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useSite() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSite outside SiteProvider');
  return ctx;
}
