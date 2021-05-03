import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
html, body {
  font-family: Graphik, -apple-system, Arial, sans-serif;
  font-size: 16px;
  color: ${props => props.theme.textColor}
}

html, body, #___gatsby, #gatsby-focus-wrapper {
  height: 100%;
  >div:not(#query-on-demand-indicator-element) {
    height: 100%;
  }
}

* {
  -webkit-tap-highlight-color: transparent; /* for removing the highlight */
}

*:focus {outline: none}`
