import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import { Avatar, InputAdornment, TextField } from '@mui/material';
import friends from "@/utils/jsonData"
function Sidebar({setFriendId}) {
  const [filteredFriends, setFilteredFriends] = useState([]);
  const fetchFriends = async () => {
    setFilteredFriends(friends);
  };

  useEffect(() => {
    fetchFriends();
  }, []);


  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <Search friends={friends} setFilteredFriends={setFilteredFriends} />
      <ul className=" overflow-auto h-[700px] scroll-container1  pb-[125px] md:pb-[135px]"
      >
        {filteredFriends.map((friend, index) => (
          <li
            key={index}
            className="px-4 py-2 cursor-pointer text-black flex items-center gap-2 border-b-[1px] border-[black]"
            onClick={() => {setFriendId(friend.userId)}}
          >
            <Avatar
              src={friend.profile_pic}
              alt={friend.name}
              className="w-6 h-6 rounded-full mr-2"
            />
            <div className="flex flex-col gap-2">
              <div >{friend.name}</div>
              <div className="text-sm">{friend.lastText}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Sidebar