import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from '../../../utils/firebaseconfig.js'
import { Tooltip } from '@mui/material';
function Navbar() {
    const auth = getAuth(app);
    const [userData,setUserData]=useState("")
    useEffect(()=>{
      let  user=  localStorage.getItem('user')
      user= JSON.parse(user)
      setUserData(user.displayName)
    },[])
    return (
        <div className='bg-[#F4CE14] py-5 px-5 flex items-center justify-between'>
            <div className='text-xl' >
                Navbar
            </div>
            <div className='flex justify-center items-center gap-2'>
                <Tooltip title={userData} className='cursor-pointer'>
                <Avatar alt={userData} src="/images/avatar/1.jpg" />
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