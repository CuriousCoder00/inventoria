"use client";
import LoginForm from '@/components/auth/login-form';
import Header from '@/components/landing/header';
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-dvh pt-16'>
        <Header/>
        <LoginForm/>
    </div>
  )
}

export default LoginPage
