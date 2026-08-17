import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { toast } from 'react-hot-toast'
import { useAuthenticationStatus, useUserData } from '@nhost/nextjs'
import { nhost } from '../../lib/nhost'
import { setToken, removeToken } from '../token'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [navigation, setNavigation] = useState([])
  const [cosmicUser, setCosmicUser] = useState({})
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [categories, setCategories] = useState({
    groups: [],
    types: {},
  })
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false)
  const [subscriptionPlan, setSubscriptionPlan] = useState('free')
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null)

  const { isAuthenticated, isLoading } = useAuthenticationStatus()
  const nhostUser = useUserData()

  useEffect(() => {
    if (isLoading) return

    if (isAuthenticated && nhostUser?.id) {
      const rawName = nhostUser.displayName || ''
      const isEmail = rawName.includes('@')
      const mappedUser = {
        id: nhostUser.id,
        first_name:
          (!isEmail && rawName) || nhostUser.email?.split('@')[0] || 'User',
        avatar_url: nhostUser.avatarUrl || null,
        email: nhostUser.email || '',
      }
      setCosmicUser(mappedUser)
      setToken(mappedUser)
    } else if (!isAuthenticated) {
      setCosmicUser({})
      removeToken()
    }
  }, [isAuthenticated, isLoading, nhostUser])

  const onCategoriesChange = useCallback(content => {
    setCategories(prevFields => ({ ...prevFields, ...content }))
  }, [])

  const getProductId = product => product?.id ?? product?._id
  const getPrice = product => Number(product?.metadata?.price ?? product?.price) || 0

  const onAdd = (product, quantity = 1) => {
    const productId = getProductId(product)
    const price = getPrice(product)
    const checkProductInCart = cartItems.find(item => getProductId(item) === productId)

    setTotalPrice(prevTotalPrice => prevTotalPrice + price * quantity)
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity)

    toast.success(`${quantity} of ${product.title} added to the cart.`, {
      position: 'bottom-right',
    })

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map(cartProduct => {
        if (getProductId(cartProduct) === productId)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          }
        return cartProduct
      })

      setCartItems(updatedCartItems)
      return updatedCartItems
    } else {
      const newProduct = { ...product, quantity }

      setCartItems([...cartItems, newProduct])
      return [...cartItems, newProduct]
    }
  }

  const onRemove = product => {
    const productId = getProductId(product)
    const foundProduct = cartItems.find(item => getProductId(item) === productId)
    const newCartItems = cartItems.filter(item => getProductId(item) !== productId)

    setTotalPrice(
      prevTotalPrice => prevTotalPrice - getPrice(foundProduct) * foundProduct.quantity
    )
    setTotalQuantities(
      prevTotalQuantities => prevTotalQuantities - foundProduct.quantity
    )
    setCartItems(newCartItems)
  }

  const refreshSubscription = useCallback(async (userId) => {
    if (!userId) return
    try {
      const { data, error } = await nhost.graphql.request(`
        query GetProfile($user_id: uuid!) {
          user_profiles_by_pk(id: $user_id) {
            has_active_subscription
            subscription_plan
            subscription_end_date
          }
        }
      `, { user_id: userId })
      
      if (error) {
        console.error('Erreur refresh subscription:', error)
        return
      }
      
      if (data?.user_profiles_by_pk) {
        const profile = data.user_profiles_by_pk
        const isActive = profile.has_active_subscription && 
          profile.subscription_end_date && 
          new Date(profile.subscription_end_date) > new Date()
        
        setHasActiveSubscription(isActive)
        setSubscriptionPlan(profile.subscription_plan || 'free')
        setSubscriptionEndDate(profile.subscription_end_date)
      }
    } catch (err) {
      console.error('Erreur refresh subscription:', err)
    }
  }, [])

  useEffect(() => {
    if (cosmicUser?.id) {
      refreshSubscription(cosmicUser.id)
    }
  }, [cosmicUser?.id, refreshSubscription])

  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantities,
        onAdd,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        categories,
        onCategoriesChange,
        navigation,
        setNavigation,
        cosmicUser,
        setCosmicUser,
        hasActiveSubscription,
        subscriptionPlan,
        subscriptionEndDate,
        refreshSubscription,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)