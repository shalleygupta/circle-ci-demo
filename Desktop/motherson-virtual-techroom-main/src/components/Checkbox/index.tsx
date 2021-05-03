import styled from "styled-components"

export const Checkbox = styled.input.attrs({
  type: "checkbox",
})`
  pointer-events: auto;
  :checked,
  :not(:checked) {
    position: absolute;
    left: -9999px;
    height: 100%;
    overflow: hidden;
    display: none;
  }
  :checked + label,
  :not(:checked) + label {
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    line-height: 20px;
    display: inline-flex;
    align-items: center;
    height: 100%;

    color: inherit;
  }
  :checked + label {
    color: inherit;
  }
  :checked + label:before,
  :not(:checked) + label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 14px;
    height: 14px;
    border: 1px solid;
    background: transparent;
    box-sizing: border-box;
    transition: all 250ms ease-out;
  }

  :checked + label:before {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    border-color: currentColor//{props => props.theme.primaryColor};
  }

  :checked + label:after,
  :not(:checked) + label:after {
    box-sizing: border-box;
    border-radius: 2px;
    content: "✔";
    color: ${props => props.theme.textColor};
    font-size: 10px;
    width: 14px;
    height: 14px;
    position: absolute;
    top: -3px;
    left: 3px;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;  
  }
  :not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  :checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`
