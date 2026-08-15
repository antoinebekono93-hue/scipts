import { Html, Head, Main, NextScript } from 'next/document'
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from '../lib/seo'

const jsonLd = [buildOrganizationJsonLd(), buildWebSiteJsonLd()]
  .map(item => JSON.stringify(item))
  .join('')

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
