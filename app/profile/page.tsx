'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function Profile() {

  const router = useRouter();


  const logOut = async () =>{
      try {
        
        await fetch("/api/users/logout")
        router.push("/login")
      } catch (error:any) {
          console.error("error while loggin out ", error.message)        
      }
  }


  return (
    <>
      <h1>profile page</h1> <br/> <br />

      <button onClick={logOut}>
        logout
      </button>
    </>
  )
}
