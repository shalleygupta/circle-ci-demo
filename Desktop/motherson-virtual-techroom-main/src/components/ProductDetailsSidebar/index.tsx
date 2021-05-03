import React from "react"
import { Product } from "../../types/Product"
import * as S from "./styled"
import { ThemeProvider } from "styled-components"
import { lightTheme } from "../../theme/light"
//@ts-ignore
import { ReactComponent as Arrow } from "../../icons/ic-arrow-top-right.svg"
import { useEventNavigation } from "../../context/EventNavigationContext"
import { Checkbox } from "../Checkbox"
import { useInterests } from "../../context/InterestsContext"

export const ProductDetailsSidebar: React.FC<{
  product: Product
  next?: Product
  boothName: string
}> = ({ product, boothName, next }) => {
  const { getProductUrl } = useEventNavigation()
  const { products: interests, toggleProduct } = useInterests()
  return (
    <ThemeProvider theme={lightTheme}>
      <S.Container>
        <S.Overline>{boothName}</S.Overline>
        <S.Title>{product.details.name}</S.Title>
        <S.Description
          dangerouslySetInnerHTML={{
            __html: product.details.description || "",
          }}
        />
        <S.RequestMoreInfoContainer
          onClick={() => toggleProduct(product, "This product")}
        >
          <Checkbox
            id={"request"}
            checked={interests[product.parentBoothSlug]?.includes(product.slug)}
          />
          <label htmlFor={"request"}>
            <span>Request more information</span>
          </label>
        </S.RequestMoreInfoContainer>
        {next && (
          <S.NextContainer>
            <S.NextOverline>Next</S.NextOverline>
            <S.NextProductTitle
              to={getProductUrl(next)}
              onClick={() => window.scrollTo({ top: 0 })}
            >
              {next.details.name} <Arrow />
            </S.NextProductTitle>
          </S.NextContainer>
        )}
      </S.Container>
    </ThemeProvider>
  )
}
