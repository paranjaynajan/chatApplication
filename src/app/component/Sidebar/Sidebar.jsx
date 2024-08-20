import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import { Avatar, InputAdornment, TextField } from '@mui/material';
import friends from "@/utils/jsonData"
import { motion } from 'framer-motion';
function Sidebar({setFriendId}) {

  const [filteredFriends, setFilteredFriends] = useState([]);
  const fetchFriends = async () => {
    setFilteredFriends(friends);
  };
  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  useEffect(() => {
    fetchFriends();
  }, []);


  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <Search friends={friends} setFilteredFriends={setFilteredFriends} />
      <ul className="overflow-auto mt-3 sectionHeight scroll-container1" style={{ scrollBehavior: 'smooth' }}>

      {filteredFriends.map((friend, index) => (
        <motion.li
          key={index}
          className="px-4 py-2 cursor-pointer text-black flex items-center gap-2 border-b-[1px] border-[black]"
          onClick={() => { setFriendId(friend.userId); }}
          initial="hidden"
          animate="visible"
          variants={listVariants}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Avatar
            src={friend.profile_pic}
            alt={friend.name}
            className="w-10 h-10 rounded-full mr-2"
          />
          <div className="flex flex-col gap-2">
            <div className="font-[500] text-lg">{friend.name}</div>
            <div className="text-md">{friend.lastText}</div>
          </div>
        </motion.li>
      ))}
    </ul>
    </div>
  );
}


export default Sidebar