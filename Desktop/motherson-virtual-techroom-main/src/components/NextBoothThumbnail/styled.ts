import styled from "styled-components"
//@ts-ignore
import { ReactComponent as Arrow } from "../../icons/ic-arrow-top-right.svg"
import device from "../../theme/devices"
import { animated } from "react-spring"

export const Container = styled(animated.div)`
  margin-top: auto;
  min-width: 218px;
  display: flex;
  flex-direction: column;
  color: white;

  @media (${device.tablet}) {
    min-width: 230px;
  }
  mix-blend-mode: difference;
`

export const Overline = styled.div`
  font-size: 9px;
  font-weight: 500;
  line-height: 12px;
  margin-bottom: 3px;
`

export const Name = styled.a`
  font-size: 23px;
  font-weight: 300;
  line-height: 29px;
  color: inherit;
  text-decoration: none;
  //margin-bottom: 41px;
  :hover {
    text-decoration: underline;
  }
`
export const ArrowIcon = styled(Arrow)`
  margin-left: 10px;
  height: 0.6em;
`
