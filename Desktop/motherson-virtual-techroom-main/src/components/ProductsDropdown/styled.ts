import styled, { css } from "styled-components"

export const OptionsContainer = styled.div<{ open: boolean }>`
  max-height: 0;
  overflow: hidden;
  transition: all 250ms ease-out;
  background: inherit;
  margin-top: 0;
  padding-left: 14px;
  box-sizing: border-box;
  label {
    margin-bottom: 7px;
  }

  ${props =>
    props.open
      ? css`
          max-height: 283px;
          overflow-y: auto;
        `
      : css`
          max-height: 0;
          overflow: hidden;
          pointer-events: none;
        `}
`

export const Container = styled.div<{ open: boolean }>`
  background: ${props => props.theme.backgroundColor};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.16);
  color: ${props => props.theme.textColor};

  box-sizing: border-box;
  transition: all 250ms ease-out;

  ${props =>
    props.open
      ? css`
          margin-bottom: 0;
        `
      : css`
          margin-bottom: 283px;
        `}
`

export const Title = styled.div`
  padding-top: 14px;
  font-size: 12px;
  font-weight: 300;
  line-height: 13px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 15px;
  height: 37px;
  box-sizing: border-box;
  align-items: baseline;
  padding-left: 14px;
  cursor: pointer;
`

export const Option = styled.div`
  margin-bottom: 1px;
`

export const OptionGroupLabel = styled.div`
  font-size: 9px;
  font-weight: 400;
  line-height: 12px;
  color: ${props => props.theme.lightTextColor};
  margin-top: 15px;
  margin-bottom: 8px;
`

export const Label = styled.div`
  font-size: 9px;
  font-style: normal;
  font-weight: 500;
  line-height: 12px;
  margin-top: 2px;
`
