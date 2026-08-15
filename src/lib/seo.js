export const SITE_URL = 'https://scipts.vercel.app'
export const SITE_NAME = 'Script Marketplace'
export const DEFAULT_DESCRIPTION =
  'Téléchargez des scripts PHP, plugins WordPress, modules WHMCS et applications web premium. Des milliers de produits avec un abonnement simple : 10$/3 mois ou 16$/an.'

export function canonicalPath(path) {
  if (!path) return SITE_URL
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${clean}`
}

export function truncate(text, max = 155) {
  if (!text) return ''
  const clean = String(text).replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, max - 1).trimEnd()}…`
}

export function productImageUrl(product) {
  const url = product?.metadata?.image?.imgix_url
  if (!url) return `${SITE_URL}/logo.png`
  if (url.startsWith('http')) return url
  return `${SITE_URL}${url}`
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [],
  }
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'fr-FR',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function buildProductJsonLd(product) {
  const meta = product?.metadata || {}
  const available = product?.count > 0
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product?.title,
    description: truncate(meta.description, 300) || undefined,
    image: productImageUrl(product),
    url: canonicalPath(`/item/${product?.slug}`),
    sku: product?.slug,
    offers: {
      '@type': 'Offer',
      url: canonicalPath(`/item/${product?.slug}`),
      price: Number(product?.price) || 0,
      priceCurrency: 'USD',
      availability: available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  }
}

export function buildItemListJsonLd(products, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    url: canonicalPath(url),
    numberOfItems: Array.isArray(products) ? products.length : 0,
    itemListElement: (Array.isArray(products) ? products : [])
      .filter(p => p)
      .map((p, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: p?.title,
        url: canonicalPath(`/item/${p?.slug}`),
        image: productImageUrl(p),
      })),
  }
}

export function buildBreadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: (items || []).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalPath(item.path),
    })),
  }
}

export function buildCategoryJsonLd(category, products, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category?.title,
    url: canonicalPath(url),
    inLanguage: 'fr-FR',
    mainEntity: buildItemListJsonLd(products, url),
  }
}
