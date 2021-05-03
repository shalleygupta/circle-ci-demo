import React, { ReactElement, useCallback, useEffect, useState } from "react"
import * as S from "./styled"
//@ts-ignore
import { ReactComponent as Arrow } from "../../icons/ic-dropdown-arrow.svg"
import { Checkbox } from "../Checkbox"
import { useFocusWithin } from "@react-aria/interactions"

export const ProductsDropdown: React.FC<{
  label: string
  value: string[]
  onChange: (value: string[]) => any
  children: ReactElement<
    HTMLOptGroupElement & { children: ReactElement<HTMLOptionElement> }
  >[]
}> = ({ label, value, onChange, children, ...props }) => {
  const [tempValue, setTempValue] = useState<string[]>(value || [])
  useEffect(() => setTempValue(value || []), [value])

  const [focused, onFocusWithinChange] = useState<boolean>(false)
  const onBlurWithin = useCallback(() => {
    if (tempValue.sort().join("") !== value.sort().join("")) {
      onChange(tempValue)
    }
  }, [tempValue])
  const { focusWithinProps } = useFocusWithin({
    onBlurWithin,
    onFocusWithinChange,
  })
  const toggle = useCallback((key: string) => {
    setTempValue(v => {
      if (v.includes(key)) return v.filter(vk => key !== vk)
      return [...v, key]
    })
  }, [])
  return (
    <S.Container role="listbox" open={focused} {...props} {...focusWithinProps}>
      <S.Title tabIndex={focused ? 0 : 0}>
        <span>{label}</span> <Arrow />
      </S.Title>
      <S.OptionsContainer tabIndex={0} open={focused}>
        {React.Children.map(children, c => (
          <React.Fragment key={c.key || c.props.label}>
            <S.OptionGroupLabel>{c.props.label}</S.OptionGroupLabel>
            {React.Children.map(c.props.children, o => (
              <S.Option key={o.key} tabIndex={0} role="option">
                <Checkbox
                  checked={tempValue?.includes(o.props.value)}
                  onChange={() => toggle(o.props.value)}
                  id={o.props.value}
                />
                <label htmlFor={o.props.value}>
                  <S.Label>{o.props.children}</S.Label>
                </label>
              </S.Option>
            ))}
          </React.Fragment>
        ))}
      </S.OptionsContainer>
    </S.Container>
  )
}
