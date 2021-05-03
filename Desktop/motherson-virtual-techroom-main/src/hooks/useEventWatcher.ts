import { useContext, useEffect } from "react"
import { fetch } from "cross-fetch"
import { Event } from "../types/Event"
import { EventContext } from "../context/EventContext"

const getEvent = (
  slug?: string,
  code?: string,
  confidentialAccessCode?: string
) => {
  return fetch("/.netlify/functions/check-and-get-event", {
    method: "POST",
    body: JSON.stringify({
      code,
      slug,
      confidentialCode: confidentialAccessCode || undefined,
    }),
  })
    .then(res => res.json())
    .then(d => {
      if (d.error) {
        throw d.error
      }
      return d as Event
    })
    .then(e => {
      e.booths.forEach((b, i) => (b.order = i + 1))
      return e
    })
}

export const useEventWatcher = () => {
  const eventContext = useContext(EventContext)

  useEffect(() => {
    if (eventContext.status !== "requested") return

    eventContext.setEvent(e => ({ ...e, data: undefined, status: "fetching" }))
    getEvent(
      eventContext.slug,
      eventContext.code,
      eventContext.confidentialAccessCode
    )
      .then(event => {
        eventContext.setEvent({
          code: event.code,
          slug: event.slug,
          data: event,
          status: "success",
        })
      })
      .catch(error => {
        console.log({ error })
        eventContext.setEvent(e => ({
          ...e,
          data: undefined,
          status: e.code || e.slug ? "failed" : undefined,
        }))
      })
  }, [eventContext.slug, eventContext.code])
}
