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
export const maxDuration = 60

const MAX_ROWS = 500
const MAX_IMAGE_SIZE = 10 * 1024 * 1024

const HEADER_ALIASES = {
  title: ['title', 'titre', 'nom', 'name'],
  description: ['description', 'desc'],
  price: ['price', 'prix'],
  count: ['count', 'quantite', 'stock', 'qty'],
  color: ['color', 'couleur'],
  category: ['category', 'categorie', 'category_id', 'category_slug'],
  is_premium: ['is_premium', 'premium'],
  file_url: ['file_url', 'fichier', 'file'],
  demo_url: ['demo_url', 'demo', 'url_demo'],
  image_url: ['image_url', 'image', 'photo', 'img'],
}

function normalizeHeader(h) {
  return String(h).toLowerCase().trim().replace(/\s+/g, '_')
}

function mapHeaders(headers) {
  const map = {}
  for (const [key, aliases] of Object.entries(HEADER_ALIASES)) {
    for (const alias of aliases) {
      const norm = normalizeHeader(alias)
      const idx = headers.findIndex(h => normalizeHeader(h) === norm)
      if (idx !== -1) {
        map[key] = idx
        break
      }
    }
  }
  return map
}

function parseCSV(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += c
      }
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (c !== '\r') {
      field += c
    }
  }
  if (field !== '' || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

function parseBool(value, defaultValue = true) {
  if (value === undefined || value === null || value === '') return defaultValue
  const v = String(value).toLowerCase().trim()
  if (['true', '1', 'oui', 'yes', 'vrai'].includes(v)) return true
  if (['false', '0', 'non', 'no', 'faux'].includes(v)) return false
  return defaultValue
}

function slugify(name) {
  return String(name)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function getExtension(contentType) {
  if (contentType?.includes('jpeg')) return '.jpg'
  if (contentType?.includes('webp')) return '.webp'
  if (contentType?.includes('gif')) return '.gif'
  if (contentType?.includes('png')) return '.png'
  return '.png'
}

async function downloadAndUploadImage(url, index) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 20000)
    const response = await fetch(url, { signal: controller.signal, redirect: 'follow' })
    clearTimeout(timeout)

    if (!response.ok) return { error: `image HTTP ${response.status}` }

    const buffer = Buffer.from(await response.arrayBuffer())
    if (buffer.length > MAX_IMAGE_SIZE) return { error: 'image > 10MB' }

    const name = `import-${index}-${Date.now()}${getExtension(response.headers.get('content-type'))}`
    const { data, error } = await nhost.storage.upload(
      { file: new Blob([buffer]), name },
      { headers: ADMIN_HEADERS }
    )

    if (error) return { error: 'storage upload failed' }
    return { id: data.id, url: nhost.storage.getPublicUrl({ fileId: data.id }) }
  } catch (err) {
    return { error: err.message || 'download failed' }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
  if (!process.env.NHOST_ADMIN_SECRET) {
    return res.status(503).json({ message: 'NHOST_ADMIN_SECRET non configuré.' })
  }

  const contentType = req.headers['content-type'] || ''
  if (!contentType.includes('multipart/form-data')) {
    return res.status(400).json({ message: 'Content-Type must be multipart/form-data' })
  }

  const formidable = (await import('formidable')).default
  const form = formidable({ multiples: false, maxFileSize: 5 * 1024 * 1024 })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Import parse error:', err)
      return res.status(500).json({ message: 'Upload failed' })
    }

    const file = files.csv
    if (!file || !file[0]) {
      return res.status(400).json({ message: 'Fichier CSV manquant (champ "csv")' })
    }

    const csvFile = file[0]
    if (!csvFile.originalFilename?.toLowerCase().endsWith('.csv')) {
      return res.status(400).json({ message: 'Le fichier doit être un .csv' })
    }

    try {
      const fs = await import('fs')
      const raw = fs.default.readFileSync(csvFile.filepath, 'utf8')
      fs.default.unlinkSync(csvFile.filepath)

      const text = raw.replace(/^\uFEFF/, '')
      const rows = parseCSV(text).filter(r => r.some(c => c.trim() !== ''))
      if (rows.length < 2) {
        return res.status(400).json({ message: 'CSV vide : il manque la ligne d\'en-têtes ou des données' })
      }

      const headerMap = mapHeaders(rows[0])
      if (headerMap.title === undefined || headerMap.category === undefined) {
        return res.status(400).json({
          message: 'Colonnes requises absentes : "titre" et "categorie" doivent exister.',
        })
      }

      const dataRows = rows.slice(1)
      if (dataRows.length > MAX_ROWS) {
        return res.status(400).json({ message: `Maximum ${MAX_ROWS} lignes par import` })
      }

      const [{ data: categoriesData }, { data: productsData }] = await Promise.all([
        nhost.graphql.request(
          `query { categories { id title slug } }`,
          {},
          { headers: ADMIN_HEADERS }
        ),
        nhost.graphql.request(
          `query { products { slug } }`,
          {},
          { headers: ADMIN_HEADERS }
        ),
      ])

      const categories = categoriesData.categories || []
      const usedSlugs = new Set((productsData.products || []).map(p => p.slug))

      const getCell = (row, key) => {
        const idx = headerMap[key]
        return idx === undefined ? undefined : String(row[idx] ?? '').trim()
      }

      const resolveCategory = raw => {
        const value = String(raw || '').trim()
        if (!value) return null
        const lower = value.toLowerCase()
        const bySlug = categories.find(
          c => c.slug.toLowerCase() === lower || c.slug.toLowerCase() === slugify(lower)
        )
        if (bySlug) return bySlug.id
        const byTitle = categories.find(c => c.title.toLowerCase() === lower)
        return byTitle ? byTitle.id : null
      }

      const results = []
      let imported = 0
      let failed = 0

      for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i]
        const rowNumber = i + 2
        const title = getCell(row, 'title')

        if (!title) {
          failed++
          results.push({ row: rowNumber, title: '(vide)', ok: false, error: 'titre manquant' })
          continue
        }

        const categoryId = resolveCategory(getCell(row, 'category'))
        if (!categoryId) {
          failed++
          results.push({ row: rowNumber, title, ok: false, error: `catégorie introuvable : "${getCell(row, 'category')}"` })
          continue
        }

        const imageUrls = (getCell(row, 'image_url') || '')
          .split('|')
          .map(u => u.trim())
          .filter(Boolean)
          .slice(0, 5)

        const images = []
        let imageError = null
        for (let j = 0; j < imageUrls.length; j++) {
          const result = await downloadAndUploadImage(imageUrls[j], `${i}-${j}`)
          if (result.id) {
            images.push(result)
          } else if (!imageError) {
            imageError = result.error
          }
        }

        let slug = slugify(title)
        if (!slug) slug = `produit-${Date.now()}`
        let baseSlug = slug
        let n = 2
        while (usedSlugs.has(slug)) {
          slug = `${baseSlug}-${n++}`
        }
        usedSlugs.add(slug)

        const metadata = {
          demo_url: getCell(row, 'demo_url') || null,
          is_premium: parseBool(getCell(row, 'is_premium')),
          last_updated: new Date().toISOString(),
          tags: [],
          gallery: images.map(img => ({ id: img.id, url: img.url })),
        }

        const object = {
          title,
          slug,
          description: getCell(row, 'description') || '',
          price: Number(String(getCell(row, 'price')).replace(',', '.')) || 0,
          count: parseInt(getCell(row, 'count'), 10) || 1,
          color: getCell(row, 'color') || '#3498db',
          image_id: images[0]?.id || null,
          category_id: categoryId,
          is_premium: parseBool(getCell(row, 'is_premium')),
          file_url: getCell(row, 'file_url') || null,
          metadata,
        }

        const { error } = await nhost.graphql.request(
          `mutation InsertProduct($object: products_insert_input!) {
            insert_products_one(object: $object) { id title }
          }`,
          { object },
          { headers: ADMIN_HEADERS }
        )

        if (error) {
          failed++
          results.push({ row: rowNumber, title, ok: false, error: error.message || 'insert failed' })
        } else {
          imported++
          results.push({
            row: rowNumber,
            title,
            ok: true,
            images: images.length ? images.length : imageError ? `image ignorée (${imageError})` : 0,
          })
        }
      }

      return res.status(200).json({ total: dataRows.length, imported, failed, results })
    } catch (err) {
      console.error('Import error:', err)
      return res.status(500).json({ message: 'Erreur pendant l\'import' })
    }
  })
}
