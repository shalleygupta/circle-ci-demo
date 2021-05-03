import React from "react"
import { PageProps } from "gatsby"
import {
  HashRouter,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom"
import { Preloader } from "./routes/Preloader"
import { EventGuard } from "./guard"
import { Event } from "./routes/Event"
import { WithProductInterestsContext } from "../context/InterestsContext"

import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

export const EventApp: React.FC<PageProps> = ({
  location: { pathname: basePath },
}) => (
  <HashRouter basename={basePath}>
    <Switch>
      {/*Wrapping the app so that we can have a guard route component easily*/}
      <Route path={[`/:slug?`]} component={WrappedApp} />
    </Switch>
  </HashRouter>
)

const WrappedApp: React.FC<RouteComponentProps<{ slug: string }>> = props => {
  return (
    <WithProductInterestsContext>
      <ToastContainer position={"top-left"} />
      <HashRouter>
        <EventGuard slug={props.match.params.slug} />
        <Switch>
          <Route
            exact
            component={Event}
            path={[
              "/:slug/scene/",
              "/:slug/scene/:booth?",
              "/:slug/scene/:booth/:product",
              "/:slug/checkout",
            ]}
          />
          <Route path={[`/:slug?`, "/"]} component={Preloader} />
        </Switch>
      </HashRouter>
    </WithProductInterestsContext>
  )
}
