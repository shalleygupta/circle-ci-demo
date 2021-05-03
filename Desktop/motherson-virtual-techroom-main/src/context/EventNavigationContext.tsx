import React, { useContext } from "react"
import { Product } from "../types/Product"

type ContextType = {
  navigateToBooth: (slug: string) => any
  getBoothUrl: (slug: string) => string
  getProductUrl: (product: Product) => string
  navigateToProduct: (product: Product) => any
  getCheckoutUrl: () => string
  navigateToCheckout: () => any
}

const EventNavigationContext = React.createContext<ContextType>({
  navigateToBooth: () => null,
  getBoothUrl: () => "",
  getProductUrl: () => "",
  navigateToProduct: () => "",
  getCheckoutUrl: () => "",
  navigateToCheckout: () => null,
})

export const useEventNavigation = () => useContext(EventNavigationContext)

export const WithEventNavigationContext: React.FC<ContextType> = ({
  children,
  ...props
}) => {
  return (
    <EventNavigationContext.Provider value={props}>
      {children}
    </EventNavigationContext.Provider>
  )
}
