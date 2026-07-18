import { createBucketClient } from '@cosmicjs/sdk'
import formidable from 'formidable'
import fs from 'fs'

const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  readKey: process.env.COSMIC_READ_KEY,
  writeKey: process.env.COSMIC_WRITE_KEY,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

import rateLimit from '../../utils/rateLimit'

export default async function uploadHandler(req, res) {
  if (rateLimit(req, res)) return

  const form = formidable({
    filter: function ({ mimetype }) {
      // keep only images, video, audio
      return mimetype && (mimetype.includes('image') || mimetype.includes('video') || mimetype.includes('audio'))
    },
  })

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      if (!files.file || !files.file[0]) {
        res.status(400).json({ error: 'Invalid file type or no file uploaded' })
        return
      }
      const cosmicRes = await saveFile(files.file[0])
      res.status(200).json(cosmicRes)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const saveFile = async file => {
  const filedata = fs.readFileSync(file?.filepath)
  const media = {
    originalname: file.originalFilename,
    buffer: filedata,
  }
  try {
    // Add media to Cosmic Bucket
    const cosmic_res = await cosmic.media.insertOne({
      media,
    })
    fs.unlinkSync(file?.filepath)
    return cosmic_res
  } catch (error) {
    console.log(error)
    return error
  }
}
