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

const OAuth = ({ className, handleClose, handleOAuth, disable }) => {
  const { setCosmicUser } = useStateContext()
  const { push } = useRouter()

  const [{ email, password }, setFields] = useState(() => registerFields)
  const [fillFiledMessage, setFillFiledMessage] = useState('')
  const [loading, setLoading] = useState(false)

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
      if ((email, password)) {
        // Try sign in
        let res = await nhost.auth.signIn({ email, password })
        if (res.error && res.error.message.includes('not found')) {
          res = await nhost.auth.signUp({ email, password })
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

          setFillFiledMessage('Congrats!')
          handleOAuth(mappedUser)
          setFields(registerFields)
          handleClose()
        } else {
          setFillFiledMessage(res.error?.message || 'Authentication failed')
        }
      } else {
        setFillFiledMessage('Please fill all fields')
      }
      setLoading(false)
    },
    [
      fillFiledMessage?.length,
      email,
      password,
      setCosmicUser,
      handleOAuth,
      handleClose,
    ]
  )

  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn('h4', styles.title)}>
        Authentication with Nhost
      </div>
      <div className={styles.text}>
        To create an item you need to register or log in.
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
            placeholder="Password"
            onChange={handleChange}
            value={password}
            required
          />
        </div>
        <div className={styles.btns}>
          <button type="submit" className={cn('button', styles.button)}>
            {loading ? <Loader /> : 'Continue'}
          </button>
          <button
            onClick={disable ? handleGoHome : handleClose}
            className={cn('button-stroke', styles.button)}
          >
            {disable ? 'Return Home Page' : 'Cancel'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default OAuth
