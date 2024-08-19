"use client"
import Togglepanel from "@/app/component/Togglepanel/Togglepanel";
import { useEffect, useState } from "react";
import Home from "@/app/component/Home/home"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '../utils/firebaseconfig.js'
const auth = getAuth(app);
export default function () {
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUserData(user)
        console.log(user,"17")
        const obj={displayName:user?.displayName,email: user?.email,photoURL:user?.photoURL,uid:user?.uid}
       const newUser=JSON.stringify(obj)
        localStorage.setItem('user',newUser)
      }else{
        setUserData(null)
      }
    })
  }, [])

  if (!userData) {
    return (
      <div className=" flex justify-center items-center min-h-screen bg-[#F5F7F8]">
        <Togglepanel />
      </div>
    )
  }
  return (
    <div>
      <Home/>
    </div>
  );
}
