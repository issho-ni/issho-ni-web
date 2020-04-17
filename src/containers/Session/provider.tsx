import * as React from "react"
import { useFirebase } from "../Firebase"
import { Session, SessionContext } from "./context"

type SessionProviderProps = Omit<Session, "initialized" | "isLoggedIn">

const sessionReducer: React.Reducer<Session, firebase.User> = (
  session,
  user
) => ({
  ...session,
  initialized: true,
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
    initialized: false,
    isLoggedIn: false,
  })

  const handleAuthStateChanged = (user: firebase.User) => {
    dispatch(user)
  }

  React.useEffect(
    () => app.auth().onAuthStateChanged(handleAuthStateChanged),
    []
  )

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}
