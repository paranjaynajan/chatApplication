import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Chat from "../Chat/Chat.jsx";

function Home() {
  const [friendId, setFriendId] = useState(null);

  return (
    <div className="bg-[#F5F7F8] flex h-screen   justify-center items-center  p-6 sm:p-10">
      <div style={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"}}
       className="border-[1px]  rounded-[10px] w-full  max-w-[1200px] h-[100%]  
       grid grid-cols-1 md:grid-cols-6 ">
        <div className={` md:col-span-3 rounded-l-[10px] lg:col-span-2 bg-[#495E57] shadow-r-lg h-full ${friendId && 'hidden md:block'}`}>
          <Sidebar setFriendId={setFriendId} />
        </div>
        <div className={`col-span-4 rounded-r-[10px]  md:col-span-3 lg:col-span-4 w-full h-full ${!friendId && 'hidden md:block'}`}>
          <Chat friendId={friendId} setFriendId={setFriendId} />
        </div>
      </div>
    </div>
  );
}

export default Home;
