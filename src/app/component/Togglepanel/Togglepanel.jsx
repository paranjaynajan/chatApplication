"use client";
import React, { useState,useEffect,useRef } from "react";
import Signin from "../Signin/Signin";
import SignUp from "../Signup/Signup";
import { motion } from "framer-motion"
import LoginWithMobile from "../PhoneLogin/PhoneLogin";

function Togglepanel() {
  const [toggle, setToggle] = useState(false);
  const [x, setX] = useState(0);
  const [x1, setX1] = useState(0);
  const [y,setY]=useState(0)
  const [y1,setY1]=useState(0)
  const [phoneLogin, setPhoneLogin] = useState(false)
  const [displayLogo,setDisplayLogo]=useState(true)
  const [rotate, setRotate] = useState(0);
  const animateFun = () => {
    const isLargeScreen = window.innerWidth > 835;
    const isMidScreen = window.innerWidth>900
    const newX = toggle ? 0 :isMidScreen? 450:400;
    const newX1 = toggle ? 0 :isMidScreen? -450:-400;
    const newY = 1000;
    const newY1 = -1000;
  
    if (isLargeScreen) {
      setX(newX);
      setX1(newX1);
    } else {
      setY(newY);
      setY1(newY1);
      setTimeout(() => {
        setY(0);
        setY1(0);
      }, 1000);
    }
  
    setToggle(!toggle);
  };
  

  return (<>
 

<div className="rounded-3xl grid grid-cols-1 md:grid-cols-2 shadow-2xl  h-[700px] w-full max-w-[900px] relative bg-[#F4CE14] mx-5 sm:mx-10  z-1">
<div className="clip md:block hidden   rounded-3xl absolute"></div>
    <div className={`clip2 md:hidden block bottom-0  rounded-3xl absolute`}></div>
  <div className="flex relative items-center w-full h-full">

  <motion.div
        className="box pb-0 pt-6 px-6 md:p-10 xl:p-14"
        animate={{ x ,y}}
        transition={{ type: "spring" }}
        style={{width: "100%"}}
      >
        {!toggle ?phoneLogin? <LoginWithMobile setPhoneLogin={setPhoneLogin}/>: <Signin setPhoneLogin={setPhoneLogin} /> : <SignUp />}
      </motion.div>
  </div>
   
    <motion.div
      className="box1"
      animate={{ x: x1,y:y1 }}
      transition={{ type: "spring" }}
    >
  <div className="flex  mb-2 justify-center items-start md:items-center h-full">
    {!toggle ?    <div className="flex z-20 flex-col gap-5 w-[60%]">
      <div className="md:flex hidden flex-col gap-5 ">
  <div className='text-center text-4xl font-bold mb-5'>Hello,friend</div>
  <div className="text-center mb-5 ">Register with your personal details to use all of the site features</div>
        </div>
      <button
        className="bg-black rounded-md px-7 py-3 w-full text-white box"
        onClick={animateFun}
      >
         SignUp 
      </button>
    </div>:    <div className="flex z-20 flex-col gap-5 w-[80%]">
      <div className="md:flex hidden flex-col gap-5 ">
  <div className='text-center text-4xl font-bold mb-5'>Welcome, Back!</div>
  <div className="text-center mb-5 ">Enter your personal details to use all of site features</div>
        </div>
      <button
        className="bg-black rounded-md px-7 py-3 text-white box"
        onClick={animateFun}
      >
        Login
      </button>
    </div>

    }

  </div>
    </motion.div>
</div>

  </>
  );
}

export default Togglepanel;
