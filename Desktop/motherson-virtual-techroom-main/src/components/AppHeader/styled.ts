import styled, { css } from "styled-components"
import device from "../../theme/devices"
import { lightTheme } from "../../theme/light"

export const Container = styled.header<{
  collapsed?: boolean
  headerStyle: "regular" | "contrast"
  sidebarVisibleOnMobile: boolean
}>`
  grid-row: 1;
  position: sticky;
  top: 0;

  grid-column: 1 / 8;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);
  @media (${device.desktop}) {
    grid-column: 5 / 14;
    border-bottom: none;
    z-index: 10;
  }

  height: 53px;
  min-height: 53px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 21;

  ${props =>
    props.sidebarVisibleOnMobile
      ? css`
          > svg:last-of-type {
            color: ${props.theme.primaryColor};
            transition: all 250ms ease-out;
          }
        `
      : css``};
  ${props =>
    props.collapsed
      ? css`
          color: white;
          > svg {
            color: ${props.theme.primaryColor};
          }
        `
      : props.headerStyle === "regular"
      ? css`
          color: white;
        `
      : css`
          color: ${props => props.theme.textColor};
          > svg {
            color: ${props.theme.primaryColor};
          }
        `};

  @media (${device.desktop}) {
    ${props =>
      props.collapsed
        ? css`
            svg {
              color: ${props => props.theme.primaryColor};
              margin-left: auto;
            }
            > h1 {
              display: none;
            }
          `
        : props.headerStyle === "regular"
        ? css`
            color: white;
          `
        : css`
            color: ${props => props.theme.textColor};
            > svg {
              color: ${props.theme.primaryColor};
            }
          `};
  }

  > svg:first-of-type {
    display: none;
    @media (${device.desktop}) {
      display: block;
    }
  }

  > svg:last-of-type {
    padding-top: 13px;
    margin-bottom: auto;
    margin-right: 18px;
    margin-left: 18px;
    @media (${device.desktop}) {
      display: none;
    }
  }
`

const MobileOnlyMenuItem = styled.button`
  border: none;
  outline: none;
  background: none;
  color: inherit;

  height: 100%;
  box-sizing: border-box;
  padding: 17px 16px 0;
  display: flex;
  border-right: 0.5px solid rgba(255, 255, 255, 0.3);
  text-align: left;
  transition: all 250ms ease-out;
  @media (${device.desktop}) {
    display: none;
  }
`

export const MenuButton = styled(MobileOnlyMenuItem)<{ open: boolean }>`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;

  svg {
    padding-top: 0;
    ${props =>
      props.open &&
      css`
        transform: rotate(-90deg);
        margin-right: 12.5px;
        margin-top: 1px;
      `}
  }
`

export const Counter = styled.span<{ dark?: boolean }>`
  color: ${lightTheme.textColor};
  position: relative;
  width: 22px;
  height: 22px;
  background: white;
  display: block;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 500;
  margin-right: 9px;

  min-width: 22px;
  text-align: center;
  line-height: 22px;
  transition: all 250ms ease-out;

  ${props =>
    props.dark
      ? css`
          background: ${props => props.theme.textColor};
          color: white;
        `
      : css`
          background: white;
        `}
`

export const CounterButton = styled(MobileOnlyMenuItem)<{ open: boolean }>`
  font-size: 9px;
  font-weight: 500;
  line-height: 12px;
  flex: 1;
  > span:last-of-type {
    transition: all 250ms ease-out;
    opacity: ${props => (props.open ? 1 : 0)};
  }
  ${props =>
    !props.open &&
    css`
      border-right: none;
    `}
`

export const ExitButton = styled(MobileOnlyMenuItem)<{ open: boolean }>`
  opacity: ${props => (props.open ? 1 : 0)};
  font-size: 9px;
  font-weight: 500;
  line-height: 12px;
  color: rgba(255, 255, 255, 0.6);
`

export const Title = styled.h1`
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 29px;
  margin: 0;
  display: none;

  @media (${device.desktop}) {
    display: block;
  }
`
