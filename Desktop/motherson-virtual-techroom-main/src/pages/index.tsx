import React, { useContext, useEffect } from "react"
import { DefaultBg } from "../components/Backgrounds"
import { Login } from "../Login"
import { EventContext } from "../context/EventContext"
import { navigate } from "gatsby"

const Page: React.FC = () => {
  const eventContext = useContext(EventContext)
  useEffect(() => {
    if (eventContext.status === "success") {
      navigate(`/event/#${eventContext.slug}`)
    }
  }, [eventContext.status])
  return (
    <main style={{ height: "100%" }}>
      <DefaultBg />
      <Login />
    </main>
  )
}

export default Page
