import React from 'react'
import Button from '../components/button'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { User } from '../types/user';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router';


function create_account() {
  const { isLoading, isLogIn } = useAuth();
  const router = useRouter();
  const isReady = router.isReady;

  console.log(router,'router',isReady);

  const { register, handleSubmit, formState: {
    errors
  },watch } = useForm<User>();

  const submit = (data: User) => {
    alert()
    console.log(data)
  }

  if (!isReady) {
    return null
  }
console.log("1",isLogIn)
  if (!isLoading) {
    return null
  }
console.log("2")
  if (!isLogIn) {
      console.log("3")
    router.push("/login")
    return null;
  }
  console.log("4")

  return (
    <div className='container'>
     <form onSubmit={handleSubmit(submit)}>
      <div>
        <label className='block mb-5' htmlFor="name">名前*</label>
        <input className={classNames("rounded border",errors.name?"border-red-500":"border-slate-300")} {...register("name", {
          required: "入力必至",
          maxLength: {
            value: 50,
            message:"50inai"
          }
        }
          )} type="text" name='name' autoComplete='name'/>
          {errors.name && <p className='text-red-500 mt-5'>{ errors.name?.message}</p>}
      </div>
      <div>
        <label className='block mb-5' htmlFor="naem">ニックネーム*</label>
        <input className={classNames("rounded border",errors.name?"border-red-500":"border-slate-300")} {...register("nickname", {
          required: "入力必至",
          maxLength: {
            value: 50,
            message:"50inai"
          }
        }
          )} type="text" name='nickname' autoComplete='off'/>
          {errors.nickname && <p className='text-red-500 mt-5'>{ errors.nickname?.message}</p>}
      </div>
       <div>
        <label className='block mb-5' htmlFor="naem">ぷろふ*</label>
        <textarea className={classNames("rounded border",errors.name?"border-red-500":"border-slate-300")}  {...register("profile", {
          required: "入力必至",
          maxLength: {
            value: 255,
            message:"255inai"
          }
        }
          )} name="profile" id="" defaultValue=""/>
          <p className='text-sm text-slate-400 leading-none'>{watch("profile")?.length ||0}/255</p>
          {errors.profile && <p className='text-red-500 mt-5'>{ errors.profile?.message}</p>}
        <Button>アカウント作成</Button>
      </div>
      </form>
    </div>
  )
}

export default create_account
