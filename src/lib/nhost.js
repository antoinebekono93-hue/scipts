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
          description: 'Abonnement dès 15$/mois',
          image: { imgix_url: '/images/content/hero.png' }
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

export async function getDataByCategory(id) {
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
        created_at
      }
    }
  `, { categoryId: id })
  
  if (error) {
    console.error(error)
    return []
  }
  
  // Format to match Cosmic structure
  return data.products.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    created_at: p.created_at,
    metadata: {
      description: p.description,
      price: p.price,
      count: p.count,
      color: p.color,
      is_premium: p.is_premium,
      file_url: p.file_url,
      categories: [p.category_id],
      image: {
        imgix_url: nhost.storage.getPublicUrl({ fileId: p.image_id })
      }
    }
  }))
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
        created_at
      }
    }
  `, { slug })
  
  if (error) {
    console.error(error)
    return []
  }

  return data.products.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    created_at: p.created_at,
    metadata: {
      description: p.description,
      price: p.price,
      count: p.count,
      color: p.color,
      is_premium: p.is_premium,
      file_url: p.file_url,
      categories: [p.category_id],
      image: {
        imgix_url: nhost.storage.getPublicUrl({ fileId: p.image_id })
      }
    }
  }))
}
