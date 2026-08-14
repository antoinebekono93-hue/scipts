import Stripe from 'stripe'
import rateLimit from '../../utils/rateLimit'

let stripe

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null
  }
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  }
  return stripe
}

export default async function handler(req, res) {
  if (rateLimit(req, res)) return

  if (req.method === 'POST') {
    try {
      const stripe = getStripe()
      if (!stripe) {
        return res.status(503).json({ message: 'Stripe non configuré (STRIPE_SECRET_KEY manquant)' })
      }

      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        line_items: req.body.map(item => {
          const price = Number(item.metadata?.price) || 0
          const img = item.metadata?.image?.imgix_url

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.title,
                ...(img ? { images: [img] } : {}),
              },
              unit_amount: Math.round(price * 100),
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${req.headers.origin}/`,
        cancel_url: `${req.headers.origin}/`,
      }

      // Add shipping options only if configured in environment variables
      if (process.env.STRIPE_SHIPPING_RATE_1) {
        params.shipping_options = [
          { shipping_rate: process.env.STRIPE_SHIPPING_RATE_1 },
        ]
        if (process.env.STRIPE_SHIPPING_RATE_2) {
          params.shipping_options.push({
            shipping_rate: process.env.STRIPE_SHIPPING_RATE_2,
          })
        }
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params)

      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
