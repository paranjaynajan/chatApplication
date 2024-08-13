import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import { Avatar, InputAdornment, TextField } from '@mui/material';
const friends = [
  {
    userId: "1",
    name: "Alex",
    profile_pic: "https://example.com/alex.jpg",
    lastText: "Hey, how are you?",
  },
  {
    userId: "2",
    name: "Jordan",
    profile_pic: "https://example.com/jordan.jpg",
    lastText: "Did you see the game last night?",
  },
  {
    userId: "3",
    name: "Taylor",
    profile_pic: "https://example.com/taylor.jpg",
    lastText: "Let’s catch up sometime!",
  },
  {
    userId: "4",
    name: "Morgan",
    profile_pic: "https://example.com/morgan.jpg",
    lastText: "I'll send you the documents by evening.",
  },
  {
    userId: "5",
    name: "Casey",
    profile_pic: "https://example.com/casey.jpg",
    lastText: "Can you join the call at 3 PM?",
  },
  {
    userId: "6",
    name: "Jamie",
    profile_pic: "https://example.com/jamie.jpg",
    lastText: "Got the tickets for the concert!",
  },
  {
    userId: "7",
    name: "Riley",
    profile_pic: "https://example.com/riley.jpg",
    lastText: "See you at the gym tomorrow!",
  },
  {
    userId: "8",
    name: "Sam",
    profile_pic: "https://example.com/sam.jpg",
    lastText: "Happy Birthday! 🎉",
  },
  {
    userId: "9",
    name: "Charlie",
    profile_pic: "https://example.com",
    lastText: "Happy Birthday! 🎉",
  },  {
    userId: "5",
    name: "Casey",
    profile_pic: "https://example.com/casey.jpg",
    lastText: "Can you join the call at 3 PM?",
  },
  {
    userId: "5",
    name: "Casey",
    profile_pic: "https://example.com/casey.jpg",
    lastText: "Can you join the call at 3 PM?",
  },
  {
    userId: "5",
    name: "Casey",
    profile_pic: "https://example.com/casey.jpg",
    lastText: "Can you join the call at 3 PM?",
  },
  {
    userId: "5",
    name: "Casey",
    profile_pic: "https://example.com/casey.jpg",
    lastText: "Can you join the call at 3 PM?",
  },
  {
    userId: "5",
    name: "Casey",
    profile_pic: "https://example.com/casey.jpg",
    lastText: "Can you join the call at 3 PM?",
  },
  {
    userId: "5",
    name: "Casey",
    profile_pic: "https://example.com/casey.jpg",
    lastText: "Can you join the call at 3 PM?",
  },

  


]
function Sidebar() {
  const [myFriends, setMyFriends] = useState([]);

  const fetchFriends = async () => {
    setMyFriends(friends);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <Search friends={friends} />
      <ul className=" overflow-auto h-[700px] scroll-container1  pb-[85px] md:pb-[135px]"
      >
        {myFriends.map((friend, index) => (
          <li
            key={index}
            className="px-4 py-2 cursor-pointer text-black flex items-center gap-2 border-b-[1px] border-[black]"
            onClick={() => {}}
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