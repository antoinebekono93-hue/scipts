import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  readKey: process.env.COSMIC_READ_KEY,
  writeKey: process.env.COSMIC_WRITE_KEY,
})

import rateLimit from '../../utils/rateLimit'

export default async function createHandler(req, res) {
  if (rateLimit(req, res)) return

  const { title, description, price, count, color, image, categories } = req.body

  if (!title || typeof title !== 'string' || title.length > 200) {
    return res.status(400).json('Invalid title')
  }
  if (typeof description !== 'string' || description.length > 2000) {
    return res.status(400).json('Invalid description')
  }
  if (isNaN(Number(price)) || Number(price) <= 0) {
    return res.status(400).json('Invalid price')
  }
  if (isNaN(Number(count)) || Number(count) <= 0) {
    return res.status(400).json('Invalid count')
  }

  const metadata = {
    description,
    price: Number(price),
    count: Number(count),
    color: typeof color === 'string' ? color : '',
    image: typeof image === 'string' ? image : '',
    categories: Array.isArray(categories) ? categories : typeof categories === 'string' ? [categories] : [],
  }
  try {
    const data = await cosmic.objects.insertOne({
      title: title,
      type: 'products',
      thumbnail: image,
      metadata,
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json(error.message)
  }
}
