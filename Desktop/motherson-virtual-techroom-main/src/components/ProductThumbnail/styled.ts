import styled from "styled-components"
//@ts-ignore
import { ReactComponent as Arrow } from "../../icons/ic-simple-arrow-right.svg"
import device from "../../theme/devices"
import { animated } from "react-spring"

export const Container = styled(animated.article)`
  position: relative;
  cursor: pointer;
`

export const InterestCheckWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  color: ${props => props.theme.textColor};

  transition: all 250ms ease-out;

  span {
    font-size: 9px;
    font-weight: 400;
    line-height: 13px;
    margin-left: -6px;
  }

  opacity: 1;
  padding: 6px 10px 10px;

  @media (${device.tablet}) {
    padding: 15px 15px 15px 20px;
  }

  @media (${device.desktop}) {
    opacity: 0;
    pointer-events: none;
  }

  > * {
    pointer-events: none;
  }
`

export const AssetWrapper = styled.div`
  position: relative;

  width: 197px;
  height: 207px;

  @media (${device.tablet}) {
    width: 257px;
    height: 237px;
  }

  @media (${device.desktop}) {
    :hover {
      > ${InterestCheckWrapper} {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }

  .gatsby-image-wrapper {
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
`

export const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  background: ${props => props.theme.backgroundColor};
  cursor: pointer;
  height: 70px;
  padding: 11px 10px 0;
  box-sizing: border-box;
  color: ${props => props.theme.textColor};

  @media (${device.tablet}) {
    padding: 13px 20px 0;
    height: 71px;
  }
`

export const Overline = styled.div`
  color: ${props => props.theme.lightTextColor};
  margin-bottom: 4px;
  grid-row: 1;
  grid-column: 1;

  font-size: 9px;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0;

  @media (${device.tablet}) {
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 13px;
    margin-bottom: 6px;
  }
`

export const Title = styled.div`
  grid-row: 2;
  grid-column: 1;

  font-size: 10px;
  font-weight: 500;
  line-height: 13px;
  letter-spacing: 0;

  @media (${device.tablet}) {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
  }
`

export const ArrowIcon = styled(Arrow)`
  grid-row: 2;
  grid-column: 2;
`
