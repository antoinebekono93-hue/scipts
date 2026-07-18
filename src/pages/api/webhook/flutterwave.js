import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'dspprxgtnymanbtxneyo',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || 'us-east-1',
  adminSecret: process.env.NHOST_ADMIN_SECRET // Nécessaire pour bypasser les permissions en backend
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { transaction_id, user_id } = req.body

  if (!transaction_id || !user_id) {
    return res.status(400).json({ message: 'Missing transaction_id or user_id' })
  }

  try {
    // 1. Vérifier la transaction auprès de Flutterwave (Optionnel mais recommandé en prod)
    // const flwRes = await fetch(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
    //   headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` }
    // })
    // const flwData = await flwRes.json()
    // if (flwData.data.status !== "successful" || flwData.data.amount < 15) throw new Error("Invalid transaction")

    // 2. Mettre à jour l'abonnement de l'utilisateur dans Nhost Hasura
    const endDate = new Date()
    endDate.setFullYear(endDate.getFullYear() + 1) // + 1 an

    const { data, error } = await nhost.graphql.request(`
      mutation UpdateSubscription($user_id: uuid!, $end_date: timestamptz!) {
        insert_user_profiles_one(
          object: { id: $user_id, has_active_subscription: true, subscription_end_date: $end_date },
          on_conflict: { constraint: user_profiles_pkey, update_columns: [has_active_subscription, subscription_end_date] }
        ) {
          id
          has_active_subscription
          subscription_end_date
        }
      }
    `, {
      user_id,
      end_date: endDate.toISOString()
    }, {
      headers: {
        'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET || ''
      }
    })

    if (error) {
      console.error('Erreur Hasura:', error)
      return res.status(500).json({ message: 'Error updating subscription', error })
    }

    return res.status(200).json({ success: true, profile: data.insert_user_profiles_one })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
