import React from "react"
import * as S from "./styled"

export const BoothProgress: React.FC<{
  total: number
  viewed: number
}> = ({ total, viewed, ...props }) => {
  return (
    <S.Container {...props}>
      <S.Label>
        <S.Message>Discover our products</S.Message>
        <S.Counter>{`${viewed} of ${total}`}</S.Counter>
      </S.Label>
      <S.Progress>
        <S.ProgressBar percentage={viewed / total} />
      </S.Progress>
    </S.Container>
  )
}
