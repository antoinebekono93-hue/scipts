import { SITE_URL } from '../lib/seo'

export async function getServerSideProps({ res }) {
  const robots = `# robots.txt — ${SITE_URL}
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /_next/
Disallow: /checkout

Sitemap: ${SITE_URL}/sitemap.xml
`

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  res.write(robots)
  res.end()

  return { props: {} }
}

export default function Robots() {
  return null
}