import React, { useContext, useEffect, useState } from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import styled from "styled-components"
//@ts-ignore
import { ReactComponent as Arrow } from "../../../../icons/ic-arrow-top-right.svg"
import { useEventNavigation } from "../../../../context/EventNavigationContext"
import { EventContext } from "../../../../context/EventContext"
import device from "../../../../theme/devices"
import { useHeaderContext } from "../../../../context/EventHeaderContext"
import { SlideInTextAnimation } from "../../../../components/SlideInTextAnimation"
import { useSidebarContext } from "../../../../context/EventSidebarContext"

const Container = styled.div`
  margin: auto 0;
  grid-column: 2 / 6;
  grid-row: 2;
  @media (${device.desktop}) {
    grid-column: 3 / 7;
    grid-row: 2;
  }
  mix-blend-mode: difference;
  color: white;
`

const Title = styled.h1`
  color: inherit;
  margin-bottom: 16px;

  font-size: 34px;
  font-weight: 400;
  line-height: 40px;

  @media (${device.desktop}) {
    font-size: 44px;
    font-weight: 400;
    line-height: 52px;
  }
`

const SLink = styled(Link)<{ visible: boolean }>`
  color: inherit;
  margin-bottom: auto;
  text-decoration: none;

  font-size: 19px;
  font-style: normal;
  font-weight: 300;
  line-height: 29px;
  margin-right: auto;
  svg {
    margin-left: 3px;
    margin-bottom: 2px;
  }
  transition: opacity 750ms ease-out;
  opacity: ${props => (props.visible ? 1 : 0)};

  :hover {
    text-decoration: underline;
  }
`

export const EventHome: React.FC<
  RouteComponentProps<{ slug: string }>
> = props => {
  const navigation = useEventNavigation()
  const event = useContext(EventContext).data!
  const { setHeader } = useHeaderContext()

  useEffect(() => {
    setHeader("", "regular")
  }, [event])

  const [h1Rested, setH1Rested] = useState<boolean>(false)
  const { startSlideIn } = useSidebarContext()
  if (!event) return null
  return (
    <Container>
      <SlideInTextAnimation
        text={`Welcome to ${event.name}`}
        as={Title}
        startDelay={750}
        onRest={() => {
          startSlideIn()
          setTimeout(() => setH1Rested(true), 1200)
        }}
      />
      <SLink
        visible={h1Rested}
        to={navigation.getBoothUrl(event.booths[0].slug)}
      >
        Start tour <Arrow />
      </SLink>
    </Container>
  )
}
