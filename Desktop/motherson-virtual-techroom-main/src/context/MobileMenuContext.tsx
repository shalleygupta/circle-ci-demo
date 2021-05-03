import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useMedia } from "use-media"
import { size } from "../theme/devices"

const MobileMenuContext = createContext<{
  open: boolean
  toggle: () => any
  close: () => any
}>({ open: false, toggle: () => null, close: () => null })

export const useMobileMenuContext = () => useContext(MobileMenuContext)

export const WithMobileMenuContext: React.FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)
  const isDesktop = useMedia({ minWidth: size.desktop })
  useEffect(() => {
    if (isDesktop) setOpen(false)
  }, [isDesktop])
  const toggle = useCallback(() => setOpen(o => !o), [setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])

  return (
    <MobileMenuContext.Provider value={{ open, toggle, close }}>
      {children}
    </MobileMenuContext.Provider>
  )
}
