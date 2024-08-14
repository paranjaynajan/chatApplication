import React,{useState} from "react"
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const Callingbar =({userName,setFriendId})=>{
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
            <div className='py-[26px] px-5 flex relative text-xl items-center justify-between bg-[#45474B] text-[#F4CE14]'>
        <div className='flex justify-center items-center gap-3'>
          <div className='cursor-pointer md:hidden block' onClick={() => { setFriendId(null) }} >
            <KeyboardBackspaceIcon />
          </div>
          <div className='text-xl font-[600]'>
            {userName}
          </div>
        </div>
        <div className='flex gap-4'>
          <VideoCallIcon color='#F4CE14' fontSize='large' className='cursor-pointer' />
          <LocalPhoneIcon color='#F4CE14' fontSize='medium' className='cursor-pointer mt-2' />
          <MoreVertIcon color='#F4CE14' fontSize='medium' className='cursor-pointer mt-2'
            onClick={handleClick} />
        </div>
      </div> 
    )
}
export default Callingbar