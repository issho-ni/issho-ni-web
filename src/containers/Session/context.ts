import { Context, createContext, useContext } from "react"

export interface Session {
  basePath?: string
  signInPath?: string
  initialized: boolean
  isLoggedIn: boolean
}

export const SessionContext: Context<Session> = createContext(undefined)

export const useSession = () => {
  const session = useContext(SessionContext)

  if (session === undefined) {
    throw new Error("useSession must be called within a SessionProvider")
  }

  return session
}
