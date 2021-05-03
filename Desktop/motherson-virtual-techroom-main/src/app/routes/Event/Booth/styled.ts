import styled from "styled-components"
import { ProductList as ProductListComp } from "../../../../components/ProductList"
import { BoothProgress } from "../../../../components/BoothProgress"
import device from "../../../../theme/devices"

export const VideoContainer = styled.div`
  margin-top: 60px;
  grid-row: 1;
  grid-column: 2 / 5;
  max-width: 151px;
  @media (${device.tablet}) {
    max-width: initial;
  }
  @media (${device.desktop}) {
    margin-top: 0;
    grid-column: 2 / 5;
  }
  font-size: 10px;
  font-weight: 300;
  line-height: 25px;
  letter-spacing: 0;
  span {
    color: white;
    mix-blend-mode: difference;
  }
`

export const ProductList = styled(ProductListComp)`
  grid-column: 1 / 8;
  margin-top: auto;

  @media (${device.desktop}) {
    grid-column: 1 / 12;
  }
`

export const Progress = styled(BoothProgress)<{ visible: boolean }>`
  grid-row: 3;
  grid-column: 2 / 8;
  padding-bottom: 15px;
  padding-top: 14px;
  transition: opacity 250ms ease-out;
  opacity: ${props => (props.visible ? 1 : 0)};

  @media (${device.desktop}) {
    grid-column: 2 / 11;
    padding-top: 17px;
  }
`
