import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'

interface Props { }

interface Inputs {
  email: string
  password: string
}

const Login = (props: Props) => {
  const { signIn, signUp, error } = useAuth()

  const [login, setLogin] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data
    if(login) {
      await signIn(email, password)
    }else {
      await signUp(email, password)
    }
  }

  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
      <Head>
        <title>Netflix</title>
      </Head>

      <Image
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d0982892-13ac-4702-b9fa-87a410c1f2da/519e3d3a-1c8c-4fdb-8f8a-7eabdbe87056/AE-en-20220321-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt='Netflix'
        fill
        className='-z-10 !hidden opcaity-60 sm:!inline'
        style={{ objectFit: 'cover' }}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
      >
        <h1 className='text-3xl font-bold text-white'>Sign In</h1>
        <div className="space-y-4">
          <label htmlFor="email" className='inline-block w-full'>
            <input 
              type="email" 
              placeholder='Email' 
              className='input' 
              {...register("email", { required: true })}
            />
            {errors.email && <p className='p-1 text-[13px] font-light text-orange-500'>Please enter a valid email.</p>}
          </label>
          <label htmlFor="password" className='inline-block w-full'>
            <input 
              type="password" 
              placeholder='Password' 
              className='input' 
              {...register("password", { required: true })}
            />
            {errors.password && <p className='p-1 text-[13px] font-light text-orange-500'>Your password must contain between 4 and 60 chracters.</p>}
          </label>
        </div>

        {error && <p className='p-0 text-[13px] font-light text-orange-500'>{error}</p>}

        <button type='submit' onClick={() => setLogin(true)} className='w-full rounded bg-[#e50914] py-3 font-semibold'>Sign In</button>

        <div className='text-[gray]'>
          New to Netflix? 
          <button type="submit" className='text-[white] hover:underline' onClick={() => setLogin(false)}>Sign up now.</button>
        </div>
      </form>
    </div>
  )
}

export default Login