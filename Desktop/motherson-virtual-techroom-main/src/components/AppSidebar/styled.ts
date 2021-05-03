import styled, { css } from "styled-components"
import device from "../../theme/devices"
//@ts-ignore
import { ReactComponent as Arrow } from "../../icons/ic-arrow-top-right.svg"
import { animated } from "react-spring"

export const Container = styled(animated.aside)<{
  collapsed?: boolean
  visibleOnMobile?: boolean
}>`
  background: rgba(19, 3, 4, 0.8);
  backdrop-filter: blur(20px);
  grid-row: 1 / 3;
  z-index: 20;
  display: flex;
  flex-direction: column;
  transition: all 250ms ease-out;
  ${props =>
    props.visibleOnMobile
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
        `}

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  @media (${device.desktop}) {
    grid-column: ${props => (props.collapsed ? "1 / 3" : "1 / 5")};
    display: flex;
    visibility: visible;

    opacity: 1;
    position: sticky;
    top: 0;
    right: auto;
    bottom: auto;
    pointer-events: auto;
  }

  max-height: 100vh;
  overflow-y: auto;
  color: white;
  ${props =>
    props.collapsed &&
    css`
      overflow: visible;
    `}
`

export const Header = styled.div<{ collapsed?: boolean }>`
  display: none;
  pointer-events: none;
  @media (${device.desktop}) {
    display: flex;
    pointer-events: auto;
    min-height: 52px;
    flex-direction: ${props => (props.collapsed ? "column" : "row")};
    border-bottom: ${props =>
      !props.collapsed && "1px solid rgba(255, 255, 255, 0.3)"};
    position: sticky;
    top: 0;
  }
`

export const HeaderCell = styled.div`
  flex: 1;
  padding: 0 20px;
  svg {
    margin-right: 13px;
  }
  display: flex;
  align-items: center;
  min-height: 52px;
`

export const BackHeaderCell = styled(HeaderCell)`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

export const HeaderDivider = styled.div<{ collapsed?: boolean }>`
  ${props =>
    props.collapsed
      ? css`
          height: 1px;
          width: 100%;
        `
      : css`
          height: 100%;
          width: 1px;
        `}
  background: rgba(255, 255, 255, 0.3);
`

export const Counter = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  width: 22px;
  min-width: 22px;
  height: 22px;
  border-radius: 50%;
  color: black;
  background: white;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 250ms ease-out;
  position: relative;
`

export const CounterCell = styled(HeaderCell)`
  font-size: 9px;
  font-weight: 500;
  line-height: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: all 250ms ease-out;

  :hover {
    text-decoration: underline;
  }
  &.active {
    color: ${props => props.theme.textColor};
    background: ${props => props.theme.backgroundColor};

    > ${Counter} {
      color: white;
      background: ${props => props.theme.textColor};
    }
  }
`

export const ArrowTopLeft = styled(Arrow)`
  transform: rotate(-90deg);
`

export const FloatingMenu = styled.nav<{ visible: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  width: 300%;
  background: inherit;
  backdrop-filter: blur(20px);
  transition: all 250ms ease-out;
  display: flex;
  flex-direction: column;
  ${props =>
    props.visible
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
          content-visiblity: none;
        `}
`

export const PulsatingCircle = styled.div<{ visible: boolean }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 30px;
  height: 30px;

  &:before {
    content: "";
    position: relative;
    display: block;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    margin-left: -50%;
    margin-top: -50%;
    border-radius: 45px;
    background-color: white;
    animation: ${props =>
      props.visible &&
      "pulse-ring 1s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;"};
    opacity: ${props => (props.visible ? 1 : 0)};
    transition: opacity 250ms ease-out;

    @media (${device.desktop}) {
      width: 200%;
      height: 200%;
      margin-left: -50%;
      margin-top: -50%;
    }
  }

  @keyframes pulse-ring {
    0% {
      transform: scale(0.43);
      opacity: 0.6;
    }
    80%,
    100% {
      opacity: 0;
    }
  }

  @keyframes pulse-dot {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.8);
    }
  }
`
