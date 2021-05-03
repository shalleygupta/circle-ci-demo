import React, { useContext, useEffect, useMemo, useState } from "react"
import * as S from "./styled"
//@ts-ignore
import { ReactComponent as Logo } from "../../icons/logo-full.svg"
//@ts-ignore
import { ReactComponent as SmallLogo } from "../../icons/logo-small.svg"
//@ts-ignore
import { ReactComponent as Menu } from "../../icons/ic-menu.svg"
//@ts-ignore
import { ReactComponent as Arrow } from "../../icons/ic-arrow-top-right.svg"
import { useInterests } from "../../context/InterestsContext"
import { useMobileMenuContext } from "../../context/MobileMenuContext"
import { useEventNavigation } from "../../context/EventNavigationContext"
import { EventContext } from "../../context/EventContext"
import { useHeaderContext } from "../../context/EventHeaderContext"
import { PulsatingCircle } from "../AppSidebar/styled"

export const AppHeader: React.FC<{
  collapsed?: boolean
}> = ({ collapsed }) => {
  const { title, style: headerStyle } = useHeaderContext()
  const interests = useInterests().products
  const count = useMemo(
    () =>
      Object.values(interests).reduce((prev, curr) => prev + curr.length, 0),
    [interests]
  )

  const [pulsating, setPulsating] = useState<boolean>(false)
  useEffect(() => {
    if (count === 0) setPulsating(false)
    else {
      setPulsating(true)
      const timeout = setTimeout(() => setPulsating(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [count])

  const event = useContext(EventContext)
  const mobileMenu = useMobileMenuContext()
  const navigation = useEventNavigation()
  return (
    <S.Container
      collapsed={collapsed}
      headerStyle={mobileMenu.open ? "regular" : headerStyle || "regular"}
      sidebarVisibleOnMobile={mobileMenu.open}
    >
      <S.MenuButton onClick={mobileMenu.toggle} open={mobileMenu.open}>
        {!mobileMenu.open ? (
          <Menu />
        ) : (
          <>
            <Arrow />
            Close
          </>
        )}
      </S.MenuButton>
      <S.CounterButton
        open={mobileMenu.open}
        onClick={() => {
          mobileMenu.close()
          navigation.navigateToCheckout()
        }}
      >
        <S.Counter dark={!mobileMenu.open && headerStyle === "contrast"}>
          {count}
          <PulsatingCircle visible={pulsating} />
        </S.Counter>
        <span>Information Request Package</span>
      </S.CounterButton>
      <S.ExitButton
        open={mobileMenu.open}
        onClick={() => {
          mobileMenu.close()
          event.setEvent({
            //@ts-ignore
            slug: undefined,
            code: undefined,
            data: undefined,
            status: "reset",
          })
        }}
      >
        Exit
        <br /> Showroom
      </S.ExitButton>
      <S.Title>{title}</S.Title>
      <Logo
        onClick={() => navigation.navigateToBooth("")}
        style={{ cursor: "pointer", width: "123px" }}
      />
      <SmallLogo />
    </S.Container>
  )
}
