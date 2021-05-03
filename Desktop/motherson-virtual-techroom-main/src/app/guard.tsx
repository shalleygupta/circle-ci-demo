import React, { useContext, useEffect } from "react"
import { EventContext } from "../context/EventContext"
import { navigate as gatsbyNavigate } from "gatsby"
import { useHistory } from "react-router-dom"
import { useInterests } from "../context/InterestsContext"

export const EventGuard: React.FC<{ slug: string }> = props => {
  const eventContext = useContext(EventContext)
  const interests = useInterests()
  const history = useHistory()

  useEffect(() => {
    if (
      !props.slug &&
      ["fetching", "requested"].includes(eventContext.status || "")
    )
      return
    if (eventContext.status === "reset") {
      interests.reset
      gatsbyNavigate("/")
      return
    }
    if (props.slug && props.slug !== eventContext.slug) {
      // User changed slug directly. Alright, let's check
      eventContext.setEvent({
        slug: props.slug,
        status: "requested",
        code: undefined,
        data: undefined,
      })
      interests.reset()
    } else if (eventContext.status === "failed") {
      // it failed, doesn't exist or isn't public... go home!
      gatsbyNavigate("/")
    } else if (eventContext.status !== "success") {
      // but first give it a change, as it may be a public event
      history.replace(`/${props.slug}`)
    }
  }, [eventContext.status, props.slug])

  return null
}
