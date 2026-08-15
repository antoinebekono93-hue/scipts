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

export async function getServerSideProps({ res }) {
  let items = ''

  try {
    const { data } = await nhost.graphql.request(
      `query FeedProducts {
        products(order_by: { created_at: desc }, limit: 50) {
          title
          slug
          description
          created_at
          metadata
          price
        }
      }`,
      {},
      { headers: ADMIN_HEADERS }
    )

    items = (data?.products || [])
      .map(
        p => `    <item>
      <title>${escaped(p.title)}</title>
      <link>${SITE_URL}/item/${escaped(p.slug)}</link>
      <guid isPermaLink="false">${escaped(p.slug)}</guid>
      <pubDate>${new Date(p.created_at).toUTCString()}</pubDate>
      <description>${escaped((p.description || p.metadata?.description || '').slice(0, 300))}</description>
    </item>`
      )
      .join('\n')
  } catch (err) {
    console.error('Feed generation error:', err)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Script Marketplace</title>
    <link>${SITE_URL}</link>
    <description>Derniers scripts PHP, plugins WordPress et applications premium ajoutés au catalogue.</description>
    <language>fr-fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=1800')
  res.write(xml)
  res.end()

  return { props: {} }
}

export default function Feed() {
  return null
}