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
  const { cosmicUser } = useStateContext()
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  // Configuration de base pour Flutterwave
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-SANDBOXDEMOKEY-X',
    tx_ref: Date.now().toString(),
    amount: selectedPlan?.price || 15,
    currency: 'USD',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: cosmicUser?.email || 'client@example.com',
      name: cosmicUser?.displayName || cosmicUser?.display_name || 'Utilisateur',
    },
    customizations: {
      title: `Abonnement ${selectedPlan?.name}`,
      description: 'Accès illimité aux scripts premium',
      logo: 'https://scipts.vercel.app/logo.png',
    },
    meta: {
      user_id: cosmicUser?.id,
      plan_type: selectedPlan?.type
    }
  }

  const handleFlutterPayment = useFlutterwave(config)

  const handlePayment = (plan) => {
    if (!cosmicUser?.hasOwnProperty('id')) {
      toast.error('Veuillez vous connecter pour vous abonner.')
      return
    }

    if (plan.price === 0) {
      push('/search') // Redirige vers le catalogue pour le plan gratuit
      return
    }

    setSelectedPlan(plan)
    
    // Le setState est asynchrone, donc on utilise un setTimeout léger pour s'assurer que config est à jour
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
                    amount: plan.price
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

  const plans = [
    {
      name: 'Gratuit',
      type: 'free',
      price: 0,
      period: 'Illimité',
      features: ['Téléchargements gratuits illimités', 'Mises à jour standards', 'Support communautaire'],
      btnText: 'Explorer',
    },
    {
      name: 'Mensuel',
      type: 'monthly',
      price: 15,
      period: 'Facturé par mois',
      features: ['Téléchargements Premium illimités', 'Scripts & Plugins Pro', 'Mises à jour gratuites pendant 1 mois', 'Support prioritaire'],
      btnText: 'Souscrire',
      popular: false
    },
    {
      name: 'Annuel',
      type: 'annual',
      price: 99,
      period: 'Facturé par an',
      features: ['Téléchargements Premium illimités', 'Scripts & Plugins Pro', 'Mises à jour gratuites pendant 1 an', 'Économisez 45%'],
      btnText: 'Souscrire (99$)',
      popular: true
    }
  ]

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <PageMeta
        title={'Nos Abonnements | Script Marketplace'}
        description={'Débloquez tous les scripts PHP, applications et templates.'}
      />
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <h1 className={styles.title}>Choisissez votre abonnement</h1>
          <div className={styles.subtitle}>
            Des milliers de scripts et templates de qualité professionnelle à portée de clic.
          </div>
          
          <div className={styles.grid}>
            {plans.map((plan, index) => (
              <div key={index} className={cn(styles.card, { [styles.popular]: plan.popular })}>
                {plan.popular && <div className={styles.popularTag}>Le plus populaire</div>}
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.price}>${plan.price}</div>
                <div className={styles.period}>{plan.period}</div>
                <ul className={styles.features}>
                  {plan.features.map((feat, i) => (
                    <li key={i}>✅ {feat}</li>
                  ))}
                </ul>
                <button
                  className={cn('button', styles.button)}
                  onClick={() => handlePayment(plan)}
                  disabled={loading}
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
