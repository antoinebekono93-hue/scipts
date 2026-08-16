import React, { useEffect, useState, useCallback, useRef } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import toast from 'react-hot-toast'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import OAuth from '../components/OAuth'
import { useStateContext } from '../utils/context/StateContext'
import { getAllDataByType, nhost } from '../lib/nhost'
import { PageMeta } from '../components/Meta'

import styles from '../styles/pages/Subscription.module.sass'

const Subscription = ({ navigationItems }) => {
  const { cosmicUser, hasActiveSubscription, subscriptionPlan, refreshSubscription } = useStateContext()
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [openFaq, setOpenFaq] = useState(0)
  const [visibleAuthModal, setVisibleAuthModal] = useState(false)
  const pendingPlanRef = useRef(null)

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
        : 'Accès Premium 1 an - Renouvellement automatique - Économisez 61%',
      logo: 'https://scipts.vercel.app/logo.png',
    },
    meta: {
      user_id: cosmicUser?.id,
      plan_type: selectedPlan?.type
    }
  }

  const handleFlutterPaymentRef = useRef()
  handleFlutterPaymentRef.current = useFlutterwave(config)

  const startPayment = (plan) => {
    setSelectedPlan(plan)

    setTimeout(() => {
      setLoading(true)
      handleFlutterPaymentRef.current({
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

  const handlePayment = (plan) => {
    if (!cosmicUser?.id) {
      pendingPlanRef.current = plan
      setVisibleAuthModal(true)
      return
    }

    if (plan.price === 0) {
      push('/search')
      return
    }

    startPayment(plan)
  }

  const handleAuthSuccess = useCallback(() => {
    setVisibleAuthModal(false)
  }, [])

  const handleCloseAuthModal = useCallback(() => {
    setVisibleAuthModal(false)
  }, [])

  useEffect(() => {
    if (cosmicUser?.id && pendingPlanRef.current) {
      const plan = pendingPlanRef.current
      pendingPlanRef.current = null
      startPayment(plan)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cosmicUser?.id])

  const isCurrentPlan = (planType) => {
    return hasActiveSubscription && subscriptionPlan === planType
  }

  const faqs = [
    {
      q: 'Comment fonctionne l\'abonnement ?',
      a: 'L\'abonnement débloque tout le catalogue Premium : scripts PHP, plugins WordPress, templates HTML et applications web. Vous pouvez télécharger autant de produits que vous voulez pendant la durée de votre abonnement.',
    },
    {
      q: 'Puis-je annuler mon abonnement à tout moment ?',
      a: 'Oui. L\'abonnement est renouvelé automatiquement mais vous pouvez l\'annuler à tout moment depuis votre espace. Vous gardez l\'accès Premium jusqu\'à la fin de la période déjà payée.',
    },
    {
      q: 'Que comprend le plan Gratuit ?',
      a: 'Le plan Gratuit donne accès à toutes les applications gratuites du catalogue sans limite, avec les mises à jour standards et le support communautaire. Les produits Premium nécessitent un abonnement payant.',
    },
    {
      q: 'Quels moyens de paiement sont acceptés ?',
      a: 'Nous acceptons les cartes bancaires (Visa, Mastercard), le mobile money et l\'USSD via notre passerelle de paiement sécurisée Flutterwave.',
    },
    {
      q: 'Que se passe-t-il si mon abonnement expire ?',
      a: 'Vous perdez l\'accès aux téléchargements Premium mais conservez vos accès aux produits gratuits et votre historique. Les fichiers déjà téléchargés restent les vôtres.',
    },
    {
      q: 'Les mises à jour sont-elles incluses ?',
      a: 'Oui. Les mises à jour de tous les produits du catalogue sont incluses dans les abonnements payants pendant toute la durée de votre abonnement.',
    },
  ]

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
      price: 25,
      period: 'Facturé par an (25$) - Économisez 61% - Renouvellement auto',
      features: ['TOUT le catalogue Premium', 'Scripts & Plugins Pro', 'Mises à jour incluses', 'Support prioritaire', 'Renouvellement automatique', 'Meilleur rapport qualité/prix'],
      btnText: "S'abonner 25$ / an",
      popular: true,
      current: isCurrentPlan('annual')
    },
    {
      name: 'Trimestriel',
      type: 'quarterly',
      price: 16,
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

          <div className={styles.faq}>
            <h2 className={styles.faqTitle}>Questions fréquentes</h2>
            <div className={styles.faqList}>
              {faqs.map((faq, index) => {
                const open = openFaq === index
                return (
                  <div key={index} className={cn(styles.faqItem, { [styles.open]: open })}>
                    <button
                      className={styles.faqQuestion}
                      onClick={() => setOpenFaq(open ? null : index)}
                    >
                      <span>{faq.q}</span>
                      <span className={cn(styles.faqIcon, { [styles.open]: open })}>
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                    <div className={styles.faqAnswer}>
                      <p>{faq.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={visibleAuthModal}
        onClose={handleCloseAuthModal}
      >
        <OAuth
          className={styles.steps}
          handleOAuth={handleAuthSuccess}
          handleClose={handleCloseAuthModal}
        />
      </Modal>
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