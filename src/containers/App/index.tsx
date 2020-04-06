import * as React from "react"
import { useFirebase } from "../Firebase"

export const App = () => {
  const firebase = useFirebase()

  return <div>Hello, {firebase.name}!</div>
}
