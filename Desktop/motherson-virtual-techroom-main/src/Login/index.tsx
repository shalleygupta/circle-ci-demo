import React, { useEffect, useState } from "react"
import * as S from "./styled"
import { Input, SuffixContainerComponent } from "../components/Input"
import { useLoginHandlers } from "./useLogin"
import { Checkbox } from "../components/Checkbox"

export const Login: React.FC = () => {
  const { register, errors, onSubmitHandler, wrongCode } = useLoginHandlers()
  const [rendered, setRendered] = useState<boolean>(false)
  useEffect(() => setRendered(true), [])
  return (
    <S.Wrapper>
      {rendered && (
        <S.LogoWrapper>
          <S.Logo />
        </S.LogoWrapper>
      )}
      <S.Background>
        <S.Container onSubmit={onSubmitHandler}>
          <S.Title>Welcome to Motherson’s Techroom</S.Title>

          <Input
            placeholder="Enter your Techroom ID"
            id="code"
            name="code"
            autoFocus
            suffix={
              <SuffixContainerComponent as="button" type={"submit"}>
                <S.ArrowIcon />
              </SuffixContainerComponent>
            }
            ref={register({ required: true })}
          />
          <S.Error>
            {wrongCode
              ? "The provided ID is invalid."
              : errors.code && "This field is required."}
          </S.Error>

          <S.AcceptTerms>
            <Checkbox
              ref={register({ required: true })}
              id="acceptsTerms"
              name="acceptsTerms"
            />
            <label htmlFor="acceptsTerms">
              <span>
                Before entering our techroom we do ask you to accept our terms
                and conditions. <br />
                Please note that all information is strictly confidential.
              </span>
            </label>
          </S.AcceptTerms>
          <S.Error>
            {errors.acceptsTerms &&
              "Please read and accept our terms and conditions."}
          </S.Error>
        </S.Container>
      </S.Background>
    </S.Wrapper>
  )
}
