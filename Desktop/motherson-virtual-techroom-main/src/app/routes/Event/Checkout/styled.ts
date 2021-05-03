import styled, { css } from "styled-components"
import { Input as InputComponent } from "../../../../components/Input"
import { ArrowButton } from "../../../../components/ArrowButton"
import { ProductsDropdown } from "../../../../components/ProductsDropdown"
import device from "../../../../theme/devices"

const DESKTOP_HEADER_HEIGHT = 53

export const FormContainer = styled.form<{ readOnly: boolean }>`
  grid-column: 1 / 8;
  box-sizing: border-box;
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto auto auto auto auto 1fr;
  background: ${props => props.theme.backgroundColor};
  margin-top: -${DESKTOP_HEADER_HEIGHT}px;

  align-content: start;
  padding: ${DESKTOP_HEADER_HEIGHT + 33}px 20px 14px;

  @media (${device.desktop}) {
    padding: ${DESKTOP_HEADER_HEIGHT + 48}px 20px 0;
    grid-column: 1 / 6;
    margin-right: -20px;
    height: 100vh;
    position: sticky;
    top: 0;
  }

  ${props =>
    props.readOnly &&
    css`
      cursor: wait;
      > * {
        pointer-events: none;
        opacity: 0.5;
      }
    `}
`

export const DividerContainer = styled.div`
  grid-column: 1 / 8;
  width: 100%;
  background: ${props => props.theme.backgroundColor};
  display: flex;

  box-sizing: border-box;

  @media (${device.desktop}) {
    margin-top: -${DESKTOP_HEADER_HEIGHT}px;
    grid-column: 6;
    height: 100vh;
    position: sticky;
    top: 0;
  }
`

export const Divider = styled.div`
  border-bottom: 0.5px solid #c4c4c4;
  width: 100%;
  margin: auto 0;
  z-index: 1;

  box-sizing: border-box;

  @media (${device.desktop}) {
    height: 100%;
    width: auto;
    margin: 0 auto;
    border-bottom: none;
    border-right: 0.5px solid #c4c4c4;
  }
`

export const ReviewContainer = styled.div`
  grid-column: 1 / 8;
  box-sizing: border-box;
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto auto auto 1fr;
  background: ${props => props.theme.backgroundColor};
  align-content: start;
  padding: 46px 20px 0;
  @media (${device.desktop}) {
    grid-column: 7 / 12;
    margin-left: -20px;
    min-height: 100vh;
    padding: ${DESKTOP_HEADER_HEIGHT + 67}px 20px 0;
    margin-top: -${DESKTOP_HEADER_HEIGHT}px;
  }
`

export const Overline = styled.div`
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 13px;
  color: ${props => props.theme.lightTextColor};
  grid-column: 1 / 5;
  margin-bottom: 4px;
`

export const Title = styled.h2`
  font-size: 23px;
  font-weight: 300;
  line-height: 29px;
  color: ${props => props.theme.textColor};
  margin-bottom: 27px;
  margin-top: 0;
  grid-column: 1 / 5;

  @media (${device.desktop}) {
    margin-bottom: 21px;
  }
`

export const Text = styled.div`
  font-size: 12px;
  font-weight: 300;
  line-height: 15px;
  color: ${props => props.theme.textColor};
  grid-column: 1 / 5;
`

export const InputWrapper = styled.label`
  margin-top: 19px;
  :first-of-type {
    margin-top: 28px;
  }
  grid-column: 1 / 8;
  @media (${device.tablet}) {
    margin-top: 24px;
    :first-of-type,
    :nth-of-type(2) {
      margin-top: 48px;
    }
    :nth-of-type(odd) {
      grid-column: 1 / 3;
    }
    :nth-of-type(even) {
      grid-column: 3 / 5;
    }
  }
`

export const Input = styled(InputComponent)`
  font-size: 14px;
  font-weight: 300;
  line-height: 15px;
  @supports (-webkit-overflow-scrolling: touch) {
    font-size: 16px;
  }
`

export const Error = styled.div`
  font-size: 9px;
  line-height: 10px;
  color: ${props => props.theme.primaryColor};
  height: 12px;
  text-transform: capitalize;
  padding-top: 2px;
  box-sizing: border-box;
`

export const CheckboxContainer = styled.div`
  grid-column: 1 / 8;
  margin-top: 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin-left: -4px;
    font-size: 9px;
    font-weight: 400;
    line-height: 13px;
    color: ${props => props.theme.textColor};
  }

  @media (${device.tablet}) {
    margin-top: 28px;
  }

  @media (${device.desktop}) {
    grid-column: 1 / 5;
  }
`

export const SubmitButton = styled(ArrowButton)`
  margin-top: 2px;
  cursor: pointer;
  position: relative;

  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: white;
    transition: all 250ms ease-out;
    max-width: 0;
    width: 100%;
  }

  :hover {
    :before {
      max-width: 20px;
    }
  }
`

export const RequestsContainer = styled.div`
  grid-column: 1 / 5;
  display: flex;
  flex-direction: column;
  margin-bottom: 56px;
  label {
    margin-bottom: 21px;
    div {
      margin-top: -3px;
    }
  }
  h5,
  h6 {
    margin: 0;
    font-size: 9px;
    line-height: 12px;
  }
  h5 {
    font-weight: 400;
    color: rgba(19, 3, 4, 0.6);
  }
  h6 {
    font-weight: 500;
    color: ${props => props.theme.textColor};
  }
`

export const Dropdown = styled(ProductsDropdown)`
  grid-column: 1 / 5;

  @media (${device.tablet}) {
    grid-column: 1 / 4;
  }
`

export const RequiredHint = styled.div`
  grid-column: 1 / 8;
  margin-left: 0;
  padding-top: 52px;
  font-size: 9px;
  font-weight: 400;
  line-height: 13px;

  @media (${device.desktop}) {
    grid-column: 1 / 5;
    margin: auto auto 18px 25px;
    padding-top: 40px;
  }
`

export const Footer = styled.div`
  grid-column: 2 / 5;
  grid-row: 5;
  margin: auto 22px 7px auto;
  padding-top: 24px;
`
