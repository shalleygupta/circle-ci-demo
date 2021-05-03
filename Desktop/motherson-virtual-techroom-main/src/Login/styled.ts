import styled from "styled-components"
import { GridLayout } from "../GridLayout"
import { ArrowPointingRightUpSuffixComponent } from "../components/Input"
//@ts-ignore
import { ReactComponent as MLogo } from "../icons/logo-full.svg"
import device from "../theme/devices"

export const Wrapper = styled(GridLayout).attrs({
  withMarginCols: true,
})`
  grid-template-rows: 1fr auto 1fr;
  height: 100vh;
  background-color: rgba(65, 15, 15, 0.1);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const Background = styled(GridLayout).attrs({
  cols: 6,
  noMarginCols: true,
})`
  grid-column: 2 / 7;
  padding-top: 31px;
  @media (${device.tablet}) {
    grid-column: 3 / 6;
  }
  @media (${device.desktop}) {
    grid-column: 5 / 11;
    padding-top: 43px;
  }

  grid-row: 2;
  background: white;

  padding-bottom: 10px;
`

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  grid-column: 1 / 7;
  padding: 0 20px;
  @media (${device.desktop}) {
    grid-column: 2 / 6;
    padding: 0;
  }

  input {
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 15px;

    @supports (-webkit-overflow-scrolling: touch) {
      font-size: 16px;
    }
  }
`

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 300;
  line-height: 29px;
  letter-spacing: 0;
  text-align: center;
  margin: 0 0 75px;
`

export const ArrowIcon = styled(ArrowPointingRightUpSuffixComponent)`
  cursor: pointer;
`

export const Error = styled.div`, font-size: 14px;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: red;
  min-height: 20px;
  padding-top: 2px;
`

export const AcceptTerms = styled.div`
  margin-top: 39px;
  @media (${device.desktop}) {
    margin-top: 55px;
  }
  display: flex;
  flex-direction: row;
  label {
    color: inherit;

    span {
      margin-left: -5px;
      margin-top: -1px;
      color: inherit;
      font-size: 9px;
      font-weight: 400;
      line-height: 13px;
      letter-spacing: 0;
    }
  }
`

export const Spacer = styled.div`
  flex: 1;
`

export const LogoWrapper = styled.div`
  color: white;
  position: absolute;
  right: 20px;
  top: 8.5px;
  svg {
    width: 123px;
  }
`
export const Logo = MLogo
