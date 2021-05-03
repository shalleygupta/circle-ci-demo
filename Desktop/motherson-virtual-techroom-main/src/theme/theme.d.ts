import "styled-components"

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    primaryColor: string
    textColor: string
    lightTextColor: string
    backgroundColor: string
    placeholderColor: string
  }
}
