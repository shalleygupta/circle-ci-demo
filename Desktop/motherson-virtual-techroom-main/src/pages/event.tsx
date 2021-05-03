import React, { useEffect, useState } from "react"
import { PageProps } from "gatsby"
import { EventApp } from "../app"

const EventPage: React.FC<PageProps> = props => {
  const [rendered, setRendered] = useState<boolean>(false)
  useEffect(() => setRendered(true), [])
  return rendered ? <EventApp {...props} /> : null
}

export default EventPage
