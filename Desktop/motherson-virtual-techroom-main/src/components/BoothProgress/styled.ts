import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
`

export const Label = styled.div`
  display: block;
`

export const Message = styled.div`
  font-size: 9px;
  font-weight: 500;
  line-height: 12px;
  opacity: 0.6;
  margin-right: 20px;
`

export const Counter = styled(Message)`
  opacity: 1;
`

export const Progress = styled.div`
  height: 2px;
  background: white;
  width: 100%;
  flex: 1;
  position: relative;
`

export const ProgressBar = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #da2020;
  width: ${props => props.percentage * 100}%;
  transition: all 250ms ease-out;
  box-sizing: border-box;
`
