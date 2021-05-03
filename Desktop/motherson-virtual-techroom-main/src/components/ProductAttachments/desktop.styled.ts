import styled, { createGlobalStyle, css } from "styled-components"
import device from "../../theme/devices"
import { Link } from "react-router-dom"
import { ReactComponent as Arrow } from "../../icons/ic-arrow-top-right.svg"

export const Global = createGlobalStyle`html, body {scroll-snap-type: y mandatory;}`

export const Container = styled.div`
  grid-column: 1 / 8;
  height: 449px;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.textColor};
  @media (${device.desktop}) {
    grid-column: 1 / 10;
    height: 100%;
  }
`

export const LabelContainer = styled.div`
  position: sticky;
  bottom: 0;
  height: 71px;
  background: ${props => props.theme.backgroundColor};
  box-sizing: border-box;
  padding: 21px 20px 0 26px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 11;
`

export const Previous = styled.div``

export const PreviousOverline = styled.div`
  font-size: 9px;
  font-weight: 500;
  line-height: 7px;
`

export const ArrowLeft = styled(Arrow)`
  transform: rotate(-135deg);
`

export const PreviousTitle = styled(Link)`
  font-size: 19px;
  font-weight: 300;
  line-height: 29px;
  color: inherit;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }

  svg {
    margin-right: 6px;
    margin-bottom: 2px;
  }
`

export const Label = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 29px;
  text-align: left;
`

export const Attachments = styled.div`
  margin-top: -53px;
  z-index: 10;
  > * {
    width: 100%;
    height: calc(100vh - 72px);
    scroll-snap-align: start;
  }
`

export const AttachmentContainer = styled.div<{ forVideo: boolean }>`
  width: 100%;
  height: calc(100vh - 72px);
  scroll-snap-align: start;
  z-index: 10;
  ${props =>
    props.forVideo
      ? css`
          display: flex;
          flex-direction: column;
          background: black;
          > * {
            transform: translateY(-50%);
            margin-top: 50%;
          }
        `
      : css`
          > * {
            width: inherit;
            height: inherit;
          }
        `}
`

export const Pager = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 26px;
  z-index: 11;
  display: flex;
  flex-direction: column;
  transition: opacity 250ms ease-out;
  opacity: ${props => (props.visible ? 1 : 0)};
`

export const Dot = styled.button<{ active: boolean }>`
  box-sizing: border-box;
  border-radius: 50%;
  background: none;
  outline: none;
  padding: 0;
  cursor: pointer;

  display: block;
  width: 10px;
  height: 10px;
  transition: all 250ms ease-out;

  :not(:last-child) {
    margin-bottom: 11px;
  }

  ${props =>
    props.active
      ? css`
          border: 1px solid ${props.theme.primaryColor};
        `
      : css`
          background: rgba(255, 255, 255, 0.5);
          border: none;
        `}
`

export const ConfidentialLabel = styled.div<{ visible: boolean }>`
  height: 28px;
  padding-left: 10px;
  min-width: 127px;
  font-size: 9px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0;
  color: white;
  background: ${props => props.theme.primaryColor};
  display: flex;
  flex-direction: row;
  img {
    width: 18px;
    margin-right: 6px;
  }
  transition: opacity 250ms ease-out;

  ${props =>
    !props.visible &&
    css`
      opacity: 0;
    `};
`
