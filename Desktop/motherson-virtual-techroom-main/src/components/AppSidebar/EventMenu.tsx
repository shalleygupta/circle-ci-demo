import React, { useContext, useEffect } from "react"
import { EventContext } from "../../context/EventContext"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { useEventNavigation } from "../../context/EventNavigationContext"
import device from "../../theme/devices"
import { useMobileMenuContext } from "../../context/MobileMenuContext"
import { animated, useTrail } from "react-spring"

export const ContentContainer = styled.div`
  padding: 56px 20px 16px 20px;
  flex: 1;

  display: flex;
  flex-direction: column;

  a {
    color: inherit;
    text-decoration-color: transparent;
    transition: text-decoration-color 250ms ease-out;
    :hover {
      text-decoration: underline;
    }

    &.active {
      text-decoration-color: currentColor;
    }
  }

  @media (${device.desktop}) {
    padding-top: 30px;
  }
`

const OL = styled.ol`
  list-style-type: none;
  counter-reset: li;
  padding: 0;
  margin: 50px 0 0;

  > li {
    font-size: 19px;
    font-weight: 300;
    line-height: 26px;
    display: flex;

    :before {
      counter-increment: li;
      content: counter(li, decimal-leading-zero) ".";
      font-size: 9px;
      font-weight: 500;
      line-height: 4px;
      min-width: 17px;
    }

    &:not(:last-child) {
      margin-bottom: 26px;
    }
  }
`

const Footer = styled.div`
  margin-top: auto;
  font-size: 9px;
  font-style: normal;
  line-height: 12px;
  letter-spacing: 0;
  font-weight: 400;
  padding-top: 40px;
  color: rgba(255, 255, 255, 0.6);

  span {
    display: block;
    font-weight: 500;
    color: white;
  }
`

export const Copyright = styled.div`
  margin-top: 20px;

  color: white;
  @media (${device.tablet}) {
    margin-top: 42px;
  }
`

export const EventMenu: React.FC<
  | { withSlideIn: true; startSlideIn: boolean; onRest: () => any }
  | { withSlideIn?: false; startSlideIn?: boolean; onRest?: () => any }
> = props => {
  const eventContext = useContext(EventContext)
  const navigationUtil = useEventNavigation()
  const mobileMenuContext = useMobileMenuContext()

  const [trail, trailRef] = useTrail(
    eventContext?.data?.booths.length || 0,
    () => ({
      immediate: !props.withSlideIn,
      onRest: props.onRest,
      from: {
        transform: "translateX(-100%)",
      },
      to: {
        transform: "translateX(0%)",
      },
    })
  )
  useEffect(() => {
    if (!props.withSlideIn) {
    } else if (props.startSlideIn) trailRef.resume()
    else trailRef.pause()
  }, [props.withSlideIn, props.startSlideIn])

  return (
    <ContentContainer>
      <OL>
        {trail.map((trail, i) => (
          <animated.li key={i} style={trail} onClick={mobileMenuContext.close}>
            <NavLink
              activeClassName={"active"}
              to={navigationUtil.getBoothUrl(eventContext.data!.booths[i].slug)}
            >
              {eventContext.data!.booths[i].name}
            </NavLink>
          </animated.li>
        ))}
      </OL>
      <Footer>
        {eventContext.data?.host && (
          <>
            Exhibition host: <span>{eventContext.data.host}</span>
          </>
        )}
        <Copyright>
          Virtual Techroom - Copyright © Motherson. All rights reserved.
        </Copyright>
      </Footer>
    </ContentContainer>
  )
}
