import React, { useState, useCallback, useEffect, useRef } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import AppLink from '../AppLink'
import Loader from '../Loader'
import registerFields from '../../utils/constants/registerFields'
import { useStateContext } from '../../utils/context/StateContext'
import { setToken } from '../../utils/token'
import { nhost } from '../../lib/nhost'

import styles from './OAuth.module.sass'

const OAuth = ({ className, handleClose, handleOAuth, disable, redirectToSubscription }) => {
  const { setCosmicUser } = useStateContext()
  const { push } = useRouter()

  const [{ email, password }, setFields] = useState(() => registerFields)
  const [fillFiledMessage, setFillFiledMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('login')

  const inputElement = useRef(null)

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus()
    }
  }, [disable])

  const handleGoHome = () => {
    push('/')
  }

  const handleChange = ({ target: { name, value } }) =>
    setFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }))

  const submitForm = useCallback(
    async e => {
      e.preventDefault()
      fillFiledMessage?.length && setFillFiledMessage('')
      setLoading(true)
      if (email && password) {
        let res
        if (mode === 'register') {
          res = await nhost.auth.signUp({ email, password })
          if (res.error) {
            setFillFiledMessage(res.error.message || 'Inscription échouée')
            setLoading(false)
            return
          }
          if (res.needsEmailVerification) {
            setFillFiledMessage('Compte créé ! Vérifiez votre email pour activer votre compte.')
            setLoading(false)
            return
          }
        } else {
          res = await nhost.auth.signIn({ email, password })
        }

        if (res.session?.user) {
          const user = res.session.user
          const mappedUser = {
            id: user.id,
            first_name: user.displayName || email.split('@')[0],
            avatar_url: user.avatarUrl,
          }
          setCosmicUser(mappedUser)
          setToken(mappedUser)

          setFillFiledMessage('Connexion réussie !')
          handleOAuth(mappedUser)
          setFields(registerFields)

          if (redirectToSubscription) {
            push('/subscription')
          } else {
            handleClose()
          }
        } else {
          setFillFiledMessage(res.error?.message || 'Identifiants incorrects')
        }
      } else {
        setFillFiledMessage('Veuillez remplir tous les champs')
      }
      setLoading(false)
    },
    [
      fillFiledMessage?.length,
      email,
      password,
      mode,
      setCosmicUser,
      handleOAuth,
      handleClose,
      push,
      redirectToSubscription,
    ]
  )

  const toggleMode = () => {
    setMode(prev => (prev === 'login' ? 'register' : 'login'))
    setFillFiledMessage('')
  }

  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn('h4', styles.title)}>
        {mode === 'login' ? 'Connexion' : 'Inscription'}
      </div>
      <div className={styles.text}>
        {mode === 'login'
          ? 'Connectez-vous à votre compte pour accéder au catalogue.'
          : 'Créez un compte pour télécharger des scripts et applications.'}
      </div>
      <div className={styles.error}>{fillFiledMessage}</div>
      <form className={styles.form} action="submit" onSubmit={submitForm}>
        <div className={styles.field}>
          <input
            ref={inputElement}
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={email}
            required
          />
        </div>
        <div className={styles.field}>
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            value={password}
            required
          />
        </div>
        <div className={styles.btns}>
          <button type="submit" className={cn('button', styles.button)}>
            {loading ? <Loader /> : mode === 'login' ? 'Se connecter' : "S'inscrire"}
          </button>
          <button
            onClick={disable ? handleGoHome : handleClose}
            className={cn('button-stroke', styles.button)}
          >
            {disable ? 'Retour à l\'accueil' : 'Annuler'}
          </button>
        </div>
      </form>
      <div className={styles.toggle}>
        {mode === 'login' ? (
          <span>
            Pas encore de compte ?{' '}
            <button type="button" className={styles.toggleBtn} onClick={toggleMode}>
              S&apos;inscrire
            </button>
          </span>
        ) : (
          <span>
            Déjà un compte ?{' '}
            <button type="button" className={styles.toggleBtn} onClick={toggleMode}>
              Se connecter
            </button>
          </span>
        )}
      </div>
    </div>
  )
}

export default OAuth
