import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./containers/App"
import { SessionProvider } from "./containers/Session"

const app = document.createElement("div")
document.body.prepend(app)

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback="Loading…">
      <SessionProvider>
        <App />
      </SessionProvider>
    </React.Suspense>
  </React.StrictMode>,
  app
)
