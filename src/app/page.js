"use client"
import Togglepanel from "@/app/component/Togglepanel/Togglepanel";
import { useEffect, useState } from "react";
import Home from "@/app/component/Home/home"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '../utils/firebaseconfig'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
const auth = getAuth(app);
const db = getFirestore(app);
export default function () {
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUserData(user)

        setUserDatatoLocalStorage(user)
      
      }else{
        setUserData(null)
      }
    })
  }, [])


  const setUserDatatoLocalStorage =async(user)=>{
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot) {           
      querySnapshot.forEach((doc) => {
        console.log(doc,"user")
        const data = doc.data();
        const newUser=JSON.stringify(data)
        localStorage.setItem('user',newUser)
        
      });
    }
  }

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
