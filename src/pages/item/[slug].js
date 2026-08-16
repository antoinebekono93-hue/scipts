import React, { useState, useCallback, useEffect } from 'react'
import cn from 'classnames'
import toast from 'react-hot-toast'
import { useStateContext } from '../../utils/context/StateContext'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import HotBid from '../../components/HotBid'
import Discover from '../../screens/Home/Discover'
import Dropdown from '../../components/Dropdown'
import Modal from '../../components/Modal'
import OAuth from '../../components/OAuth'
import Image from '../../components/Image'
import {
  nhost,
  getDataBySlug,
  getAllDataByType,
  getDataByCategory,
} from '../../lib/nhost'
import getStripe from '../../lib/getStripe'
import { PageMeta, JsonLd } from '../../components/Meta'
import {
  buildProductJsonLd,
  buildBreadcrumbJsonLd,
  productImageUrl,
  truncate,
} from '../../lib/seo'

import styles from '../../styles/pages/Item.module.sass'

const Item = ({ itemInfo, categoriesGroup, navigationItems }) => {
  const { onAdd, cartItems, cosmicUser } = useStateContext()
  const { push } = useRouter()

  const [activeIndex, setActiveIndex] = useState(0)
  const [activeImage, setActiveImage] = useState(0)
  const [visibleAuthModal, setVisibleAuthModal] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const product = itemInfo?.[0]
  const categoryTitle = product?.category_id
    ? categoriesGroup?.type?.[product.category_id] || null
    : null

  const pageTitle = product
    ? `${product.title} — Scripts et applications | Script Marketplace`
    : 'Produit | Script Marketplace'
  const pageDescription = product
    ? truncate(product.description || product.metadata?.description)
    : 'Découvrez ce produit du catalogue Script Marketplace.'
  const pageImage = product ? productImageUrl(product) : null
  const productJsonLd = product ? buildProductJsonLd(product) : null
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    ...(categoryTitle ? [{ name: categoryTitle, path: `/search?category=${product.category_id}` }] : []),
    { name: product?.title || 'Produit', path: `/item/${product?.slug}` },
  ])

  useEffect(() => {
    async function checkSub() {
      if (cosmicUser?.id) {
        try {
          const { data } = await nhost.graphql.request(`
            query {
              user_profiles_by_pk(id: "${cosmicUser.id}") {
                has_active_subscription
                subscription_end_date
              }
            }
          `)
          if (data?.user_profiles_by_pk?.has_active_subscription) {
            const endDate = new Date(data.user_profiles_by_pk.subscription_end_date)
            if (endDate > new Date()) {
              setIsSubscribed(true)
            }
          }
        } catch (err) {
          console.error(err)
        }
      }
    }
    checkSub()
  }, [cosmicUser])

  const handleAddToCart = () => {
    cosmicUser?.hasOwnProperty('id') ? handleCheckout() : handleOAuth()
  }

  const handleOAuth = useCallback(
    async user => {
      !cosmicUser.hasOwnProperty('id') && setVisibleAuthModal(true)

      if (!user && !user?.hasOwnProperty('id')) return
    },
    [cosmicUser]
  )

  const handleCheckout = async () => {
    const addCart = await onAdd(itemInfo[0], 1)

    if (addCart?.length) {
      const stripe = await getStripe()

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addCart),
      })

      if (!response.ok) return

      const data = await response.json()
      toast.loading('Redirecting...', {
        position: 'bottom-right',
      })

      stripe.redirectToCheckout({ sessionId: data.id })
    }
  }

  const handleDownload = async () => {
    try {
      const token = nhost.auth.getAccessToken()
      const res = await fetch(`/api/download/${itemInfo[0]?.slug}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })

      if (res.status === 401) {
        toast.error('Veuillez vous connecter')
        handleOAuth()
        return
      }
      if (res.status === 403) {
        toast.error('Un abonnement actif est requis')
        push('/subscription')
        return
      }
      if (!res.ok) {
        toast.error('Erreur de téléchargement')
        return
      }

      const contentType = res.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        const data = await res.json()
        if (data?.externalUrl) {
          window.open(data.externalUrl, '_blank')
          return
        }
        toast.error('Erreur de téléchargement')
        return
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download =
        res.headers
          .get('content-disposition')
          ?.match(/filename="?([^"]+)"?/)?.[1] || `${itemInfo[0]?.slug || 'download'}`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
      toast.error('Erreur réseau')
    }
  }

  const gallery =
    Array.isArray(itemInfo[0]?.metadata?.gallery) &&
    itemInfo[0]?.metadata?.gallery.length > 0
      ? itemInfo[0]?.metadata?.gallery
      : [{ url: itemInfo[0]?.metadata?.image?.imgix_url }]

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <PageMeta
        title={pageTitle}
        description={pageDescription}
        image={pageImage}
        path={`/item/${product?.slug || ''}`}
        type="product"
      />
      <JsonLd data={[productJsonLd, breadcrumbJsonLd]} />
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.bg}>
            <div className={styles.preview}>
              <div className={styles.categories}>
                <div className={cn('status-purple', styles.category)}>
                  {itemInfo[0]?.metadata?.color}
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  size={{ width: '100%', height: '100%' }}
                  srcSet={`${gallery[activeImage]?.url}`}
                  src={gallery[activeImage]?.url}
                  alt="Item"
                  objectFit="cover"
                />
              </div>
              {gallery.length > 1 && (
                <div className={styles.gallery}>
                  {gallery.map((img, index) => (
                    <button
                      type="button"
                      key={index}
                      className={cn(
                        styles.galleryItem,
                        index === activeImage && styles.galleryActive
                      )}
                      onClick={() => setActiveImage(index)}
                    >
                      <Image
                        size={{ width: '100%', height: '100%' }}
                        src={img.url}
                        alt={`Image ${index + 1}`}
                        objectFit="cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.details}>
            <h1 className={cn('h3', styles.title)}>{itemInfo[0]?.title}</h1>
            <div className={styles.cost}>
              <div className={cn('status-stroke-green', styles.price)}>
                {`$${itemInfo[0]?.metadata?.price}`}
              </div>
              <div className={styles.counter}>
                {itemInfo[0]?.metadata?.count > 0
                  ? `${itemInfo[0]?.metadata?.count} in stock`
                  : 'Not Available'}
              </div>
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productInfoRow}>
                <span className={styles.productInfoLabel}>Auteur</span>
                <span className={styles.productInfoValue}>
                  {itemInfo[0]?.metadata?.author || 'Script Marketplace'}
                </span>
              </div>
              <div className={styles.productInfoRow}>
                <span className={styles.productInfoLabel}>Téléchargements</span>
                <span className={styles.productInfoValue}>
                  {(itemInfo[0]?.metadata?.downloads || 0).toLocaleString('fr-FR')}
                </span>
              </div>
              <div className={styles.productInfoRow}>
                <span className={styles.productInfoLabel}>Vues</span>
                <span className={styles.productInfoValue}>
                  {(itemInfo[0]?.metadata?.views || 0).toLocaleString('fr-FR')}
                </span>
              </div>
              <div className={styles.productInfoRow}>
                <span className={styles.productInfoLabel}>Première sortie</span>
                <span className={styles.productInfoValue}>
                  {itemInfo[0]?.metadata?.first_release || '—'}
                </span>
              </div>
              <div className={styles.productInfoRow}>
                <span className={styles.productInfoLabel}>Dernière mise à jour</span>
                <span className={styles.productInfoValue}>
                  {itemInfo[0]?.metadata?.last_update || '—'}
                </span>
              </div>
              <div className={styles.productInfoRow}>
                <span className={styles.productInfoLabel}>Note</span>
                <span className={styles.productInfoValue}>
                  <span className={styles.stars}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        className={cn(
                          styles.star,
                          star <= (itemInfo[0]?.metadata?.rating || 0) && styles.starFilled
                        )}
                      >
                        ★
                      </span>
                    ))}
                  </span>
                  <span className={styles.ratingCount}>
                    {itemInfo[0]?.metadata?.rating_count || 0} avis
                  </span>
                </span>
              </div>
            </div>
            <div className={styles.actions}>
              <div className={styles.btns}>
                {(!itemInfo[0]?.metadata?.is_premium || isSubscribed) ? (
                  <button
                    className={cn('button', styles.button)}
                    onClick={() => {
                      if (!cosmicUser?.id) {
                        handleOAuth()
                      } else {
                        handleDownload()
                      }
                    }}
                  >
                    Télécharger le Fichier
                  </button>
                ) : (
                  <button
                    className={cn('button', styles.button)}
                    onClick={() => push('/subscription')}
                  >
                    Débloquer Premium (16$/3 mois ou 25$/an)
                  </button>
                )}
                {itemInfo[0]?.metadata?.demo_url && (
                  <button
                    className={cn('button-stroke', styles.button)}
                    onClick={() =>
                      window.open(itemInfo[0]?.metadata?.demo_url, '_blank')
                    }
                  >
                    Voir la Démo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {itemInfo[0]?.metadata?.description && (
          <div className={cn('container', styles.container)}>
            <div className={styles.description}>
              <h2 className={cn('h3', styles.descTitle)}>Description</h2>
              <div className={styles.descContent}>
                {itemInfo[0]?.metadata?.description}
              </div>
            </div>
          </div>
        )}
        <HotBid classSection="section" info={categoriesGroup['groups'][0]} />
        <Discover
          info={categoriesGroup['groups']}
          type={categoriesGroup['type']}
        />
      </div>
      <Modal
        visible={visibleAuthModal}
        onClose={() => setVisibleAuthModal(false)}
      >
        <OAuth
          className={styles.steps}
          handleOAuth={handleOAuth}
          handleClose={() => setVisibleAuthModal(false)}
          redirectToSubscription={true}
        />
      </Modal>
    </Layout>
  )
}

export default Item

export async function getServerSideProps({ params }) {
  const itemInfo = await getDataBySlug(params.slug)

  const navigationItems = (await getAllDataByType('navigation')) || []
  const categoryTypes = (await getAllDataByType('categories')) || []
  const categoriesData = await Promise.all(
    categoryTypes?.map(category => {
      return getDataByCategory(category?.id)
    })
  )

  const categoriesGroups = categoryTypes?.map(({ id }, index) => {
    return { [id]: categoriesData[index] }
  })

  const categoriesType = categoryTypes?.reduce((arr, { title, id }) => {
    return { ...arr, [id]: title }
  }, {})

  const categoriesGroup = { groups: categoriesGroups, type: categoriesType }

  if (!itemInfo) {
    return {
      notFound: true,
    }
  }

  return {
    props: { itemInfo, navigationItems, categoriesGroup },
  }
}
