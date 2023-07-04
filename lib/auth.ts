import {GoogleAuthProvider,signInWithPopup,signOut} from "firebase/auth"
import { auth } from '../firebase/firebase'

export const loginFunc = () => {

    const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider).then((result) => {
      alert (`${result.user.displayName}kanryou`)
    }).catch((e)=>console.log(e))
}

export const logoutFunc = () => {
    signOut(auth).then(() => {
    alert("logout")
  })
}