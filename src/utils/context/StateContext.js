import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { toast } from 'react-hot-toast'
import { nhost } from '../../lib/nhost'

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

  const onCategoriesChange = useCallback(content => {
    setCategories(prevFields => ({ ...prevFields, ...content }))
  }, [])

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(item => item._id === product._id)

    setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity)

    toast.success(`${quantity} of ${product.title} added to the cart.`, {
      position: 'bottom-right',
    })

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map(cartProduct => {
        if (cartProduct._id === product._id)
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
    const foundProduct = cartItems.find(item => item._id === product._id)
    const newCartItems = cartItems.filter(item => item._id !== product._id)

    setTotalPrice(
      prevTotalPrice =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
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