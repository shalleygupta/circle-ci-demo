import React, { createContext, useCallback, useContext, useState } from "react"

const sidebarContext = createContext<{
  sidebarWidth: number
  setSidebarWidth: (width: number) => unknown
  slidedIn: "no" | "ongoing" | "yes"
  startSlideIn: () => unknown
  setSlidedIn: () => unknown
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  exitAction?: { label: string; onClick: () => unknown }
  setExitAction: (action?: { label: string; onClick: () => unknown }) => void
}>({
  sidebarWidth: 0,
  setSidebarWidth: () => null,
  slidedIn: "no",
  startSlideIn: () => {},
  setSlidedIn: () => {},
  collapsed: false,
  setCollapsed: () => {},
  setExitAction: () => {},
})

export const useSidebarContext = () => useContext(sidebarContext)

export const WithSidebarContext: React.FC = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(0)
  const [slidedIn, _setSlidedIn] = useState<"no" | "ongoing" | "yes">("no")
  const startSlideIn = useCallback(() => _setSlidedIn("ongoing"), [
    _setSlidedIn,
  ])
  const setSlidedIn = useCallback(() => _setSlidedIn("yes"), [_setSlidedIn])

  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [exitAction, setExitAction] = useState<{
    label: string
    onClick: () => unknown
  }>()

  return (
    <sidebarContext.Provider
      value={{
        sidebarWidth,
        setSidebarWidth,
        slidedIn,
        startSlideIn,
        setSlidedIn,
        collapsed,
        setCollapsed,
        exitAction,
        setExitAction,
      }}
    >
      {children}
    </sidebarContext.Provider>
  )
}
