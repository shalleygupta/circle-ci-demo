import React from "react"
import { Helmet } from "react-helmet"
import { StyleSheetManager, ThemeProvider } from "styled-components"
import griddie from "styled-griddie"
import { Normalize } from "styled-normalize"
import { GlobalStyles } from "./globalStyles"
import { PageProps } from "gatsby"
import { Fade } from "./fadeTransition"
import { WithEventContext } from "../../context/EventContext"
import { lightTheme } from "../../theme/light"

export const PageWrapper: React.FC<PageProps> = props => (
  <StyleSheetManager stylisPlugins={[griddie]}>
    <>
      <Helmet>
        <link rel="stylesheet" href="/fonts/graphik.css" />
      </Helmet>

      <Normalize />
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <WithEventContext>
          {/*@ts-ignore*/}
          <Fade location={props.location}>{props.children}</Fade>
        </WithEventContext>
      </ThemeProvider>
    </>
  </StyleSheetManager>
)

export default PageWrapper
