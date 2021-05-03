import React, { useCallback } from "react"
import {
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
} from "react-router-dom"
import { EventHome } from "./EventHome"
import { EventLayout } from "../../../layout/EventLayout"
import { WithEventNavigationContext } from "../../../context/EventNavigationContext"
import { Booth } from "./Booth"
import { Product } from "./Product"
import { Checkout } from "./Checkout"
import { Product as IProduct } from "../../../types/Product"

export const Event: React.FC<
  RouteComponentProps<{ slug: string; booth: string }>
> = props => {
  console.log(props.match.params)
  const history = useHistory()
  const getBoothUrl = useCallback(
    slug => `/${props.match.params.slug}/scene/${slug}`,
    [props.match.params.slug]
  )
  const navigateToBooth = useCallback(slug => history.push(getBoothUrl(slug)), [
    getBoothUrl,
  ])
  const getProductUrl = useCallback(
    (product: IProduct) =>
      `/${props.match.params.slug}/scene/${product.parentBoothSlug}/${product.slug}`,
    [props.match.params.slug, props.match.params.booth]
  )

  const navigateToProduct = useCallback(
    (product: IProduct) => history.push(getProductUrl(product)),
    [getProductUrl]
  )

  const getCheckoutUrl = useCallback(
    () => `/${props.match.params.slug}/checkout`,
    [props.match.params.slug]
  )
  const navigateToCheckout = useCallback(() => history.push(getCheckoutUrl()), [
    getCheckoutUrl,
  ])

  return (
    <WithEventNavigationContext
      navigateToBooth={navigateToBooth}
      getBoothUrl={getBoothUrl}
      getProductUrl={getProductUrl}
      navigateToProduct={navigateToProduct}
      getCheckoutUrl={getCheckoutUrl}
      navigateToCheckout={navigateToCheckout}
    >
      <EventLayout>
        <Switch>
          <Route component={EventHome} exact path={"/:slug/scene"} />
          <Route component={Booth} exact path={"/:slug/scene/:booth"} />
          <Route
            component={Product}
            exact
            path={"/:slug/scene/:booth/:product"}
          />
          <Route component={Checkout} exact path={"/:slug/checkout"} />
        </Switch>
      </EventLayout>
    </WithEventNavigationContext>
  )
}
