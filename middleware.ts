import { productOgData } from './src/generated/product-og-data';

function isPreviewBot(userAgent: string) {
  const ua = userAgent.toLowerCase();
  return [
    'whatsapp',
    'facebookexternalhit',
    'meta-externalagent',
    'meta-externalfetcher',
    'twitterbot',
    'linkedinbot',
    'slackbot',
    'discordbot',
    'telegrambot',
    'skypeuripreview',
  ].some((token) => ua.includes(token));
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function absoluteUrl(requestUrl: URL, value: string) {
  if (!value) return requestUrl.origin;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return new URL(value, requestUrl.origin).toString();
}

export const config = {
  matcher: '/productos/:path*',
};

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') ?? '';

  if (!isPreviewBot(userAgent)) {
    return;
  }

  const slug = url.pathname.replace(/^\/productos\//, '').replace(/\/$/, '');
  const product = productOgData[slug];

  if (!product) {
    return;
  }

  const pageUrl = url.toString();
  const imageUrl = absoluteUrl(url, product.image);
  const formattedPrice = product.price > 0 ? `$${new Intl.NumberFormat('es-AR').format(product.price)}` : '';
  const title = `Perfumes CS · ${product.name}`;
  const description = [formattedPrice, product.category, product.description || 'Envíos a todo el país']
    .filter(Boolean)
    .join(' • ');

  const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(title)}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="product" />
    <meta property="og:site_name" content="Perfumes CS" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:url" content="${escapeHtml(pageUrl)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
  </head>
  <body>
    <p>${escapeHtml(product.name)}</p>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
