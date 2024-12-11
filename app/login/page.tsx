'use client'

import Link from "next/link"
import {useState} from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'


export default function LoginPage() {

  const [user, setUser] = useState({
    email: "",
    password: "",
  
  })


  const onLogin = async () =>{
    // talking to db
  }

  const router = useRouter()

  return (
    <>
      <div className="signup-container">
        <h1>
         Login Page 
        </h1>

        <br />

        <br />

        <label htmlFor="email">Email</label>
        <input
         id="email"
         type="text"
         placeholder="Enter your email" 
         value={user.email}
         onChange={(e)=> setUser({...user, email: e.target.value})} 
         />
        {/* line break */}
        <br />

        <label htmlFor="password">Password</label>
        <input
         id="password"
         type="text"
         placeholder="Enter your password" 
         value={user.password}
         onChange={(e)=> setUser({...user, password: e.target.value})} 
         />

      <button 
       onClick={onLogin}

      >Login</button>

      <Link href='/signup'>Dont have an account? Signup</Link>

      </div>
    </>
  )
}
