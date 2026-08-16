import { Readable } from 'stream'
import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'dspprxgtnymanbtxneyo',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || 'us-east-1',
})

const ADMIN_HEADERS = {
  'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET || '',
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { fileId } = req.query
  if (!fileId) {
    return res.status(400).json({ message: 'fileId is required' })
  }

  try {
    const publicUrl = nhost.storage.getPublicUrl({ fileId })
    const fileRes = await fetch(publicUrl, {
      headers: ADMIN_HEADERS,
    })

    if (!fileRes.ok) {
      return res.status(404).json({ message: 'Image not found' })
    }

    const contentType = fileRes.headers.get('content-type') || 'application/octet-stream'
    const cacheControl = fileRes.headers.get('cache-control') || 'public, max-age=31536000, immutable'

    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', cacheControl)

    const nodeStream = Readable.fromWeb(fileRes.body)
    nodeStream.pipe(res)
  } catch (err) {
    console.error('Image proxy error:', err)
    return res.status(500).json({ message: 'Image proxy error' })
  }
}
