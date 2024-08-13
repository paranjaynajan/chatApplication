import React, { useEffect, useState } from 'react'
import friends from "@/utils/jsonData"
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'next/image';
import wall from '../../../../public/images/wallpaepr.png'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
function Chat({ friendId,setFriendId }) {
  const [user, setUser] = useState(0)
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };




  const getFriendById = () => {
    const user = friends.filter((friend) => { return friend.userId == friendId })
    console.log(user, friendId, ">>>>>")
    setUser(user)
  }
  useEffect(() => {
    getFriendById()
  }, [friendId])



  if (!friendId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center bg-[#f7f7f7] p-6">
        <div className="flex flex-col items-center">
          <Image
            src={wall} 
            alt="No chat selected"
            className="mb-4 shadow-lg"
          />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Welcome to the Chat!
          </h2>
          <p className="text-gray-600 mb-6">
            Select a friend to start a conversation.
          </p>
          <button
            onClick={() => { }}
            type="button"
            className=" xs:p-2 p-2 w-[50%] border-[2px] cursor-pointer    rounded-md border-black bg-[black] text-white"
          >
            Find new friends
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=''>
      <div className='py-[26px] px-5 flex relative text-xl items-center justify-between bg-[#45474B] text-[#F4CE14]'>
        <div className='flex justify-center items-center gap-3'>
          <div className='cursor-pointer md:hidden block'onClick={()=>{setFriendId(null)}} >
            <KeyboardBackspaceIcon /> 
          </div>
          <div className='text-xl font-[600]'>
            {user[0]?.name}
          </div>
        </div>
        <div className='flex gap-4'>
          <VideoCallIcon color='#F4CE14' fontSize='large' className='cursor-pointer' />
          <LocalPhoneIcon color='#F4CE14' fontSize='medium' className='cursor-pointer mt-2' />
          <MoreVertIcon color='#F4CE14' fontSize='medium' className='cursor-pointer mt-2'
            onClick={handleClick} />
        </div>
      </div>
      Chat</div>
  )
}

export default Chat