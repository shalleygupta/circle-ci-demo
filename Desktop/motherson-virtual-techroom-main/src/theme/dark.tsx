import { DefaultTheme } from "styled-components"
import { lightTheme } from "./light"

export const darkTheme: DefaultTheme = {
  ...lightTheme,
  textColor: "#FFFFFF",
  backgroundColor: "#000000",
  primaryColor: "#DA2020",
}
