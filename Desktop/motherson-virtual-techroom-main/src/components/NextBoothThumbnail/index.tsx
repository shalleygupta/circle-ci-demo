import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Booth } from "../../types/Booth"
import * as S from "./styled"
import { useEventNavigation } from "../../context/EventNavigationContext"
import { EventContext } from "../../context/EventContext"

export const NextBoothThumbnail: React.FC<
  Booth & { containerProps?: any }
> = props => {
  const navigation = useEventNavigation()
  const event = useContext(EventContext).data

  if (!event || !navigation?.getBoothUrl) return null
  return (
    <S.Container {...(props.containerProps || {})}>
      <S.Overline>Next</S.Overline>
      <S.Name as={Link} to={navigation.getBoothUrl(props.slug)}>
        {props.name} <S.ArrowIcon />
      </S.Name>
    </S.Container>
  )
}
