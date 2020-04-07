import * as React from "react"
import { BrowserRouter } from "react-router-dom"
import { ProtectedRoute } from "../../components/ProtectedRoute"
import { Dashboard } from "../../pages/Dashboard"
import { SignIn } from "../../pages/SignIn"
import { useFirebase } from "../Firebase"
import { useSession } from "../Session"

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
