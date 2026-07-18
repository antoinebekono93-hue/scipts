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

  // Configuration Flutterwave
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-SANDBOXDEMOKEY-X', // Remplacez par votre vraie clé publique
    tx_ref: Date.now().toString(),
    amount: 15,
    currency: 'USD',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: cosmicUser?.email || 'client@example.com',
      name: cosmicUser?.displayName || cosmicUser?.display_name || 'Utilisateur',
    },
    customizations: {
      title: 'Abonnement Premium (1 An)',
      description: 'Accès illimité aux scripts et templates premium',
      logo: 'https://scipts.vercel.app/logo.png',
    },
    meta: {
      user_id: cosmicUser?.id
    }
  }

  const handleFlutterPayment = useFlutterwave(config)

  const handlePayment = () => {
    if (!cosmicUser?.hasOwnProperty('id')) {
      toast.error('Veuillez vous connecter pour vous abonner.')
      return
    }

    setLoading(true)
    handleFlutterPayment({
      callback: async (response) => {
         // Ce callback est appelé dès que le popup Flutterwave se ferme après succès
         if (response.status === "successful") {
            toast.success("Paiement réussi ! Activation de votre abonnement...")
            
            // On peut appeler une API ici pour vérifier la transaction
            try {
              const res = await fetch('/api/webhook/flutterwave', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transaction_id: response.transaction_id, user_id: cosmicUser.id })
              })
              
              if (res.ok) {
                toast.success("Abonnement activé avec succès !")
                push('/search') // Rediriger vers la liste des scripts
              } else {
                toast.error("Erreur lors de l'activation. Contactez le support.")
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
  }

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <PageMeta
        title={'Abonnement Premium | Marketplace'}
        description={'Débloquez tous les scripts PHP, applications mobiles et templates avec notre abonnement annuel.'}
      />
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.wrapper}>
            <h1 className={cn('h2', styles.title)}>Passez au niveau supérieur</h1>
            <div className={styles.subtitle}>
              Débloquez des centaines de scripts PHP, templates HTML et applications mobiles de qualité professionnelle.
            </div>
            
            <div className={styles.priceBox}>
              <div className={styles.price}>$15</div>
              <div className={styles.period}>Facturé annuellement</div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px', fontSize: '18px', textAlign: 'left', display: 'inline-block' }}>
              <li style={{ marginBottom: '16px' }}>✅ Accès illimité aux produits Premium</li>
              <li style={{ marginBottom: '16px' }}>✅ Mises à jour gratuites pendant 1 an</li>
              <li style={{ marginBottom: '16px' }}>✅ Support communautaire</li>
              <li>✅ Paiement Mobile Money & Carte Bancaire</li>
            </ul>

            <button
              className={cn('button', styles.button)}
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? 'Chargement...' : 'Souscrire maintenant'}
            </button>
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
