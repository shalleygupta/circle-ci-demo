import React, { useContext } from "react"
import * as S from "./styled"
import { Checkbox } from "../../../../components/Checkbox"
import { useForm } from "react-hook-form"
import { useInterests } from "../../../../context/InterestsContext"
import { EventContext } from "../../../../context/EventContext"

export const CheckoutForm: React.FC = () => {
  const { submissionState, submit } = useInterests()
  const event = useContext(EventContext)
  const { register, handleSubmit, errors } = useForm<{
    name: string
    lastName: string
    company: string
    email: string
    acceptsDataTerms: true
  }>({
    mode: "onChange",
  })
  const onSubmit = handleSubmit(data => {
    submit({ ...data, event: { code: event.code, slug: event.slug! } })
  })
  return (
    <S.FormContainer
      readOnly={submissionState === "submitting"}
      onSubmit={onSubmit}
    >
      <S.Overline>Information download</S.Overline>
      {submissionState !== "submitted" ? (
        <>
          <S.Title>Thank you for your interest in our products.</S.Title>
          <S.Text>
            Leave your contact details and we will send you all the provided
            information. If you haven't selected any products you can add them
            here as well.
          </S.Text>

          <S.InputWrapper>
            <S.Input
              ref={register({ required: true })}
              name={"name"}
              placeholder={"First name*"}
            />
            <S.Error>{errors.name?.type}</S.Error>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Input
              ref={register({ required: true })}
              name={"lastName"}
              placeholder={"Last name*"}
            />
            <S.Error>{errors.lastName?.type}</S.Error>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Input
              ref={register({ required: false })}
              name={"company"}
              placeholder={"Company"}
            />
            <S.Error>{errors.company?.type}</S.Error>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Input
              ref={register({ required: true })}
              name={"email"}
              type={"email"}
              placeholder={"Email address*"}
            />
            <S.Error>{errors.email?.type}</S.Error>
          </S.InputWrapper>
          <S.CheckboxContainer>
            <div>
              <Checkbox
                ref={register({ required: true })}
                name={"acceptsDataTerms"}
                id={"acceptsDataTreatment"}
              />
              <label htmlFor={"acceptsDataTreatment"}>
                <span>I agree that Motherson saves my credentials*</span>
              </label>
              <S.Error>{errors.acceptsDataTerms?.type}</S.Error>
            </div>
            {/*@ts-ignore*/}
            <S.SubmitButton title={"Submit"} />
          </S.CheckboxContainer>
          <S.RequiredHint>*These fields are required</S.RequiredHint>
        </>
      ) : (
        <S.Title>
          We have received your request successfully. Our product managers will
          provide you all the available information within 24h during working
          days.
        </S.Title>
      )}
    </S.FormContainer>
  )
}
