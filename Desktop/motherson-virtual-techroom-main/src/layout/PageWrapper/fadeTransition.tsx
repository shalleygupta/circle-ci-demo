import React from "react"
import { Transition, TransitionGroup } from "react-transition-group"

const timeout = 250

const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0.5,
    width: "100%",
    height: "100%",
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 1,
    height: "100%",
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 0,
    height: "100%",
  },
}

//@ts-ignore
export const Fade = ({ children, location, key }) => (
  <TransitionGroup>
    <Transition
      key={key || location?.pathname.split("#")[0]}
      timeout={{
        enter: timeout,
        exit: timeout,
      }}
    >
      {/*@ts-ignore*/}
      {status => <div style={getTransitionStyles[status]}>{children}</div>}
    </Transition>
  </TransitionGroup>
)

//@ts-ignore
export const FadeTransition = props => {
  return (
    <Transition
      addEndListener={(node, done) => {
        node.addEventListener("transitionend", done, false)
      }}
      key={props.transitionKey}
      timeout={{
        enter: timeout,
        exit: timeout,
      }}
    >
      {status => (
        /*@ts-ignore*/
        <div style={getTransitionStyles[status]}>{props.children}</div>
      )}
    </Transition>
  )
}
