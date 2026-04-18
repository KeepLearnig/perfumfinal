import { productOgData } from '../src/generated/product-og-data';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function formatPrice(price?: number) {
  if (!Number.isFinite(price)) return '';
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price as number);
}

export default function handler(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug') ?? '';
  const product = productOgData[slug];

  if (!product) {
    return new Response('Not found', { status: 404 });
  }

  const price = formatPrice(product.price);
  const title = escapeXml(product.name);
  const desc = escapeXml(product.shortDescription || 'Fragancias premium y envíos a todo el país');
  const image = escapeXml(product.image);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0f0f10"/>
      <stop offset="0.55" stop-color="#19191b"/>
      <stop offset="1" stop-color="#26262a"/>
    </linearGradient>
    <linearGradient id="card" x1="0" y1="0" x2="0" y2="546" gradientUnits="userSpaceOnUse">
      <stop stop-color="rgba(255,255,255,0.08)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0.02)"/>
    </linearGradient>
    <filter id="shadow" x="0" y="0" width="1200" height="630">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="1200" height="630" rx="0" fill="url(#bg)"/>
  <rect x="20" y="20" width="1160" height="590" rx="28" stroke="rgba(255,255,255,0.10)"/>

  <g filter="url(#shadow)">
    <rect x="42" y="42" width="450" height="546" rx="26" fill="rgba(255,255,255,0.04)"/>
    <image href="${image}" x="72" y="72" width="390" height="486" preserveAspectRatio="xMidYMid meet"/>
  </g>

  <text x="560" y="130" fill="#F5F5F5" font-family="Arial, Helvetica, sans-serif" font-size="28" letter-spacing="4">PERFUMES CS</text>
  <rect x="560" y="152" width="120" height="2" fill="rgba(255,255,255,0.55)"/>

  <foreignObject x="560" y="188" width="580" height="160">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,Helvetica,sans-serif;font-size:54px;font-weight:700;line-height:1.08;color:white;display:flex;align-items:flex-start;">
      ${title}
    </div>
  </foreignObject>

  <foreignObject x="560" y="350" width="540" height="92">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.35;color:rgba(255,255,255,0.76);display:flex;">
      ${desc}
    </div>
  </foreignObject>

  ${price ? `<g>
    <rect x="560" y="455" width="260" height="78" rx="18" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)"/>
    <text x="590" y="505" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700">${escapeXml(price)}</text>
  </g>` : ''}

  <text x="560" y="575" fill="rgba(255,255,255,0.84)" font-family="Arial, Helvetica, sans-serif" font-size="22">Fragancias premium</text>
  <text x="560" y="604" fill="rgba(255,255,255,0.84)" font-family="Arial, Helvetica, sans-serif" font-size="22">Envíos a todo el país</text>
</svg>`;

  return new Response(svg, {
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
