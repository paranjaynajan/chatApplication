import React from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Chat from "../Chat/Chat.jsx";

function Home() {
  return (
    <div className="bg-[#F5F7F8] flex h-screen justify-center items-center">
      <div className="border-[1px] shadow-2xl rounded-[10px] w-full max-w-[1200px] h-[90%] md:h-[80%] grid grid-cols-1 md:grid-cols-6 overflow-hidden">
        <div className="col-span-2 bg-[#495E57] h-full">
          <Sidebar />
        </div>
        <div className="col-span-4 hidden md:block w-full h-full">
          <Chat />
        </div>
      </div>
    </div>
  );
}


export default Home;
