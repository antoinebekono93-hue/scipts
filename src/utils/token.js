import { APP_KEY } from './constants/appConstants'

export const setToken = token => {
  if (typeof window !== 'undefined' && token) {
    localStorage.setItem(APP_KEY, JSON.stringify(token))
  }
}

export const getToken = () => {
  if (typeof window === 'undefined') return null

  const tokenLocalStorage = localStorage.getItem(`${APP_KEY}`)
  return tokenLocalStorage ? JSON.parse(tokenLocalStorage) : null
}

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(APP_KEY)
  }
}
