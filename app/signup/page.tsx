'use client'

import Link from "next/link"
import {useState} from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'


export default function SignUpPage() {

  const [user, setUser] = useState({
    email: "",
    password: "",
    username:"",
  })


  const onSignUp = async () =>{
    // talking to db
  }

  const router = useRouter()

  return (
    <>
      <div className="signup-container">
        <h1>
         SignUp Page 
        </h1>

        <br />

        <label htmlFor="username">Username</label>
        <input
         id="username"
         type="text"
         placeholder="Enter your Username" 
         value={user.username}
         onChange={(e)=> setUser({...user, username: e.target.value})} 
         />

        <br />

        <label htmlFor="username">Email</label>
        <input
         id="email"
         type="text"
         placeholder="Enter your email" 
         value={user.email}
         onChange={(e)=> setUser({...user, email: e.target.value})} 
         />

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
       onClick={onSignUp}

      >Singup</button>

      <Link href='/login'>Already have a account? Login</Link>

      </div>
    </>
  )
}
