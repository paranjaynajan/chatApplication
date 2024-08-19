import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from '../../../utils/firebaseconfig.js'
import { Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation.js';
function Navbar() {
    const router =useRouter()
    const auth = getAuth(app);
    const [userData,setUserData]=useState("")
    useEffect(()=>{
      let  user=  localStorage.getItem('user')
      user= JSON.parse(user)
      if(user)
      setUserData(user)
    },[])
    return (
        <div className='bg-[#F4CE14] rounded-t-[10px] py-4 px-5 flex items-center justify-between'>
            <div className='text-xl font-[600]' >
                MyChat
            </div>
            <div className='flex justify-center items-center gap-2'>
                <Tooltip title={userData?.username} className='cursor-pointer'>
                <Avatar alt={userData?.username} src={userData.photoUrl} onClick={()=>{console.log("ja");router.push("/profile")}} />
                </Tooltip>
               
                <button
                onClick={() => signOut(auth)}
                    type="button"
                    className=" xs:p-2 p-2 w-full border-[2px] cursor-pointer    rounded-md border-black bg-[black] text-white"
                >
                    Logout
                </button>
            </div>


        </div>
    )
}

export default Navbar