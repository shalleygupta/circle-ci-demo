import React from "react"
import styled from "styled-components"
//@ts-ignore
import Icon from "../../icons/ic-arrow-button.svg"

const Button = styled.button`
  outline: none;
  border: none;
  background: none;
  padding: 0;
  height: 40px;
  display: flex;
  flex-direction: row;
`

export const ArrowButton: React.FC = props => (
  <Button {...props}>
    <img src={Icon} />
  </Button>
)
