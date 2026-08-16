import { Readable } from 'stream'
import { NhostClient } from '@nhost/nhost-js'
import rateLimit from '../../../utils/rateLimit'

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'dspprxgtnymanbtxneyo',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || 'us-east-1',
})

const ADMIN_HEADERS = {
  'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET || '',
}

const EXT_BY_TYPE = {
  'application/zip': 'zip',
  'application/x-zip-compressed': 'zip',
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'video/mp4': 'mp4',
  'audio/mpeg': 'mp3',
}

function decodeUserId(token) {
  try {
    const payload = token.split('.')[1]
    const json = Buffer.from(payload, 'base64').toString()
    const claims = JSON.parse(json)
    return (
      claims?.['https://hasura.io/jwt/claims']?.['x-hasura-user-id'] ||
      claims?.sub ||
      null
    )
  } catch (err) {
    return null
  }
}

function getFileIdFromUrl(url) {
  const match = String(url).match(/\/v1\/files\/([a-zA-Z0-9-]+)/)
  return match ? match[1] : null
}

function slugify(name) {
  return String(name)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60)
}

function filenameFor(title, contentType) {
  const ext = EXT_BY_TYPE[contentType] || 'bin'
  return `${slugify(title) || 'download'}.${ext}`
}

async function streamFile(url, res, fallbackName) {
  const fileRes = await fetch(url)
  if (!fileRes.ok) {
    return false
  }

  const contentType =
    fileRes.headers.get('content-type') || 'application/octet-stream'
  res.setHeader('Content-Type', contentType)
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${filenameFor(fallbackName, contentType)}"`
  )

  const nodeStream = Readable.fromWeb(fileRes.body)
  nodeStream.pipe(res)
  return true
}

export default async function handler(req, res) {
  if (rateLimit(req, res)) return

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { slug } = req.query

  const { data: productData, error: productError } = await nhost.graphql.request(
    `
      query GetProductBySlug($slug: String!) {
        products(where: { slug: { _eq: $slug } }) {
          id
          title
          slug
          file_url
          image_id
          is_premium
          metadata
        }
      }
    `,
    { slug },
    { headers: ADMIN_HEADERS }
  )

  if (productError || !productData?.products?.[0]) {
    return res.status(404).json({ message: 'Produit introuvable' })
  }

  const product = productData.products[0]
  const isPremium = product.is_premium !== false

  if (isPremium) {
    const token = String(req.headers.authorization || '').replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: 'Authentification requise' })
    }

    const userId = decodeUserId(token)
    if (!userId) {
      return res.status(401).json({ message: 'Token invalide' })
    }

    const { data: profileData } = await nhost.graphql.request(
      `
        query GetProfile($id: uuid!) {
          user_profiles_by_pk(id: $id) {
            has_active_subscription
            subscription_end_date
          }
        }
      `,
      { id: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    const profile = profileData?.user_profiles_by_pk
    const isActive =
      profile?.has_active_subscription &&
      profile?.subscription_end_date &&
      new Date(profile.subscription_end_date) > new Date()

    if (!isActive) {
      return res.status(403).json({ message: 'Abonnement actif requis' })
    }
  }

  const fileUrl = product.file_url
  const fileId = getFileIdFromUrl(fileUrl)

  if (fileId) {
    const publicUrl = nhost.storage.getPublicUrl({ fileId })
    const streamed = await streamFile(publicUrl, res, product.title)
    if (!streamed) {
      return res.status(502).json({ message: 'Fichier inaccessible' })
    }
    return
  }

  if (fileUrl) {
    return res.status(200).json({ externalUrl: fileUrl })
  }

  return res.status(404).json({ message: 'Aucun fichier disponible' })
}
