import firebase from "firebase/app"
import "firebase/auth"
import { createContext, useContext } from "react"

const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG)

export const FirebaseContext = createContext(firebaseApp)

export const useFirebase = () => useContext(FirebaseContext)
