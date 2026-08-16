import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'dspprxgtnymanbtxneyo',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || 'us-east-1',
  adminSecret: process.env.NHOST_ADMIN_SECRET
})

function calculateEndDate(planType, fromDate = new Date()) {
  const endDate = new Date(fromDate)
  switch (planType) {
    case 'quarterly':
      endDate.setMonth(endDate.getMonth() + 3)
      break
    case 'annual':
      endDate.setFullYear(endDate.getFullYear() + 1)
      break
    default:
      endDate.setMonth(endDate.getMonth() + 3)
  }
  return endDate
}

function detectPlanType(amount, explicitPlanType) {
  if (explicitPlanType && ['quarterly', 'annual'].includes(explicitPlanType)) {
    return explicitPlanType
  }
  if (amount >= 25) return 'annual'
  if (amount >= 16) return 'quarterly'
  return 'free'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { transaction_id, user_id, amount, plan_type, event } = req.body

  if (!transaction_id || !user_id) {
    return res.status(400).json({ message: 'Missing transaction_id or user_id' })
  }

  try {
    const detectedPlan = detectPlanType(amount, plan_type)
    const isRecurring = event === 'recurring.payment.success' || event === 'subscription.renewed'
    const isInitialPayment = event === 'charge.completed' || !event

    let endDate
    if (isRecurring) {
      const { data: currentProfile } = await nhost.graphql.request(`
        query GetProfile($user_id: uuid!) {
          user_profiles_by_pk(id: $user_id) {
            subscription_end_date
            subscription_plan
          }
        }
      `, { user_id }, {
        headers: { 'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET || '' }
      })

      const currentEndDate = currentProfile?.user_profiles_by_pk?.subscription_end_date
      const baseDate = currentEndDate && new Date(currentEndDate) > new Date() 
        ? new Date(currentEndDate) 
        : new Date()
      endDate = calculateEndDate(detectedPlan, baseDate)
    } else {
      endDate = calculateEndDate(detectedPlan)
    }

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
      plan: detectedPlan
    }, {
      headers: {
        'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET || ''
      }
    })

    if (error) {
      console.error('Erreur Hasura:', error)
      return res.status(500).json({ message: 'Error updating subscription', error })
    }

    console.log(`${isRecurring ? 'Renouvellement' : 'Nouvel abonnement'} ${detectedPlan} pour user ${user_id} jusqu'au ${endDate.toISOString()}`)

    return res.status(200).json({ 
      success: true, 
      profile: data.insert_user_profiles_one,
      plan: detectedPlan,
      is_recurring: isRecurring
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}