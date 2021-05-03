import React, { InputHTMLAttributes } from "react"
//@ts-ignore
import { ReactComponent as Arrow } from "../../icons/ic-arrow-top-right.svg"
import * as S from "./styled"

export const Input = React.forwardRef<
  any,
  InputHTMLAttributes<any> & { suffix?: any; wrapperProps?: any }
>(({ suffix, wrapperProps = {}, ...props }, ref) => (
  <S.Wrapper {...wrapperProps}>
    <S.ActualInput ref={ref} {...props} />
    {suffix}
  </S.Wrapper>
))

export const SuffixContainerComponent = S.SuffixContainer
export const ArrowPointingRightUpSuffixComponent = Arrow
export const ArrowPointingRightUpSuffix = <Arrow />
