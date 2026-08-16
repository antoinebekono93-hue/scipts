import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useStateContext } from '../utils/context/StateContext'
import Layout from '../components/Layout'
import {
  Intro,
  Selection,
  Partners,
  HotBid,
  Categories,
  Discover,
  Description,
} from '../screens/Home'
import chooseBySlug from '../utils/chooseBySlug'
import { getDataByCategory, getAllDataByType } from '../lib/nhost'

import styles from '../styles/pages/Search.module.sass'
import { PageMeta, JsonLd } from '../components/Meta'
import { buildItemListJsonLd, DEFAULT_DESCRIPTION } from '../lib/seo'

const Home = ({
  reviews,
  landing,
  categoriesGroup,
  categoryTypes,
  navigationItems,
}) => {
  const { categories, onCategoriesChange, setNavigation, cosmicUser, hasActiveSubscription } = useStateContext()
  const { push } = useRouter()

  const featuredProducts = Object.values(categoriesGroup?.groups || {})
    .flatMap(group => group)
    .slice(0, 12)
  const homeJsonLd = buildItemListJsonLd(featuredProducts, '/')

  const handleContextAdd = useCallback(
    (category, data, navigation) => {
      onCategoriesChange({ groups: category, type: data })
      setNavigation(navigation)
    },
    [onCategoriesChange, setNavigation]
  )

  useEffect(() => {
    let isMounted = true

    if (!categories['groups']?.length && isMounted) {
      handleContextAdd(
        categoriesGroup?.groups,
        categoriesGroup?.type,
        navigationItems[0]?.metadata
      )
    }

    return () => {
      isMounted = false
    }
  }, [
    categories,
    categoriesGroup,
    categoryTypes,
    handleContextAdd,
    navigationItems,
  ])

  const showPremiumCTA = !cosmicUser?.id || !hasActiveSubscription

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <PageMeta
        title="Script Marketplace — Scripts PHP, plugins WordPress, WHMCS et applications premium"
        description={DEFAULT_DESCRIPTION}
        path="/"
      />
      <JsonLd data={homeJsonLd} />
      <Description info={chooseBySlug(landing, 'marketing')} />
      <HotBid classSection="section" info={categoriesGroup['groups'][0]} />
      <Categories
        info={categoriesGroup['groups']}
        type={categoriesGroup['type']}
      />
      <Selection info={categoriesGroup['groups']} type={categoryTypes} />
      <Intro info={chooseBySlug(landing, 'introduction')} />
      {showPremiumCTA && (
        <section className="premium-cta-section">
          <div className="container">
            <div className="premium-cta-card">
              <div className="premium-cta-icon">★</div>
              <h2 className="premium-cta-title">Débloquez TOUT le catalogue Premium</h2>
              <p className="premium-cta-desc">
                Accédez à des milliers de scripts PHP, plugins WordPress, templates HTML et applications exclusives.
              </p>
              <div className="premium-cta-plans">
                <button 
                  className="premium-cta-btn quarterly"
                  onClick={() => push('/subscription')}
                >
                  <span className="plan-name">Trimestriel</span>
                  <span className="plan-price">16$</span>
                  <span className="plan-period">/ 3 mois</span>
                </button>
                <button 
                  className="premium-cta-btn annual"
                  onClick={() => push('/subscription')}
                >
                  <span className="plan-badge">-61%</span>
                  <span className="plan-name">Annuel</span>
                  <span className="plan-price">25$</span>
                  <span className="plan-period">/ an</span>
                </button>
              </div>
              <p className="premium-cta-note">Renouvellement automatique • Annulable à tout moment</p>
            </div>
          </div>
        </section>
      )}
      <Partners info={reviews} />
      <Discover
        info={categoriesGroup['groups']}
        type={categoriesGroup['type']}
      />
    </Layout>
  )
}

export default Home

export async function getServerSideProps() {
  const reviews = (await getAllDataByType('reviews')) || []
  const landing = (await getAllDataByType('landings')) || []
  const categoryTypes = (await getAllDataByType('categories')) || []
  const categoriesData = await Promise.all(
    categoryTypes?.map(category => {
      return getDataByCategory(category?.id)
    })
  )
  const navigationItems = (await getAllDataByType('navigation')) || []

  const categoriesGroups = categoryTypes?.map(({ id }, index) => {
    return { [id]: categoriesData[index] }
  })

  const categoriesType = categoryTypes?.reduce((arr, { title, id }) => {
    return { ...arr, [id]: title }
  }, {})

  const categoriesGroup = { groups: categoriesGroups, type: categoriesType }

  return {
    props: {
      reviews,
      landing,
      categoriesGroup,
      categoryTypes,
      navigationItems,
    },
  }
}
