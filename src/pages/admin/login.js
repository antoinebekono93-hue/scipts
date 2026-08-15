import React, { useState, useRef, useEffect } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import Loader from '../../components/Loader'
import { PageMeta } from '../../components/Meta'
import { nhost } from '../../lib/nhost'

import styles from '../../styles/pages/Admin.module.sass'

const AdminLogin = () => {
  const { push } = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('login')
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Veuillez remplir tous les champs')
      return
    }
    setLoading(true)
    try {
      let res
      if (mode === 'register') {
        res = await nhost.auth.signUp({ email, password })
        if (res.error && res.error.message?.includes('already')) {
          res = await nhost.auth.signIn({ email, password })
        }
        if (res.error) {
          setError(res.error.message || "Inscription échouée")
          setLoading(false)
          return
        }
      } else {
        res = await nhost.auth.signIn({ email, password })
      }

      if (res.session?.user) {
        localStorage.setItem('adminAuth', JSON.stringify({
          userId: res.session.user.id,
          email: res.session.user.email,
          at: Date.now(),
        }))
        push('/admin/products')
      } else {
        setError(res.error?.message || 'Identifiants incorrects')
      }
    } catch (err) {
      setError('Erreur de connexion')
    }
    setLoading(false)
  }

  return (
    <>
      <PageMeta title="Admin - Connexion" />
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.form}>
            <h1 className={cn('h4', styles.title)}>Administration</h1>
            <p className={styles.hint} style={{ marginBottom: 24 }}>
              {mode === 'login'
                ? 'Connectez-vous avec vos identifiants administrateur.'
                : "Créez votre compte administrateur."}
            </p>
            {error && <p className={styles.hint} style={{ color: '#e74c3c', marginBottom: 16 }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label className={styles.label}>Email</label>
                  <input
                    ref={inputRef}
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Mot de passe</label>
                  <input
                    className={styles.input}
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <div className={styles.btns} style={{ marginTop: 24 }}>
                <button type="submit" className={cn('button', styles.btn)}>
                  {loading ? <Loader /> : mode === 'login' ? 'Se connecter' : "S'inscrire"}
                </button>
              </div>
            </form>
            <p className={styles.hint} style={{ marginTop: 16, textAlign: 'center' }}>
              {mode === 'login' ? (
                <span>
                  Pas encore de compte ?{' '}
                  <button type="button" onClick={() => { setMode('register'); setError('') }} className={styles.linkBtn}>
                    S&apos;inscrire
                  </button>
                </span>
              ) : (
                <span>
                  Déjà un compte ?{' '}
                  <button type="button" onClick={() => { setMode('login'); setError('') }} className={styles.linkBtn}>
                    Se connecter
                  </button>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLogin
