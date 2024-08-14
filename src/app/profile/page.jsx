"use client";
import React, { useEffect, useState } from "react";
import wall from "../../../public/images/wallpaepr.png";
import Profileform from "../component/ProfileForm/Profileform";
import Image from "next/image";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from "next/navigation";
const Profile = () => {
  const router =useRouter()
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user);
    setUserInfo(userData);
  }, []);
  console.log();
  const changeProfilePic = (e) => {
    console.log(e.target.file[0]);
  };
  return (
    <div className="bg-[#F5F7F8] flex h-screen   justify-center items-center p-6 sm:p-10">
      <div className="border-[1px] shadow-2xl rounded-[10px] w-full  max-w-[900px] h-[100%]  grid grid-cols-1 md:grid-cols-6 ">
        <div
          className={`col-span-2 flex-col gap-2 rounded-[10px] bg-[#495E57] shadow-r-lg h-full flex justify-center items-center `}
        >
           
          <label
            htmlFor="profilePicInput"
            className="relative shadow-2xl h-[170px] w-[170px] rounded-full border-[3px] border-[#F4CE14] overflow-hidden group cursor-pointer"
          >
            <Image
              src={wall}
              alt="user"
              className="object-cover h-full w-full"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-75 flex items-center justify-center transition-opacity duration-300">
              <div className="text-center flex flex-col gap-2 items-center text-white">
                <ModeEditOutlineIcon />
                <p className="text-md">Change Profile Picture</p>
              </div>
            </div>
            <input
              id="profilePicInput"
              type="file"
              className="hidden"
              onChange={changeProfilePic}
            />
          </label>
          <div className="text-xl font-[600]">Hello,{userInfo?.displayName}</div>
          <div className="flex justify-center items-center cursor-pointer" onClick={() => {router.back()  }}>
          <div className=''  >
            <KeyboardBackspaceIcon />
          </div>
          <div className="text-xl font-[400]">
          Back
          </div>
          </div>
        </div>
        <div className={`col-span-4  md:col-span-4 w-full h-full `}>
          <Profileform />
        </div>
      </div>
    </div>
  );
};
export default Profile;
