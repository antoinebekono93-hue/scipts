import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'dspprxgtnymanbtxneyo',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || 'us-east-1',
  adminSecret: process.env.NHOST_ADMIN_SECRET
})

const ADMIN_HEADERS = {
  'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET || ''
}

export const config = { api: { bodyParser: false } }

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', chunk => {
      raw += chunk
      if (raw.length > 1e6) {
        req.destroy()
        reject(new Error('Body trop volumineux'))
      }
    })
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {})
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (!process.env.NHOST_ADMIN_SECRET) {
    return res.status(503).json({
      message: 'NHOST_ADMIN_SECRET non configuré. Ajoutez-le dans .env.local / Vercel.'
    })
  }
  if (req.method === 'GET') {
    return getProducts(req, res)
  }
  if (req.method === 'POST') {
    if (req.query.upload === 'true') {
      return uploadImage(req, res)
    }
    req.body = await readJsonBody(req).catch(() => ({}))
    return createProduct(req, res)
  }
  if (req.method === 'PUT') {
    req.body = await readJsonBody(req).catch(() => ({}))
    return updateProduct(req, res)
  }
  if (req.method === 'DELETE') {
    req.body = await readJsonBody(req).catch(() => ({}))
    return deleteProduct(req, res)
  }
  return res.status(405).json({ message: 'Method Not Allowed' })
}

async function getProducts(req, res) {
  const { data, error } = await nhost.graphql.request(`
    query {
      products(order_by: { created_at: desc }) {
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
        category {
          title
          slug
        }
      }
    }
  `, {}, { headers: ADMIN_HEADERS })

  if (error) {
    return res.status(500).json({ error })
  }
  return res.status(200).json({ products: data.products })
}

async function uploadImage(req, res) {
  const contentType = req.headers['content-type'] || ''
  if (!contentType.includes('multipart/form-data')) {
    return res.status(400).json({ message: 'Content-Type must be multipart/form-data' })
  }

  const formidable = (await import('formidable')).default
  const form = formidable({ multiples: false })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Upload parse error:', err)
      return res.status(500).json({ message: 'Upload failed' })
    }

    const file = files.file
    if (!file || !file[0]) {
      return res.status(400).json({ message: 'No file provided' })
    }

    const uploadedFile = file[0]
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(uploadedFile.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type. Use JPEG, PNG, WebP or GIF' })
    }
    if (uploadedFile.size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: 'File too large. Max 5MB' })
    }

    try {
      const fs = await import('fs')
      const fileBuffer = fs.default.readFileSync(uploadedFile.filepath)

      const { fileMetadata, error } = await nhost.storage.upload({
        file: new Blob([fileBuffer]),
        name: uploadedFile.originalFilename || 'image.png'
      }, { headers: ADMIN_HEADERS })

      if (error || !fileMetadata) {
        console.error('Nhost upload error:', error)
        return res.status(500).json({ message: 'Storage upload failed' })
      }

      fs.default.unlinkSync(uploadedFile.filepath)

      return res.status(200).json({
        file_id: fileMetadata.id,
        public_url: nhost.storage.getPublicUrl({ fileId: fileMetadata.id })
      })
    } catch (err) {
      console.error('Upload error:', err)
      return res.status(500).json({ message: 'Upload failed' })
    }
  })
}

async function createProduct(req, res) {
  const { title, description, price, count, color, category_id, is_premium, file_url, demo_url, image_id, gallery } = req.body

  if (!title || !category_id) {
    return res.status(400).json({ message: 'title and category_id are required' })
  }

  const slug = slugify(title)

  const metadata = {
    demo_url: demo_url || null,
    is_premium: is_premium !== false,
    last_updated: new Date().toISOString(),
    tags: [],
    gallery: Array.isArray(gallery) ? gallery : []
  }

  const { data, error } = await nhost.graphql.request(`
    mutation CreateProduct($object: products_insert_input!) {
      insert_products_one(object: $object) {
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
      }
    }
  `, {
    object: {
      title,
      slug,
      description: description || '',
      price: Number(price) || 0,
      count: Number(count) || 1,
      color: color || '#3498db',
      image_id: image_id || null,
      category_id,
      is_premium: is_premium !== false,
      file_url: file_url || null,
      metadata
    }
  }, { headers: ADMIN_HEADERS })

  if (error) {
    return res.status(500).json({ error })
  }
  return res.status(200).json({ product: data.insert_products_one })
}

async function updateProduct(req, res) {
  const { id, title, description, price, count, color, category_id, is_premium, file_url, demo_url, image_id, gallery } = req.body

  if (!id) {
    return res.status(400).json({ message: 'id is required' })
  }

  const setObject = {}

  if (typeof title === 'string' && title) {
    setObject.title = title
    setObject.slug = slugify(title)
  }
  if (typeof description === 'string') setObject.description = description
  if (typeof price === 'number') setObject.price = price
  if (typeof count === 'number') setObject.count = count
  if (typeof color === 'string') setObject.color = color
  if (typeof image_id === 'string' || image_id === null) setObject.image_id = image_id || null
  if (typeof category_id === 'string') setObject.category_id = category_id
  if (typeof is_premium === 'boolean') setObject.is_premium = is_premium
  if (typeof file_url === 'string') setObject.file_url = file_url || null

  if (demo_url !== undefined || gallery !== undefined) {
    const { data: existing } = await nhost.graphql.request(`
      query GetProduct($id: uuid!) {
        products_by_pk(id: $id) {
          metadata
        }
      }
    `, { id }, { headers: ADMIN_HEADERS })

    const currentMetadata = existing?.products_by_pk?.metadata || {}
    setObject.metadata = {
      ...currentMetadata,
      ...(demo_url !== undefined ? { demo_url: demo_url || null } : {}),
      ...(gallery !== undefined ? { gallery: Array.isArray(gallery) ? gallery : [] } : {})
    }
  }

  const { data, error } = await nhost.graphql.request(`
    mutation UpdateProduct($id: uuid!, $set: products_set_input!) {
      update_products_by_pk(pk_columns: { id: $id }, _set: $set) {
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
      }
    }
  `, { id, set: setObject }, { headers: ADMIN_HEADERS })

  if (error) {
    return res.status(500).json({ error })
  }
  return res.status(200).json({ product: data.update_products_by_pk })
}

async function deleteProduct(req, res) {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'id is required' })
  }

  const { data, error } = await nhost.graphql.request(`
    mutation DeleteProduct($id: uuid!) {
      delete_products_by_pk(id: $id) {
        id
      }
    }
  `, { id }, { headers: ADMIN_HEADERS })

  if (error) {
    return res.status(500).json({ error })
  }
  return res.status(200).json({ success: true, deleted: data.delete_products_by_pk?.id })
}

function slugify(name) {
  return String(name)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}