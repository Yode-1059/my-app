import { initializeApp,getApps } from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getFunctions} from "firebase/functions"
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDUCCDJCBRDM3fGLZYQQ3qg8b29Vyorrdg",
  authDomain: "fir-35245.firebaseapp.com",
  projectId: "fir-35245",
  storageBucket: "fir-35245.appspot.com",
  messagingSenderId: "470571905241",
  appId: "1:470571905241:web:978d564b9f81fec18fcec8"
};

if (!getApps()?.length) {
 const app = initializeApp(firebaseConfig);
}


export const db = getFirestore()
export const auth = getAuth()
export const functions=getFunctions()
export const storage=getStorage()