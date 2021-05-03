import React, { useCallback, useContext, useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { EventContext } from "../../../../context/EventContext"
import * as S from "./styled"
import { DatoCmsAsset } from "../../../../components/DatoCmsAsset"
import { useHeaderContext } from "../../../../context/EventHeaderContext"

export const Booth: React.FC<
  RouteComponentProps<{ booth: string }>
> = props => {
  const booths = useContext(EventContext).data?.booths!
  const booth = booths?.find(b => b.slug === props.match.params.booth)
  const [[, viewed], setProgress] = useState<[number, number]>([0, 0])
  const { setHeader } = useHeaderContext()

  useEffect(() => {
    setHeader(booth?.name || "", "regular")
  }, [booth])

  const [
    productsAnimationRested,
    _setProductsAnimationRested,
  ] = useState<boolean>(false)
  const setProductsAnimationRested = useCallback(
    () => setTimeout(() => _setProductsAnimationRested(true), 250),
    [_setProductsAnimationRested]
  )

  if (!booth) return null

  const nextBooth = booths[booths.findIndex(b => b.slug === booth.slug) + 1]

  return (
    <>
      <S.VideoContainer>
        {booth.poster.media && <DatoCmsAsset asset={booth.poster.media} />}
        <span>{booth.name}</span>
      </S.VideoContainer>
      <S.ProductList
        boothName={booth.name}
        onProductProgress={(count: number, scroll: number) =>
          setProgress([scroll, count])
        }
        next={nextBooth || undefined}
        products={booth.products}
        onAnimationRest={setProductsAnimationRested}
      />
      <S.Progress
        visible={productsAnimationRested}
        total={booth.products.length}
        viewed={viewed}
      />
    </>
  )
}
