import styled from "styled-components"
import device from "../theme/devices"

export const GridLayout = styled.div<{
  cols?: number
  colsMobile?: number
  withMarginCols?: boolean
}>`
  display: grid;
  grid-template-columns:
    ${props => props.withMarginCols && "10px"} repeat(
      ${props => props.colsMobile || 5},
      1fr
    )
    ${props => props.withMarginCols && "10px"};
  -ms-grid-columns: ${props =>
    `${props.withMarginCols ? "10px" : ""} (1fr)[${props.colsMobile || 5}] ${
      props.withMarginCols ? "10px" : ""
    }`};
  grid-column-gap: 10px;
  position: relative;

  @media (${device.desktop}) {
    grid-template-columns:
      ${props => props.withMarginCols && "0px"} repeat(
        ${props => props.cols || 12},
        1fr
      )
      ${props => props.withMarginCols && "0px"};
    -ms-grid-columns: ${props =>
      `${props.withMarginCols ? "0px" : ""} (1fr)[${props.cols || 12}] ${
        props.withMarginCols ? "0px" : ""
      }`};
    grid-column-gap: 20px;
    position: relative;
  }
`
