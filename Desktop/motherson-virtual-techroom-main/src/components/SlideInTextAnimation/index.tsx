import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { useSplitByLines } from "../../hooks/useSplitByLines"
import { animated, useSpring } from "react-spring"
import { useInView } from "react-intersection-observer"

const Container = styled.div<{ withLines: boolean }>`
  ${props =>
    props.withLines
      ? css`
          display: flex;
          flex-direction: column;
        `
      : css`
          opacity: 0;
        `}
`

const OuterLineWrapper = styled.span`
  display: inline-block;
  overflow: hidden;
`

const InnerLineWrapper = styled(animated.span)`
  display: inline-block;
`

const BR = styled(animated.br)``

export const SlideInTextAnimation: React.FC<{
  text: string
  pause?: boolean
  onRest?: () => void
  startDelay?: number
  [other: string]: any
}> = ({ text, pause, onRest, startDelay, ...props }) => {
  const [passedStartDelay, setPassedStartDelay] = useState<boolean>(!startDelay)
  useEffect(() => {
    setTimeout(() => setPassedStartDelay(true), startDelay || 0)
  }, [])
  const { ref, lines } = useSplitByLines({
    text,
    skip: pause || !passedStartDelay,
  })

  return (
    <Container
      ref={r => (ref.current = r as HTMLDivElement)}
      withLines={!!lines}
      {...props}
    >
      {lines && lines.length > 0
        ? lines.map((line, i) => (
            <Line
              key={line + i}
              text={line}
              previousLineText={lines[i - 1]}
              onRest={i === lines.length - 1 ? onRest : undefined}
            />
          ))
        : text}
    </Container>
  )
}

const Line: React.FC<{
  text: string
  onRest?: () => any
  pause?: boolean
  previousLineText?: string
}> = ({ previousLineText, text, pause, onRest }) => {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.8,
  })

  const [spring] = useSpring(
    {
      pause: !inView,
      from: {
        transform: "translateY(100%)",
      },
      to: {
        transform: "translateY(0)",
      },
      onRest,
    },
    [pause, inView]
  )

  useEffect(() => {
    if (!text && text === previousLineText) {
      onRest && onRest()
    }
  }, [inView, text, previousLineText])

  return text || text === previousLineText ? (
    <OuterLineWrapper ref={inViewRef}>
      <InnerLineWrapper style={spring}>{text}</InnerLineWrapper>
    </OuterLineWrapper>
  ) : (
    <BR ref={inViewRef} />
  )
}
