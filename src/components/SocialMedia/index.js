import {
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiLinkedin,
  FiSlack,
} from 'react-icons/fi'
import AppLink from '../AppLink'

import styles from './SocialMedia.module.sass'

const socialMedia = [
  {
    Icon: FiTwitter,
    url: 'https://github.com/antoinebekono93-hue/scipts',
  },
  {
    Icon: FiFacebook,
    url: 'https://github.com/antoinebekono93-hue/scipts',
  },
  {
    Icon: FiLinkedin,
    url: 'https://github.com/antoinebekono93-hue/scipts',
  },
  {
    Icon: FiYoutube,
    url: 'https://github.com/antoinebekono93-hue/scipts',
  },
  {
    Icon: FiSlack,
    url: 'https://github.com/antoinebekono93-hue/scipts',
  },
]

const SocialMedia = () => {
  return (
    <div className={styles.social}>
      {socialMedia?.map(({ Icon, url }, index) => (
        <AppLink key={index} target="_blank" href={url}>
          <Icon className={styles.icon} />
        </AppLink>
      ))}
    </div>
  )
}

export default SocialMedia
