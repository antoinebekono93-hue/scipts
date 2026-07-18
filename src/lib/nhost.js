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
          title: 'Partagez vos créations avec le monde entier',
          subtitle: 'LA NOUVELLE ÉCONOMIE CRÉATIVE',
          description: "Collectionnez et vendez des œuvres d'art numériques grâce aux meilleurs outils en ligne.",
          image: { imgix_url: '/images/content/hero.png' }
        }
      },
      {
        slug: 'introduction',
        metadata: {
          title: 'Découvrez de nouvelles collections',
          subtitle: 'Une plateforme innovante',
          description: '1.00 ETH',
          image: { imgix_url: '/images/content/upload-pic.jpg' }
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
    const { data, error } = await nhost.graphql.request(`
      query {
        navigation {
          id
          title
          slug
          metadata
          created_at
        }
      }
    `)
    if (error || !data || !data.navigation || data.navigation.length === 0) {
      // Fallback si la table navigation est vide dans Nhost
      return [
        {
          id: 'mock-nav',
          metadata: {
            logo: { imgix_url: '/logo.png' },
            menu: [
              { title: 'Découvrir', url: '/search' },
              { title: 'Créer un élément', url: '/upload-details' },
              { title: 'À propos de nous', url: '/about' }
            ]
          }
        }
      ]
    }
    return data.navigation
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
