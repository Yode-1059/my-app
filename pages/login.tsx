import Button from "../components/button"
import { loginFunc, logoutFunc } from "../lib/auth"


const login = () => {
  return (
    <div>
       <h1 className="text-3xl py-2 font-bold underline">
      Hello world!
    </h1>
      <Button onClick={loginFunc}>ログイン</Button>
      <Button onClick={logoutFunc}>ログアウト</Button>
    </div>
  )
}

export default login
