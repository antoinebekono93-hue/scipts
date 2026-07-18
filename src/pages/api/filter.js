import { nhost } from '../../lib/nhost'
import rateLimit from '../../utils/rateLimit'

export default async function filterHandler(req, res) {
  if (rateLimit(req, res)) return

  const {
    query: { min, max, color, category, search },
  } = req

  let where = {}

  if (
    (typeof min !== 'undefined' && min !== 'undefined') ||
    (typeof max !== 'undefined' && max !== 'undefined')
  ) {
    where.price = {
      _gte: typeof min !== 'undefined' ? Number(min) : 1,
      _lte: typeof max !== 'undefined' ? Number(max) : 1000000000,
    }
  }

  if (
    typeof color !== 'undefined' &&
    color !== 'undefined' &&
    color?.toLocaleLowerCase() !== 'any color'
  ) {
    where.color = { _eq: color }
  }

  if (typeof category !== 'undefined' && category !== 'undefined') {
    where.category_id = { _eq: category }
  }

  if (search && typeof search !== 'undefined' && search !== 'undefined') {
    where.title = { _ilike: `%${search}%` }
  }

  try {
    const { data, error } = await nhost.graphql.request(`
      query FilterProducts($where: products_bool_exp!) {
        products(where: $where) {
          id
          title
          slug
          description
          price
          count
          color
          image_id
          category_id
          created_at
        }
      }
    `, { where })

    if (error) {
      return res.status(400).json({ error })
    }

    // Format response to match original Cosmic structure
    const objects = data.products.map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      created_at: p.created_at,
      metadata: {
        description: p.description,
        price: p.price,
        count: p.count,
        color: p.color,
        categories: [p.category_id],
        image: {
          imgix_url: nhost.storage.getPublicUrl({ fileId: p.image_id })
        }
      }
    }))

    res.status(200).json({ objects })
  } catch (error) {
    res.status(500).json(error)
  }
}
