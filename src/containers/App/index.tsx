import * as React from "react"
import { BrowserRouter } from "react-router-dom"
import { ProtectedRoute } from "../../components/ProtectedRoute"
import { useFirebase } from "../Firebase"
import { useSession } from "../Session"

const Dashboard = React.lazy(() =>
  import("../../pages/Dashboard").then((module) => ({
    default: module.Dashboard,
  }))
)

const SignIn = React.lazy(() =>
  import("../../pages/SignIn").then((module) => ({ default: module.SignIn }))
)

export const App = () => {
  const app = useFirebase()
  const { isLoggedIn } = useSession()

  return (
    <>
      {isLoggedIn && (
        <>
          Welcome, {`${app.auth().currentUser.displayName}`}
          <button type="button" onClick={() => app.auth().signOut()}>
            Sign Out
          </button>
        </>
      )}
      <BrowserRouter>
        <ProtectedRoute authRequired exact path="/" component={Dashboard} />
        <ProtectedRoute path="/sign-in" component={SignIn} />
      </BrowserRouter>
    </>
  )
}
