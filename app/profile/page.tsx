'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { log } from 'node:console';
import axios from 'axios';
import Link from 'next/link';

export default function Profile() {
  const [data, setData] = useState('nothing') // State for user id
  const router = useRouter();

  // useEffect(() => {
  //   // Async function to fetch user data
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('/api/users/me');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch user data');
  //       }

  //       const res = await response.json();
  //       console.log('getting user id');
        
  //       console.log(res); // Debugging: See full user data in console

  //       setId(res.data.data._id); // Assuming `id` is a property inside `data.user`
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchUserData(); // Call the async function
  // }, []); // Empty dependency array ensures it runs only once

  const getUserDetails = async() =>{
    const res = await axios.get('api/users/me')
    console.log(res.data);
    setData(res.data.data.username)
  }

  const logOut = async () => {
      try {
        
        await fetch("/api/users/logout")
        router.push("/login")
      } catch (error:any) {
          console.error("error while loggin out ", error.message)        
      }
  }


  return (
    <>
      <h2>Profile</h2>
      <h3>{data === 'nothing' ? "xxx" : <Link href={`/profile/${data}`}>
        {data}
      </Link>}</h3>
      <br />
      <br />

      <button onClick={logOut}>Logout</button> <br />  <br />
      <button onClick={getUserDetails}>getUserDetails</button>
    </>
  );
}
