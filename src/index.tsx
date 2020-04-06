import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./containers/App"

const app = document.createElement("div")
document.body.prepend(app)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  app
)
