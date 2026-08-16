import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import toast from 'react-hot-toast'
import Layout from '../components/Layout'
import { useStateContext } from '../utils/context/StateContext'
import { getAllDataByType, nhost } from '../lib/nhost'
import { PageMeta } from '../components/Meta'

import styles from '../styles/pages/Subscription.module.sass'

const Subscription = ({ navigationItems }) => {
  const { cosmicUser, hasActiveSubscription, subscriptionPlan, refreshSubscription } = useStateContext()
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  useEffect(() => {
    if (cosmicUser?.id) {
      refreshSubscription(cosmicUser.id)
    }
  }, [cosmicUser?.id, refreshSubscription])

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-SANDBOXDEMOKEY-X',
    tx_ref: `sub_${selectedPlan?.type}_${Date.now()}`,
    amount: selectedPlan?.price || 16,
    currency: 'USD',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: cosmicUser?.email || 'client@example.com',
      name: cosmicUser?.displayName || cosmicUser?.display_name || 'Utilisateur',
    },
    customizations: {
      title: `Abonnement ${selectedPlan?.name}`,
      description: selectedPlan?.type === 'quarterly'
        ? 'Accès Premium 3 mois - Renouvellement automatique'
        : 'Accès Premium 1 an - Renouvellement automatique - Économisez 47%',
      logo: 'https://scipts.vercel.app/logo.png',
    },
    meta: {
      user_id: cosmicUser?.id,
      plan_type: selectedPlan?.type
    }
  }

  const handleFlutterPayment = useFlutterwave(config)

  const handlePayment = (plan) => {
    if (!cosmicUser?.id) {
      toast.error('Veuillez vous connecter pour vous abonner.')
      return
    }

    if (plan.price === 0) {
      push('/search')
      return
    }

    setSelectedPlan(plan)

    setTimeout(() => {
      setLoading(true)
      handleFlutterPayment({
        callback: async (response) => {
           if (response.status === "successful") {
             toast.success("Paiement réussi ! Activation en cours...")
             try {
               const res = await fetch('/api/webhook/flutterwave', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({
                   transaction_id: response.transaction_id,
                   user_id: cosmicUser.id,
                   amount: plan.price,
                   plan_type: plan.type
                 })
               })

               if (res.ok) {
                 toast.success("Abonnement activé avec succès !")
                 push('/search')
               } else {
                 toast.error("Erreur lors de l'activation.")
               }
             } catch (err) {
               console.error(err)
             }
          }
          closePaymentModal()
          setLoading(false)
        },
        onClose: () => {
          setLoading(false)
        },
      })
    }, 100)
  }

  const isCurrentPlan = (planType) => {
    return hasActiveSubscription && subscriptionPlan === planType
  }

  const plans = [
    {
      name: 'Gratuit',
      type: 'free',
      price: 0,
      period: 'À vie',
      features: ['Apps gratuites illimitées', 'Mises à jour standards', 'Support communautaire'],
      btnText: 'Continuer Gratuit',
      current: !hasActiveSubscription
    },
    {
      name: 'Annuel',
      type: 'annual',
      price: 16,
      period: 'Facturé par an (25$) - Économisez 61% - Renouvellement auto',
      features: ['TOUT le catalogue Premium', 'Scripts & Plugins Pro', 'Mises à jour incluses', 'Support prioritaire', 'Renouvellement automatique', 'Meilleur rapport qualité/prix'],
      btnText: "S'abonner 25$ / an",
      popular: true,
      current: isCurrentPlan('annual')
    },
    {
      name: 'Trimestriel',
      type: 'quarterly',
      price: 10,
      period: 'Facturé tous les 3 mois (16$) - Renouvellement auto',
      features: ['TOUT le catalogue Premium', 'Scripts & Plugins Pro', 'Mises à jour incluses', 'Support prioritaire', 'Renouvellement automatique'],
      btnText: "S'abonner 16$ / 3 mois",
      popular: false,
      current: isCurrentPlan('quarterly')
    }
  ]

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <PageMeta
        title={'Nos Abonnements | Script Marketplace'}
        description={'Débloquez tout le catalogue Premium : scripts PHP, plugins WordPress, templates. 16$/trimestre ou 25$/an.'}
        path="/subscription"
      />
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <h1 className={styles.title}>Choisissez votre abonnement</h1>
          <div className={styles.subtitle}>
            Accédez à des milliers de scripts et templates professionnels. Renouvellement automatique, annulable à tout moment.
          </div>

          <div className={styles.grid}>
            {plans.map((plan, index) => (
              <div key={index} className={cn(styles.card, { [styles.popular]: plan.popular, [styles.current]: plan.current })}>
                {plan.popular && <div className={styles.popularTag}>Le plus populaire</div>}
                {plan.current && hasActiveSubscription && <div className={styles.currentTag}>Plan actuel</div>}
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.price}>
                  ${plan.price}
                  {plan.price > 0 && <span className={styles.period}>/{plan.type === 'quarterly' ? '3 mois' : 'an'}</span>}
                </div>
                <div className={styles.period}>{plan.period}</div>
                <ul className={styles.features}>
                  {plan.features.map((feat, i) => (
                    <li key={i}>��� {feat}</li>
                  ))}
                </ul>
                <button
                  className={cn('button', styles.button, { [styles.disabled]: plan.current || loading })}
                  onClick={() => handlePayment(plan)}
                  disabled={loading || plan.current}
                >
                  {loading && selectedPlan?.type === plan.type ? '...' : plan.btnText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Subscription

export async function getServerSideProps() {
  const navigationItems = (await getAllDataByType('navigation')) || []
  return {
    props: { navigationItems },
  }
}