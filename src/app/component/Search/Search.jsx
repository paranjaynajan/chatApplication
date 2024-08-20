import SearchIcon from '@mui/icons-material/Search';
import { Avatar, InputAdornment, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React,{useState,useRef,useEffect} from 'react'
function Search({setFilteredFriends,friends}) {
  const [formData, setFormData] = useState({ friend: '' });
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, friend: value });

    if (value) {
      const filtered = friends.filter((friend) =>
        friend.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFriends(filtered);
    } else {
      setFilteredFriends(friends);
    }
  };



  const clearFriend = () => {
    setFormData({ friend: '' });
    setFilteredFriends(friends);
  };

  return (
 <div className="relative h-[50px] mb-2">
  <TextField
    type="text"
    placeholder="Select Friend..."
    name="friend"
    value={formData.friend}
    autoComplete="off"
    onChange={handleSearchChange}
    className={`h-[50px] p-2 w-full border-none`}  // Adjusted height and padding
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <CloseIcon onClick={clearFriend} className="cursor-pointer" />
        </InputAdornment>
      ),
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'black', // Set border color for all states
        },
        '&:hover fieldset': {
          borderColor: 'black', // Ensure border color remains on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'black', // Keep border color on focus
        },
      },
      '& .MuiInputBase-input::placeholder': {
        color: 'black', // Set placeholder text color here
        opacity: 0.7, // Set placeholder opacity
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: '4px', // Optional: Adjust border radius for a cleaner look
      },
    }}
  />
</div>

  
  )
}

export default Search