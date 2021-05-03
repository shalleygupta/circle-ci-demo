import React, { useEffect } from "react"
import { Product as IProduct } from "../../types/Product"
import * as S from "./styled"
import { DatoCmsAsset } from "../DatoCmsAsset"
import { useInView } from "react-intersection-observer"
import { useEventNavigation } from "../../context/EventNavigationContext"
import { ThemeProvider } from "styled-components"
import { lightTheme } from "../../theme/light"
import { useInterests } from "../../context/InterestsContext"
import { Checkbox } from "../Checkbox"
import { darkTheme } from "../../theme/dark"
import { useMedia } from "use-media"
import { size } from "../../theme/devices"

export const ProductThumbnail: React.FC<
  IProduct & {
    onVisible: (visible: boolean) => any
    overline: string
    slug: string
  }
> = props => {
  const isTablet = useMedia({ minWidth: size.tablet })
  const { ref, inView } = useInView({
    threshold: isTablet ? 1 : 0.5,
    initialInView: false,
  })
  useEffect(() => {
    props.onVisible(inView)
  }, [inView])
  const navigation = useEventNavigation()
  const interests = useInterests()
  return (
    <S.Container ref={ref} onClick={() => navigation.navigateToProduct(props)}>
      <ThemeProvider theme={darkTheme}>
        <S.AssetWrapper>
          {props.thumbnail.media && (
            <DatoCmsAsset asset={props.thumbnail.media} />
          )}
          <S.InterestCheckWrapper
            onClick={e => {
              e.stopPropagation()
              interests.toggleProduct(props, props.thumbnail.name)
            }}
          >
            <Checkbox
              id={props.slug}
              checked={
                !!interests.products[props.parentBoothSlug]?.includes(
                  props.slug
                )
              }
            />
            <label htmlFor={props.slug}>
              <span>Add to request list</span>
            </label>
          </S.InterestCheckWrapper>
        </S.AssetWrapper>
      </ThemeProvider>
      <ThemeProvider theme={lightTheme}>
        <S.Details>
          <S.Overline>{props.overline}</S.Overline>
          <S.Title>{props.thumbnail.name}</S.Title>
          <S.ArrowIcon />
        </S.Details>
      </ThemeProvider>
    </S.Container>
  )
}
