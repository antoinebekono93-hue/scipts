import { NhostClient } from '@nhost/nextjs'

export const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'dspprxgtnymanbtxneyo',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || 'us-east-1'
})

export async function getAllDataByType(dataType = 'categories') {
  if (dataType === 'landings') {
    return [
      {
        slug: 'marketing',
        metadata: {
          title: 'Téléchargez des scripts et applications premium',
          subtitle: 'LE MEILLEUR CATALOGUE DE SCRIPTS',
          description: "Des milliers de scripts PHP, templates HTML et plugins WordPress à votre disposition.",
          image: { imgix_url: '/images/content/hero.png' }
        }
      },
      {
        slug: 'introduction',
        metadata: {
          title: 'Découvrez nos nouveautés',
          subtitle: 'Une plateforme innovante',
          description: 'Abonnement dès 16$/3 mois ou 25$/an',
          image: { imgix_url: '/images/content/hero.png' }
        }
      },
      {
        slug: 'about',
        metadata: {
          title: 'À propos de Script Marketplace',
          subtitle: 'Des milliers de scripts et applications premium',
          description:
            'Script Marketplace est une plateforme de scripts PHP, templates HTML, plugins WordPress, modules WHMCS et applications web. Accédez à tout le catalogue avec un abonnement simple : 16$/3 mois ou 25$/an.',
          image: { imgix_url: '/images/content/figures.png' }
        }
      }
    ]
  }

  if (dataType === 'reviews') {
    return [
      {
        title: 'Review 1',
        metadata: { author: 'Alice', text: 'Incroyable marketplace !', image: '/images/content/avatar.png' }
      }
    ]
  }

  if (dataType === 'navigation') {
    // On force le menu mocké car la table Nhost est incomplète
    return [
      {
        id: 'mock-nav',
        metadata: {
          logo: { imgix_url: '/logo.png' },
          menu: [
            { title: 'Home', url: '/' },
            { title: 'WordPress', url: '/search?category=wordpress' },
            { title: 'WHMCS', url: '/search?category=whmcs' },
            { title: 'Scripts', url: '/search?category=scripts' },
            { title: 'Applications', url: '/search?category=applications' }
          ]
        }
      }
    ]
  }

  if (dataType === 'categories') {
    const { data, error } = await nhost.graphql.request(`
      query {
        categories {
          id
          title
          slug
          metadata
          created_at
        }
      }
    `)
    if (error) {
      console.error(error)
      return []
    }
    return data.categories
  }
  
  return []
}

function getPlaceholderImage(title) {
  const text = encodeURIComponent(title)
  return `https://ui-avatars.com/api/?name=${text}&background=3498db&color=fff&size=400&format=png`
}

function buildGallery(p) {
  const extra = Array.isArray(p.metadata?.gallery) ? p.metadata.gallery : []
  const gallery = [
    ...(p.image_id
      ? [{ id: p.image_id, url: nhost.storage.getPublicUrl({ fileId: p.image_id }) }]
      : []),
    ...extra,
  ]
  return gallery
}

function formatProduct(p) {
  const existingMeta = p.metadata || {}
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    created_at: p.created_at,
    metadata: {
      ...existingMeta,
      description: p.description,
      price: p.price,
      count: p.count,
      color: p.color,
      is_premium: p.is_premium,
      file_url: p.file_url,
      demo_url: existingMeta.demo_url || null,
      categories: [p.category_id],
      gallery: buildGallery(p),
      image: {
        imgix_url: p.image_id
          ? nhost.storage.getPublicUrl({ fileId: p.image_id })
          : getPlaceholderImage(p.title)
      }
    }
  }
}

export async function getDataByCategory(id) {
  const categoryId = await resolveCategoryId(id)
  const { data, error } = await nhost.graphql.request(`
    query GetProductsByCategory($categoryId: uuid!) {
      products(where: { category_id: { _eq: $categoryId } }) {
        id
        title
        slug
        description
        price
        count
        color
        image_id
        category_id
        is_premium
        file_url
        metadata
        created_at
      }
    }
  `, { categoryId })
  
  if (error) {
    console.error(error)
    return []
  }
  
  return data.products.map(formatProduct)
}

export async function getDataBySlug(slug) {
  const { data, error } = await nhost.graphql.request(`
    query GetProductBySlug($slug: String!) {
      products(where: { slug: { _eq: $slug } }) {
        id
        title
        slug
        description
        price
        count
        color
        image_id
        category_id
        is_premium
        file_url
        metadata
        created_at
      }
    }
  `, { slug })
  
  if (error) {
    console.error(error)
    return []
  }

  return data.products.map(formatProduct)
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function resolveCategoryId(idOrSlug) {
  if (!idOrSlug) return idOrSlug
  if (UUID_REGEX.test(idOrSlug)) return idOrSlug

  const { data, error } = await nhost.graphql.request(`
    query ResolveCategory($slug: String!) {
      categories(where: { slug: { _eq: $slug } }, limit: 1) {
        id
      }
    }
  `, { slug: idOrSlug })

  if (error || !data?.categories?.length) return null
  return data.categories[0].id
}
