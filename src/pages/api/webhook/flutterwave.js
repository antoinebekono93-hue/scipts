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

  const { transaction_id, user_id, amount } = req.body

  if (!transaction_id || !user_id) {
    return res.status(400).json({ message: 'Missing transaction_id or user_id' })
  }

  try {
    // 1. Calcul de la durée en fonction du montant payé
    const endDate = new Date()
    let plan = 'free'
    if (amount >= 99) {
      endDate.setFullYear(endDate.getFullYear() + 1) // + 1 an
      plan = 'annual'
    } else if (amount >= 15) {
      endDate.setMonth(endDate.getMonth() + 1) // + 1 mois
      plan = 'monthly'
    }

    // 2. Mettre à jour l'abonnement de l'utilisateur dans Nhost Hasura
    const { data, error } = await nhost.graphql.request(`
      mutation UpdateSubscription($user_id: uuid!, $end_date: timestamptz!, $plan: String!) {
        insert_user_profiles_one(
          object: { 
            id: $user_id, 
            has_active_subscription: true, 
            subscription_end_date: $end_date,
            subscription_plan: $plan
          },
          on_conflict: { 
            constraint: user_profiles_pkey, 
            update_columns: [has_active_subscription, subscription_end_date, subscription_plan] 
          }
        ) {
          id
          has_active_subscription
          subscription_end_date
          subscription_plan
        }
      }
    `, {
      user_id,
      end_date: endDate.toISOString(),
      plan
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
