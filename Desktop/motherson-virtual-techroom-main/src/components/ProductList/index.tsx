import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Product as IProduct } from "../../types/Product"
import { ProductThumbnail } from "../ProductThumbnail"
import styled, { css } from "styled-components"
import device from "../../theme/devices"
import { useSidebarContext } from "../../context/EventSidebarContext"
import { animated, useTransition } from "react-spring"
import { Booth } from "../../types/Booth"
import { NextBoothThumbnail } from "../NextBoothThumbnail"

const Container = styled.div<{ sidebarWidth: number }>`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;

  ${props =>
    props.sidebarWidth &&
    css`
      margin-left: -${props.sidebarWidth}px;
    `};

  > :first-child {
    margin-left: ${props => props.sidebarWidth + 20}px;
  }
  > :last-child {
    margin-right: 20px;
  }
  > * + * {
    margin-left: 10px;
  }
  @media (${device.tablet}) {
    > * + * {
      margin-left: 20px;
    }
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`

export const ProductList: React.FC<{
  products: IProduct[]
  next?: Booth
  onProductProgress: (howManySeen: number, scrollPercent: number) => any
  boothName: string
  onAnimationRest: () => any
  [other: string]: any
}> = ({
  products,
  next,
  onProductProgress,
  boothName,
  onAnimationRest,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>

  const onScroll = useCallback((event: WheelEvent) => {
    if (!containerRef.current || event.deltaX) return
    // deltaMode 1 in firefox,  0 on chrome
    containerRef.current.scrollBy({
      left: Math.max(30 * event.deltaMode || 1, 10) * event.deltaY,
      behavior: "smooth",
    })
  }, [])

  useEffect(() => {
    window.addEventListener("wheel", onScroll, { passive: true })

    return () => window.removeEventListener("wheel", onScroll)
  }, [])

  const [lastVisible, setLastVisible] = useState<number>(0)

  useEffect(() => {
    onProductProgress(lastVisible + 1, 0)
  }, [lastVisible])

  const { sidebarWidth } = useSidebarContext()

  const onVisibilityChange = useCallback(
    (visible: boolean, p: IProduct, i: number) => {
      setLastVisible(vi => {
        if (!visible && vi === i) return vi - 1
        if (visible && i === vi + 1) return i
        return vi
      })
    },
    []
  )

  const items = useMemo(
    () =>
      [...products, { next, isNext: true }] as (IProduct & {
        next?: Booth
        isNext?: boolean
      })[],
    [products, next]
  )

  const [transition] = useTransition(
    items,
    {
      from: {
        opacity: 0,
        transform: "translateX(1000%)",
      },
      enter: {
        opacity: 1,
        transform: "translateX(0%)",
      },
      trail: 100,
      onRest: onAnimationRest,
    },
    []
  )

  return (
    <Container ref={containerRef} sidebarWidth={sidebarWidth || 0} {...props}>
      {transition((style, item, s, i) => {
        if (item.isNext) {
          return item.next ? (
            <NextBoothThumbnail containerProps={{ style }} {...item.next} />
          ) : (
            <div />
          )
        }
        return (
          <animated.div style={style}>
            <ProductThumbnail
              overline={boothName}
              onVisible={visible => onVisibilityChange(visible, item, i)}
              {...item}
            />
          </animated.div>
        )
      })}
    </Container>
  )
}
