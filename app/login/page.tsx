'use client'

import Link from "next/link"
import {useState, useEffect} from "react"

import { useRouter } from 'next/navigation'
import { trackSynchronousPlatformIOAccessInDev } from "next/dist/server/app-render/dynamic-rendering"
import { log } from "console"


export default function LoginPage() {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState("Login Page");
  const [user, setUser] = useState({
    email: "",
    password: "",
  
  })
  const [loading, setLoading] = useState(false);
  
  const [btnDisabled, setbtnDisabled] = useState(false);

 useEffect(()=>{
    if (user.email.length > 0 && user.password.length >0) {
      setbtnDisabled (false);
    } else{
      setbtnDisabled(true)
    }
  
 }, [user])

  const onLogin = async () =>{
    try {

      setLoading(true);
      setStatusMessage("Processing...");
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers:{
          "Content-Type" : "application/json", 
        },
        body: JSON.stringify(user),
      } )
  
      if (!response.ok) {
        // Handle non-2xx status codes
        throw new Error(`Login failed: ${response.statusText}`);
      }
  
      const data = await response.json(); // Parse JSON response
      console.log(data);
  
      setStatusMessage("Login Successful");

      // Redirect to profile on success
      router.push("/profile");
    } catch (error:any) {
      console.log("error happened! why because: ", error.message)
      alert(`Login Failed: ${error.message}`);
      setStatusMessage("Login Page"); // Reset to initial message
    } finally{
      setLoading(false);
    }
  }



  return (
    <>
      <div className="signin-container">
      
        <h1>{statusMessage}</h1>
        <br /><br />

        <label htmlFor="email">Email</label>
        <input
         id="email"
         type="text"
         placeholder="Enter your email" 
         value={user.email}
         onChange={(e)=> setUser({...user, email: e.target.value})} 
         /> <br />
        
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
