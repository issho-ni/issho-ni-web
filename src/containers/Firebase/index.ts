import firebase from "firebase/app"
import { createContext, useContext } from "react"

const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG)

export const FirebaseContext = createContext(firebaseApp)

export const useFirebase = () => useContext(FirebaseContext)
