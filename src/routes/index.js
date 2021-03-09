import React from "react"
import Loadable from "react-loadable"
import { BrowserRouter, Route, Switch } from "react-router-dom"

const AsyncAppV1 = new Loadable({
  loader: () => import(/* webpackChunkName: "appv1" */ "../containers/App"),
  loading: () => [],
})

const AsyncAppV2 = new Loadable({
  loader: () => import(/* webpackChunkName: "appv2" */ "../v2/containers/App"),
  loading: () => [],
})

const BaseRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/v2" component={AsyncAppV2} />
        <Route path="/" component={AsyncAppV1} />
      </Switch>
    </BrowserRouter>
  )
}

export default BaseRouter
