import React from 'react'
import cn from 'classnames'
import AppLink from '../AppLink'
import Group from './Group'
import Theme from '../Theme'
import Image from '../Image'
import SocialMedia from '../SocialMedia'

import styles from './Footer.module.sass'

const Footers = ({ navigation }) => {
  return (
    <footer className={styles.footer}>
      <div className={cn('container', styles.container)}>
        <div className={styles.row}>
          <div className={styles.col} aria-hidden="true">
            <AppLink className={styles.logo} href="/">
              <Image
                size={{ width: '92px', height: '92px' }}
                className={styles.pic}
                src={navigation['logo']?.imgix_url}
                srcDark={navigation['logo']?.imgix_url}
                alt="Logo"
                objectFit="contain"
              />
            </AppLink>
            <div className={styles.info}>The New Creative Economy.</div>
            <div className={styles.version}>
              <div className={styles.details}>Dark theme</div>
              <Theme className="theme-big" />
            </div>
          </div>
          <div className={styles.col}>
            <Group className={styles.group} item={navigation?.['menu']} />
          </div>
          <div className={styles.col}>
            <AppLink href="/about">
              <p className={styles.category}>À propos</p>
            </AppLink>
            <AppLink href="/search">
              <p className={styles.text}>Rechercher</p>
            </AppLink>
            <AppLink href="/upload-details">
              <p className={styles.text}>Créer un item</p>
            </AppLink>
            <AppLink href="/subscription">
              <p className={styles.text}>Abonnement</p>
            </AppLink>
            <SocialMedia className={styles.form} />
          </div>
        </div>
      </div>
      <div>
        <div className={styles.copyright} aria-hidden="true">
          © {new Date().getFullYear()} Script Marketplace
        </div>
      </div>
    </footer>
  )
}

export default Footers
