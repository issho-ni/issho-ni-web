import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./containers/App"
import { SessionProvider } from "./containers/Session"

const app = document.createElement("div")
document.body.prepend(app)

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </React.StrictMode>,
  app
)
