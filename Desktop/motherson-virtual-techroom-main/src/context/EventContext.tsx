import React, { useState } from "react"
import { Event } from "../types/Event"
import { useEventWatcher } from "../hooks/useEventWatcher"

type EventFetchStatus =
  | "success"
  | "fetching"
  | "failed"
  | "requested"
  | "reset"
  | undefined

export const EventContext = React.createContext<{
  slug?: string
  code?: string
  confidentialAccessCode?: string
  data?: Event
  status?: EventFetchStatus
  setEvent: React.Dispatch<
    React.SetStateAction<{
      code?: string
      slug: string
      confidentialAccessCode?: string
      data?: Event
      status?: EventFetchStatus
    }>
  >
}>({
  slug: "",
  code: "",
  setEvent: () => {},
})

const Watcher = () => {
  useEventWatcher()
  return null
}

export const WithEventContext: React.FC<{}> = ({ children }) => {
  const [
    { slug, code, confidentialAccessCode, data, status },
    setEvent,
  ] = useState<{
    slug: string
    code?: string
    data?: Event
    status?: EventFetchStatus
    confidentialAccessCode?: string
  }>({
    slug: "",
    code: "",
    confidentialAccessCode: undefined,
  })

  return (
    <EventContext.Provider
      value={{ slug, code, confidentialAccessCode, setEvent, data, status }}
    >
      <Watcher />
      {children}
    </EventContext.Provider>
  )
}
