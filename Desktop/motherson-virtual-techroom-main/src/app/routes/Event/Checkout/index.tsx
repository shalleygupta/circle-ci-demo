import React, { useEffect } from "react"
import { RouteComponentProps, useHistory } from "react-router-dom"
import * as S from "./styled"
//@ts-ignore
import ProudToBe from "../../../../icons/ic-proud-to-be.svg"
import { CheckoutForm } from "./CheckoutForm"
import { ReviewForm } from "./ReviewForm"
import { useHeaderContext } from "../../../../context/EventHeaderContext"
import { useSidebarContext } from "../../../../context/EventSidebarContext"
import { useInterests } from "../../../../context/InterestsContext"

export const Checkout: React.FC<
  RouteComponentProps<{ booth: string }>
> = () => {
  const { setHeader } = useHeaderContext()
  const { setExitAction } = useSidebarContext()
  const history = useHistory()

  useEffect(() => {
    setHeader("Information checkout", "contrast")
    setExitAction({ label: "Back", onClick: history.goBack })

    return () => setExitAction()
  }, [])

  const interests = useInterests()

  useEffect(() => {
    if (interests.submissionState === "submitted") {
      return () => {
        interests.reset()
      }
    }
  }, [])

  return (
    <>
      <CheckoutForm />

      <S.DividerContainer>
        <S.Divider />
      </S.DividerContainer>

      <ReviewForm />
    </>
  )
}
