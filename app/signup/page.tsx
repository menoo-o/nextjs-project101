'use client'

import Link from "next/link"
import {lazy, useEffect, useState} from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'

import { log } from "console"


export default function SignUpPage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
    username:"",
  })

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading ] = useState(false);

  useEffect( ()=>{
    if (user.email.length > 0  && user.password.length >0 ){
      setBtnDisabled(false);
    } else{
      setBtnDisabled(true);
    }
  }, [user] );


  const onSignUp = async () =>{
    try{
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch(error:any){
      console.log("signup failed" , error.message);
      alert(" smth caused signup failure")
    } finally{
      setLoading(false);
    }
  
  }

  

  return (
    <>
      <div className="signup-container">
        <h1>
         {loading ? "Processing" : "Signup"} 
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
     <br /> <br />
      <button 
       onClick={onSignUp}

      //  inject some css here instead!
      >{btnDisabled ? "Pls enter" : "SignUp"}</button>

      <br /> <br />

      <Link href='/login'>Already have a account? Login</Link>

      </div>
    </>
  )
}
