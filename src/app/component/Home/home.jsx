import React from 'react'
import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth";
import app from "../../../utils/firebaseconfig.js"
function Home({userData}) {
  const auth = getAuth(app);
  return (
    <div className='flex flex-col gap-2 justify-center items-center'>
      <h1 className='text-lg font-bold'>
        Hello,{userData.email}
        </h1>
    <button  className=" xs:p-4 p-2  border-[2px] rounded-md border-black bg-black text-white" onClick={()=>signOut(auth)}>SignOut</button>
    </div>
  )
}

export default Home