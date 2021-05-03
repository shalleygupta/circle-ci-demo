import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import * as S from "./styled"

//@ts-ignore
import { ReactComponent as Menu } from "../../icons/ic-menu.svg"
import { EventMenu } from "./EventMenu"
import { EventContext } from "../../context/EventContext"
import { useInterests } from "../../context/InterestsContext"
import { NavLink } from "react-router-dom"
import { useMobileMenuContext } from "../../context/MobileMenuContext"
import { useEventNavigation } from "../../context/EventNavigationContext"
import { useMedia } from "use-media"
import { size } from "../../theme/devices"
import ScrollLock, { TouchScrollable } from "react-scrolllock"
import { useSidebarContext } from "../../context/EventSidebarContext"
import { useSpring } from "react-spring"

const useSizeWatcher = (collapsed: boolean | undefined) => {
  const sidebarRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>
  const { setSidebarWidth } = useSidebarContext()

  const updateSidebarSize = useCallback(() => {
    if (sidebarRef.current) {
      setSidebarWidth(sidebarRef.current.clientWidth)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("resize", updateSidebarSize)
    return () => window.removeEventListener("resize", updateSidebarSize)
  }, [updateSidebarSize])

  useEffect(() => updateSidebarSize(), [collapsed, updateSidebarSize])

  return { sidebarRef, updateSidebarSize }
}

/**
 * Use this component in a layout and control it by rendering sidebarContext.Sidebar
 */
export const AppSidebar: React.FC = () => {
  const context = useContext(EventContext)
  const { slidedIn, setSlidedIn, collapsed, exitAction } = useSidebarContext()
  const [collapsedMenuVisible, setCollapsedMenuVisible] = useState<boolean>(
    false
  )
  const interests = useInterests()
  const interestCount = useMemo(
    () =>
      Object.keys(interests.products).reduce(
        (acc, curr) => interests.products[curr].length + acc,
        0
      ),
    [interests.products]
  )

  const [pulsating, setPulsating] = useState<boolean>(false)
  useEffect(() => {
    if (interestCount === 0) setPulsating(false)
    else {
      setPulsating(true)
      const timeout = setTimeout(() => setPulsating(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [interestCount])

  const mobileMenu = useMobileMenuContext()
  const navigation = useEventNavigation()
  const isDesktop = useMedia({ minWidth: size.desktop })
  // Touchscrollable breaks ref passed by parent. luckily it's only needed on desktop. Workaround - wrapper div (if needed)
  const ScrollableWrapper = isDesktop ? React.Fragment : TouchScrollable

  const { sidebarRef, updateSidebarSize } = useSizeWatcher(collapsed)

  useEffect(() => setCollapsedMenuVisible(false), [context])

  const [slideInRested, setSlideInRested] = useState<boolean>(false)

  const slideInSpring = useSpring({
    cancel: slidedIn !== "ongoing",
    from: {
      transform: "translateX(-100%)",
    },
    to: {
      transform: "translateX(0%)",
    },
    onRest: () => setSlideInRested(true),
  })

  return (
    <>
      <ScrollLock isActive={!isDesktop && mobileMenu.open} />
      <ScrollableWrapper>
        <S.Container
          visibleOnMobile={mobileMenu.open}
          ref={r => {
            sidebarRef.current = r as HTMLDivElement
            updateSidebarSize()
          }}
          collapsed={collapsed}
          style={slideInSpring}
        >
          <S.Header collapsed={collapsed}>
            <S.BackHeaderCell
              onClick={() => {
                if (!exitAction)
                  context.setEvent({
                    //@ts-ignore
                    slug: undefined,
                    code: undefined,
                    data: undefined,
                    status: "reset",
                  })
                else exitAction.onClick()
              }}
            >
              {collapsed ? (
                <>
                  {exitAction ? (
                    <>
                      <S.ArrowTopLeft /> {exitAction.label}
                    </>
                  ) : (
                    <>
                      <Menu />
                      Menu
                    </>
                  )}
                </>
              ) : exitAction ? (
                <>
                  <S.ArrowTopLeft /> {exitAction.label}
                </>
              ) : (
                <>
                  <S.ArrowTopLeft />
                  Exit Techroom
                </>
              )}
            </S.BackHeaderCell>
            <S.HeaderDivider collapsed={collapsed} />
            <S.CounterCell
              as={NavLink}
              to={navigation.getCheckoutUrl()}
              activeClassName={"active"}
            >
              <S.Counter>
                {interestCount} <S.PulsatingCircle visible={pulsating} />
              </S.Counter>

              {collapsed ? "Request info" : "Information request package"}
            </S.CounterCell>
          </S.Header>

          {!collapsed || !isDesktop ? (
            <EventMenu
              withSlideIn
              startSlideIn={slideInRested}
              onRest={setSlidedIn}
            />
          ) : (
            <S.FloatingMenu visible={collapsedMenuVisible}>
              <S.Header>
                <S.BackHeaderCell
                  onClick={() => setCollapsedMenuVisible(v => !v)}
                >
                  <S.ArrowTopLeft />
                  Close menu
                </S.BackHeaderCell>
                <S.CounterCell
                  as={NavLink}
                  to={navigation.getCheckoutUrl()}
                  activeClassName={"active"}
                >
                  <S.Counter>{interestCount}</S.Counter>
                  {collapsed ? "Request info" : "Information request package"}
                </S.CounterCell>
              </S.Header>
              <EventMenu />
            </S.FloatingMenu>
          )}
        </S.Container>
      </ScrollableWrapper>
    </>
  )
}
