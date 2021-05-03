import { useContext, useMemo } from "react"
import { useForm } from "react-hook-form"
import { EventContext } from "../context/EventContext"
import { navigate } from "gatsby"
import { StringParam, useQueryParam } from "use-query-params"

export const useLoginHandlers = () => {
  const { handleSubmit, register, errors } = useForm()
  const eventContext = useContext(EventContext)
  const [confidentialAttachmentsCode] = useQueryParam(
    "confidential",
    StringParam
  )

  const onSubmitHandler = useMemo(
    () =>
      handleSubmit(
        data => {
          eventContext.setEvent(e => ({
            slug: "",
            code: data.code,
            confidentialAccessCode: confidentialAttachmentsCode || undefined,
            status: e.status === "fetching" ? "fetching" : "requested",
            data: undefined,
          }))
          navigate("/event/")
        },
        errors => {
          console.log(errors)
        }
      ),
    [handleSubmit]
  )

  return {
    register,
    errors,
    onSubmitHandler,
    wrongCode: eventContext.status === "failed",
  }
}
