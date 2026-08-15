import { NhostClient } from '@nhost/nhost-js'
import { SITE_URL } from '../lib/seo'

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'dspprxgtnymanbtxneyo',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || 'us-east-1',
  adminSecret: process.env.NHOST_ADMIN_SECRET
})

const ADMIN_HEADERS = {
  'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET || ''
}

const escaped = value =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function urlElement(loc, lastmod) {
  const lastmodDate = lastmod
    ? `<lastmod>${String(lastmod).slice(0, 10)}</lastmod>`
    : ''
  return `<url><loc>${escaped(loc)}</loc>${lastmodDate}<changefreq>weekly</changefreq></url>`
}

export async function getServerSideProps({ res }) {
  const staticPages = [
    { path: '/', changefreq: 'daily' },
    { path: '/search', changefreq: 'daily' },
    { path: '/subscription', changefreq: 'monthly' },
    { path: '/about', changefreq: 'monthly' },
    { path: '/upload-details', changefreq: 'monthly' },
  ]

  let categoryUrls = []
  let productUrls = []

  try {
    const [categoriesResult, productsResult] = await Promise.all([
      nhost.graphql.request(
        `query { categories { slug created_at } }`,
        {},
        { headers: ADMIN_HEADERS }
      ),
      nhost.graphql.request(
        `query SitemapProducts {
          products(order_by: { created_at: desc }, limit: 1000) {
            slug
            created_at
          }
        }`,
        {},
        { headers: ADMIN_HEADERS }
      ),
    ])
    if (categoriesResult?.error) {
      console.error('Sitemap categories error:', JSON.stringify(categoriesResult.error).slice(0, 500))
    }
    if (productsResult?.error) {
      console.error('Sitemap products error:', JSON.stringify(productsResult.error).slice(0, 500))
    }
    const categoriesData = categoriesResult?.data
    const productsData = productsResult?.data

    categoryUrls = (categoriesData?.categories || []).map(c =>
      urlElement(`${SITE_URL}/search?category=${c.slug}`, c.created_at)
    )

    productUrls = (productsData?.products || []).map(p =>
      urlElement(`${SITE_URL}/item/${p.slug}`, p.created_at)
    )
  } catch (err) {
    console.error('Sitemap generation error:', err)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => urlElement(`${SITE_URL}${p.path}`)).join('\n')}
${categoryUrls.join('\n')}
${productUrls.join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  res.write(xml)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}