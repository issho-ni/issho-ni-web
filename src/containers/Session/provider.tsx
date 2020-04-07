import * as React from "react"
import { useFirebase } from "../Firebase"
import { Session, SessionContext } from "./context"

type SessionProviderProps = Omit<Session, "isLoggedIn">

const sessionReducer = (session: Session, user: firebase.User) => ({
  ...session,
  isLoggedIn: !!user,
})

export const SessionProvider = ({
  basePath = "/",
  signInPath = "/sign-in",
  children,
}: React.PropsWithChildren<SessionProviderProps>) => {
  const app = useFirebase()
  const [session, dispatch] = React.useReducer(sessionReducer, {
    basePath,
    signInPath,
    isLoggedIn: false,
  })

  const handleAuthStateChanged = (user: firebase.User) => {
    !!user !== session.isLoggedIn && dispatch(user)
  }

  React.useEffect(() => app.auth().onAuthStateChanged(handleAuthStateChanged), [
    session,
  ])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}
