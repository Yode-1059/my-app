import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import {auth} from "../firebase/firebase"

type ContextType = {
    isLogIn: boolean,
    isLoading:boolean
}

const AuthContext = createContext<ContextType>({
    isLogIn: false,
    isLoading:true
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isLogIn, setIsLogIn] = useState(false)
    const [moji,setMoji]=useState("aa")
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log("!!user",!!user)
            setIsLogIn(!!user)
            console.log("isLogin",isLogIn);
            setIsLoading(false)
            setMoji("nikaimejikkou")
            console.log(moji,'moji');
        })
        console.log(isLogIn,"isLogIn",isLoading,"isLoading",moji)
    }, [])
  useEffect(() => {
    console.log("28 isLogIn",isLogIn) // 更新後のstateをコンソールに表示したい
    console.log(moji,'moji');
  }, [isLogIn])

    return (
        <AuthContext.Provider value={{ isLoading, isLogIn }} >
            { children }
        </AuthContext.Provider>
    );
}

export const useAuth=()=>useContext(AuthContext)