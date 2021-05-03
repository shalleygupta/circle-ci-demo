import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: row;
  border-bottom: 1px solid;

  align-items: baseline;

  svg {
    padding-bottom: 3px;
  }
`

export const ActualInput = styled.input`
  flex: 1;
  max-width: 100%;
  background: none;
  outline: none;
  border: none;
  padding-bottom: 5px;
  padding-left: 5px;
  ::placeholder {
    color: ${props => props.theme.placeholderColor};
  }
`

export const SuffixContainer = styled.div`
  padding: 1px 12px 3px;
  cursor: pointer;
  border: none;
  background: none;
  outline: none;
`
