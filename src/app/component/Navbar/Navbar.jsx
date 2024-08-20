import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import { getAuth, signOut } from "firebase/auth";
import app from "../../../utils/firebaseconfig";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation.js";
function Navbar() {
    const router = useRouter();
    const auth = getAuth(app);
    const [userData, setUserData] = useState("");
    useEffect(() => {
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        if (user) setUserData(user);
    }, []);
    return (
       <div className="bg-[#F4CE14] rounded-l-[10px] py-4 px-5 flex items-center justify-between">
    <div className="text-xl font-[600]">MyChat</div>
    <div className=" flex gap-2">
        <Tooltip title={userData?.displayName} className="cursor-pointer ">
           {userData?.photoURL?<div className='rounded-full h-[45px] w-[45px] border-2 border-black overflow-hidden'>
                 <Image
                    height={45}
                    width={45}
                    className="object-cover !h-full !w-full"
                    alt={userData?.displayName}
                    src={userData?.photoURL}
                    onClick={() => { router.push("/profile") }}
                /> 
            </div>:<Avatar  alt={userData?.displayName}
                    src={userData?.photoURL}  onClick={() => { router.push("/profile") }}/>} 
        </Tooltip>

        <button 
            onClick={() => {
                localStorage.clear();
                signOut(auth);
            }}
            type="button"
            className=" xs:p-2 p-2  border-[2px] cursor-pointer rounded-md border-black bg-[black] text-white"
        >
            Logout
        </button>
    </div>
</div>

    );
}

export default Navbar;
