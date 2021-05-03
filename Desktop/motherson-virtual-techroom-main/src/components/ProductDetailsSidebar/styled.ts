import styled from "styled-components"
import { Link } from "react-router-dom"
import device from "../../theme/devices"

export const Container = styled.aside`
  color: ${props => props.theme.textColor};
  background: ${props => props.theme.backgroundColor};
  display: flex;
  flex-direction: column;
  grid-column: 1 / 8;
  @media (${device.desktop}) {
    grid-column: 10 / 14;
    position: sticky;
    top: 0;
    height: 100vh;
    margin-left: -20px;
    margin-top: -53px;
  }
`

export const Overline = styled.div`
  font-size: 9px;
  font-weight: 400;
  line-height: 12px;
  color: ${props => props.theme.lightTextColor};
  margin-left: 20px;
  order: 2;
  @media (${device.desktop}) {
    margin-top: 103px;
    order: 1;
  }
`

export const Title = styled.h1`
  font-size: 23px;
  font-weight: 300;
  line-height: 29px;
  margin: 6px 20px 0;

  order: 3;
  @media (${device.desktop}) {
    order: 2;
  }
  margin-bottom: 41px;
`

export const Subtitle = styled.h2`
  font-size: 12px;
  font-weight: 300;
  line-height: 15px;
  margin-bottom: 41px;
  margin-top: 0;
  margin-left: 20px;
  order: 4;
  @media (${device.desktop}) {
    order: 3;
  }
`

export const Description = styled.div`
  font-size: 14px;
  font-weight: 300;
  line-height: 19px;
  margin: 0 54px 17px 20px;

  > :first-child {
    margin-top: 0;
  }
  > :last-child {
    margin-bottom: 0;
  }

  order: 5;
  @media (${device.desktop}) {
    order: 4;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 300;
  }
`

export const RequestMoreInfoContainer = styled.div`
  user-select: none;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.16);
  padding: 15px 15px 13px;
  color: ${props => props.theme.primaryColor};
  font-size: 12px;
  font-weight: 400;

  span {
    margin-top: -2px;
    margin-left: -3px;
  }

  margin: 20px 20px 24px;

  order: 1;
  @media (${device.desktop}) {
    margin: 0 40px 40px 20px;
    order: 5;
  }
  cursor: pointer;
  > * {
    pointer-events: none;
  }
`

export const NextContainer = styled.div`
  height: 77px;
  border-top: 0.5px solid #c4c4c4;
  margin-top: auto;
  box-sizing: border-box;
  padding: 21px 30px 0 30px;
  order: 6;
  @media (${device.desktop}) {
    order: 6;
    height: 72px;
    padding: 21px 20px 0 20px;
  }
`

export const NextOverline = styled.div`
  font-size: 9px;
  font-weight: 500;
  line-height: 7px;
`

export const NextProductTitle = styled(Link)`
  font-size: 19px;
  font-weight: 300;
  line-height: 29px;
  color: inherit;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }

  svg {
    margin-left: 6px;
    margin-bottom: 2px;
    transform: rotate(45deg);
  }
`
