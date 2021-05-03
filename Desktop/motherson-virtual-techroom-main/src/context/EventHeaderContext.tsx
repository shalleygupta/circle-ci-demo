import React, { createContext, useCallback, useContext, useState } from "react"

type HeaderStyle = "regular" | "contrast" | undefined

const headerContext = createContext<{
  title: string
  style: HeaderStyle
  setHeader: (title: string, style?: HeaderStyle) => any
}>({
  title: "",
  style: "regular",
  setHeader: () => null,
})

export const useHeaderContext = () => useContext(headerContext)

export const WithHeaderContext: React.FC = ({ children }) => {
  const [[title, style], _setHeaderTitle] = useState<
    [string, "regular" | "contrast"]
  >(["", "regular"])
  const setHeader = useCallback(
    (title: string, style: HeaderStyle = "regular") =>
      _setHeaderTitle(old => {
        if (old[0] === title && old[1] === style) return old
        return [title, style]
      }),
    [_setHeaderTitle]
  )

  return (
    <headerContext.Provider value={{ title, style, setHeader }}>
      {children}
    </headerContext.Provider>
  )
}
