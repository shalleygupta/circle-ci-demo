import React from "react"
import { GridLayout } from "../GridLayout"
import { AppSidebar } from "../components/AppSidebar"
import styled, { createGlobalStyle } from "styled-components"
import { EventBg } from "../components/Backgrounds"
import { AppHeader } from "../components/AppHeader"
import { useParams } from "react-router-dom"
import { animated, useTransition } from "react-spring"
import device from "../theme/devices"
import { WithMobileMenuContext } from "../context/MobileMenuContext"
import { WithHeaderContext } from "../context/EventHeaderContext"
import { WithSidebarContext } from "../context/EventSidebarContext"

const WrapperGridLayout = styled(animated(GridLayout))`
  min-height: 100%;
  grid-template-rows: auto 1fr;
`

const Main = styled(animated.main)<{ collapsed?: boolean }>`
  grid-row: 2;
  grid-column: 1 / 8;
  grid-template-rows: auto 1fr auto;
  @media (${device.desktop}) {
    grid-column: ${props => (props.collapsed ? "3 / 15" : "5 / 15")};
    margin-left: -20px;
  }
`

export const EventLayout: React.FC = props => {
  const params = useParams<{ booth: string; product: string }>()

  return (
    <>
      <EventBg />
      <WrapperGridLayout withMarginCols>
        <InnerEventLayout collapsed={!!params.product}>
          {props.children}
        </InnerEventLayout>
      </WrapperGridLayout>
    </>
  )
}

const ToastContainerStyles = createGlobalStyle<{ sidebarCollapsed: boolean }>`
  .Toastify__toast-container {
    @media (${device.desktop}) {
      left: ${props => (props.sidebarCollapsed ? 10 : 26)}%;

    }  
    color: ${props => props.theme.textColor};
    font-family: Graphik;
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: 16px;

  .Toastify__toast {
    background: #FFFFFF;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    border-radius: 0;
    border: none;
    width: 308px;
    height: 47px;
  }
  
  .Toastify__toast-body {
    display: flex;
    align-items: center;
  }  
    
  .Toastify__close-button {
    display: none;
  }
    
  }
  .Toastify__progress-bar {
    background: ${props => props.theme.primaryColor};
    height: 2px;
    border-radius: 0;
  }

`

const InnerEventLayout: React.FC<{ collapsed: boolean }> = props => {
  const params = useParams<{ booth: string; product: string }>()
  const [mainTransition] = useTransition(
    { children: props.children, cols: params.product ? 11 : 9 },
    {
      from: { opacity: 0, position: "absolute" },
      enter: { opacity: 1, position: "relative" },
      leave: { opacity: 0 },
      expires: -2,
      unique: false,
      reset: true,
    },
    [params.booth, params.product]
  )

  return (
    <WithHeaderContext>
      <WithSidebarContext>
        <WithMobileMenuContext>
          <AppHeader collapsed={props.collapsed} />
          <ToastContainerStyles sidebarCollapsed={props.collapsed} />
          <AppSidebar />
        </WithMobileMenuContext>
        {mainTransition((style, { children, cols }) => (
          <GridLayout
            as={Main}
            withMarginCols
            cols={cols}
            style={style}
            collapsed={props.collapsed}
          >
            {children}
          </GridLayout>
        ))}
      </WithSidebarContext>
    </WithHeaderContext>
  )
}
