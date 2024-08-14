import { TextField } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import React from 'react'

function Input() {
  return (<div className='flex rounded-b-[10px] items-center gap-5'>
<AddPhotoAlternateIcon fontSize='large' className='cursor-pointer'/>
    <input
    type="text"
    placeholder="Type a message..."
    className="w-full p-3 rounded-lg  bg-[#495E57] text-[#F4CE14] "
  />
  <SendIcon fontSize='large' className='cursor-pointer'/>
  </div>
)
}

export default Input