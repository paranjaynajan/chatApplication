import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Chat from "../Chat/Chat.jsx";

function Home() {
  const [friendId, setFriendId] = useState(null);

  return (
    <div className="bg-[#F5F7F8] flex h-screen   justify-center items-center px-10">
      <div className="border-[1px] shadow-2xl rounded-[10px] w-full overflow-y-scroll md:scroll-container2 max-w-[1200px] h-[100%] md:h-[80%] grid grid-cols-1 md:grid-cols-6 ">
        <div className={`col-span-2 bg-[#495E57] shadow-r-lg h-full ${friendId && 'hidden md:block'}`}>
          <Sidebar setFriendId={setFriendId} />
        </div>
        <div className={`col-span-4 md:col-span-4 w-full h-full ${!friendId && 'hidden md:block'}`}>
          <Chat friendId={friendId} setFriendId={setFriendId} />
        </div>
      </div>
    </div>
  );
}

export default Home;
