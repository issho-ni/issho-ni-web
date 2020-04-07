import * as React from "react"
import { StyledFirebaseAuth } from "react-firebaseui"
import { useFirebase } from "../../containers/Firebase"

const uiConfig: firebaseui.auth.Config = {
  signInFlow: "popup",
  signInOptions: FIREBASE_SIGN_IN_OPTIONS,
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
}

export const SignIn = () => {
  const app = useFirebase()

  return <StyledFirebaseAuth firebaseAuth={app.auth()} uiConfig={uiConfig} />
}
