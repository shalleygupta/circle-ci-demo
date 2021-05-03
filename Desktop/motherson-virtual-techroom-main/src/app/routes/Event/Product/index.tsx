import React, { useContext, useEffect, useMemo } from "react"
import { RouteComponentProps } from "react-router-dom"
import { EventContext } from "../../../../context/EventContext"
import { ProductDetailsSidebar } from "../../../../components/ProductDetailsSidebar"
import { ProductAttachments } from "../../../../components/ProductAttachments"
import { useSidebarContext } from "../../../../context/EventSidebarContext"
import { useEventNavigation } from "../../../../context/EventNavigationContext"
import { createGlobalStyle } from "styled-components"

const GlobalProductStyles = createGlobalStyle`
html {
  overflow-y: scroll;
}
`

export const Product: React.FC<
  RouteComponentProps<{ booth: string; product: string }>
> = ({
  match: {
    params: { booth: boothSlug, product: productSlug },
  },
}) => {
  const event = useContext(EventContext)?.data
  const sidebarContext = useSidebarContext()
  const navigationContext = useEventNavigation()

  useEffect(() => {
    sidebarContext.setCollapsed(true)
    return () => sidebarContext.setCollapsed(false)
  }, [])
  useEffect(() => {
    sidebarContext.setExitAction({
      label: "Back",
      onClick: () => navigationContext.navigateToBooth(boothSlug),
    })

    return () => sidebarContext.setExitAction()
  }, [boothSlug])
  if (!event) return null

  const [booth, product] = useMemo(() => {
    const booth = event.booths.find(b => b.slug === boothSlug)

    return [booth, booth?.products.find(p => p.slug === productSlug)]
  }, [event, productSlug, boothSlug])

  if (!product || !booth) return null

  let next =
    booth.products[booth.products.findIndex(p => p.slug === product.slug) + 1]

  if (!next) {
    next =
      event.booths[event.booths.findIndex(b => b.slug === boothSlug) + 1]
        ?.products[0]
  }

  let previous =
    booth.products[booth.products.findIndex(p => p.slug === product.slug) - 1]
  if (!previous) {
    const prevBooth =
      event.booths[event.booths.findIndex(b => b.slug === boothSlug) - 1]
    if (prevBooth) previous = prevBooth?.products[prevBooth.products.length - 1]
  }

  return (
    <>
      <GlobalProductStyles />
      <ProductDetailsSidebar
        product={product}
        boothName={booth.name}
        next={next}
      />
      <ProductAttachments previous={previous} {...product.details} />
    </>
  )
}
