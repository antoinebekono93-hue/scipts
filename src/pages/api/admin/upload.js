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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
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
        public_url: `/api/image/${fileMetadata.id}`
      })
    } catch (err) {
      console.error('Upload error:', err)
      return res.status(500).json({ message: 'Upload failed' })
    }
  })
}
