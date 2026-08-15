import React, { useEffect, useState, useCallback } from 'react'
import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'
import AppLink from '../AppLink'
import { useStateContext } from '../../utils/context/StateContext'

import styles from './Layout.module.sass'
import { Meta, PageMeta } from '../Meta'

const Layout = ({ children, title, navigationPaths }) => {
  const { navigation, setNavigation } = useStateContext()

  useEffect(() => {
    let isMounted = true

    if (
      !navigation?.hasOwnProperty('menu') &&
      navigationPaths?.hasOwnProperty('menu') &&
      isMounted
    ) {
      setNavigation(navigationPaths)
    }

    return () => {
      isMounted = false
    }
  }, [navigation, navigationPaths, setNavigation])

  return (
    <>
      <Meta />
      <PageMeta
        title={'Script Marketplace — Scripts PHP, plugins WordPress, WHMCS et applications premium'}
        description={
          'Téléchargez des scripts PHP, plugins WordPress, modules WHMCS et applications web premium avec un abonnement simple : 10$/3 mois ou 16$/an.'
        }
        path="/"
      />
      <div className={styles.github}>
        <p className={styles.source}>
          Le code source de cette marketplace est{' '}
          <span className={styles.github}>
            <a
              className={styles.github}
              href="https://github.com/antoinebekono93-hue/scipts"
              target="_blank"
              rel="noreferrer"
            >
              disponible sur GitHub
            </a>
          </span>
          .
        </p>
      </div>
      <div className={styles.page}>
        <Header navigation={navigationPaths || navigation} />
        <main className={styles.inner}>{children}</main>
        <Footer navigation={navigationPaths || navigation} />
      </div>
    </>
  )
}

export default Layout
