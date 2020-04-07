import * as React from "react"
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom"
import { useSession } from "../../containers/Session"
import { xor } from "../../lib/xor"

interface ProtectedRouteProps extends RouteProps {
  authRequired?: boolean
}

export const ProtectedRoute = ({
  authRequired,
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  const { basePath, signInPath, isLoggedIn } = useSession()

  const render = (props: RouteComponentProps) =>
    xor(isLoggedIn, authRequired) ? (
      <Redirect to={authRequired ? signInPath : basePath} />
    ) : (
      <Component {...props} />
    )

  return <Route {...{ render, ...rest }} />
}
