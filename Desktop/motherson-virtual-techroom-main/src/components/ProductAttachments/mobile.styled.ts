import styled, { css } from "styled-components"
import * as DesktopStyles from "./desktop.styled"

export const Wrapper = styled.div`
  margin-top: -53px;
  grid-column: 1 / 8;
  grid-row: 1;
  position: relative;
`

export const AssetsContainer = styled.div`
  height: 449px;
  width: 100vw;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  > * {
    min-width: 100vw;
    height: 100%;
    scroll-snap-align: start;
  }
`

export const PdfAttachmentContainer = styled.div`
  min-width: 100vw;
  height: 100%;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  background: rgb(227, 227, 227);
`

export const DownloadButton = styled.a`
  background: white;
  border: none;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.16);
  padding: 15px;
  font-size: 12px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0;
  margin: auto;
  text-decoration: none;
  color: inherit;
`

export const AttachmentContainer = styled.div<{ forVideo: boolean }>`
  min-width: 100vw;
  height: 100%;
  scroll-snap-align: start;
  background: white;
  position: relative;

  ${props =>
    props.forVideo
      ? css`
          display: flex;
          flex-direction: column;
          background: black;
          > * {
            transform: translateY(-50%);
            margin-top: 50%;
        `
      : css`
          > * {
            width: inherit;
            height: inherit;
          }
        `}
`

export const Pager = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 80px;
  z-index: 11;
  display: flex;
  flex-direction: row;
`

export const Dot = styled(DesktopStyles.Dot)`
  pointer-events: none;
  && {
    margin-bottom: 0;
    :not(:last-child) {
      margin-right: 11px;
    }
  }
`

export const Footer = styled.div`
  padding: 14px 20px 15px 19px;
  display: flex;
  background: white;
  font-size: 11px;
  font-weight: 300;
  line-height: 29px;
  color: ${props => props.theme.textColor};
`

export const ConfidentialLabel = styled(DesktopStyles.ConfidentialLabel)`
  margin-left: auto;
`
