import React from "react"
import { Provider } from "react-redux"
import CssBaseline from "@material-ui/core/CssBaseline"

import configureStore from "../redux/rootStore"

import Home from "./Home"

const store = configureStore()

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <CssBaseline />
        <Home />
      </Provider>
    </div>
  )
}

export default App
