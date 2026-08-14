import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'dspprxgtnymanbtxneyo',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || 'us-east-1',
  adminSecret: process.env.NHOST_ADMIN_SECRET
})

const ADMIN_HEADERS = {
  'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET || ''
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  // Sécurité : vérifier le secret CRON (obligatoire hors Vercel Cron)
  const authToken =
    req.headers['authorization'] ||
    req.headers['x-cron-secret'] ||
    req.query?.secret

  if (process.env.CRON_SECRET && authToken !== `Bearer ${process.env.CRON_SECRET}` && authToken !== process.env.CRON_SECRET) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    // 1. Trouver les abonnements expirés
    const { data, error } = await nhost.graphql.request(`
      query ExpiredSubscriptions {
        user_profiles(
          where: {
            has_active_subscription: { _eq: true },
            subscription_end_date: { _lt: "now()" }
          }
        ) {
          id
          subscription_plan
          subscription_end_date
        }
      }
    `, {}, { headers: ADMIN_HEADERS })

    if (error) {
      console.error('Erreur requête expirés:', error)
      return res.status(500).json({ message: 'Erreur requête', error })
    }

    const expired = data.user_profiles
    const expiredIds = expired.map(u => u.id)

    if (expiredIds.length === 0) {
      return res.status(200).json({ success: true, expired: 0, details: [] })
    }

    // 2. Mettre à jour les abonnements expirés
    const { data: updateData, error: updateError } = await nhost.graphql.request(`
      mutation ExpireSubscriptions($ids: [uuid!]!) {
        update_user_profiles(
          where: { id: { _in: $ids } },
          _set: {
            has_active_subscription: false,
            subscription_plan: "free"
          }
        ) {
          affected_rows
        }
      }
    `, { ids: expiredIds }, { headers: ADMIN_HEADERS })

    if (updateError) {
      console.error('Erreur mise à jour:', updateError)
      return res.status(500).json({ message: 'Erreur mise à jour', error: updateError })
    }

    console.log(`[CRON] ${updateData.update_user_profiles.affected_rows} abonnements expirés désactivés`)

    return res.status(200).json({
      success: true,
      expired: updateData.update_user_profiles.affected_rows,
      details: expired.map(u => ({
        id: u.id,
        plan: u.subscription_plan,
        end_date: u.subscription_end_date
      }))
    })
  } catch (err) {
    console.error('[CRON] Erreur:', err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}