import SearchIcon from '@mui/icons-material/Search';
import { Avatar, InputAdornment, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React,{useState,useRef,useEffect} from 'react'
function Search({friends}) {
  const [formData, setFormData] = useState({ friend: '' });
  const [filteredFriends, setFilteredFriends] = useState(friends);
  const [friendDropdownOpen, setFriendDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


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

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setFriendDropdownOpen(false);
    }
  };

  const clearFriend = () => {
    setFormData({ friend: '' });
    setFilteredFriends(friends);
    setFriendDropdownOpen(false);
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="relative h-[50px] mb-2" ref={dropdownRef}>
      <TextField
        type="text"
        placeholder="Select Friend"
        name="friend"
        value={formData.friend}
        autoComplete="off"
        onChange={handleSearchChange}
        
        onClick={() => setFriendDropdownOpen(!friendDropdownOpen)}
        className={`h-[55px] xs:h-[59px] p-4 w-full border-none`}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        endAdornment:(
          <InputAdornment position="end">
              <CloseIcon onClick={clearFriend} className='cursor-pointer' />
            </InputAdornment>
        )}}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'black', // Remove border color for the normal state
              },
              '&:hover fieldset': {
                borderColor: 'black', // Remove border color for hover state
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent', // Remove border color for focused state
              },
            },
            '& .MuiInputBase-root': {
              '&:hover': {
                borderColor: 'transparent', // Remove border color on hover
              },
              '&.Mui-focused': {
                borderColor: 'transparent', // Remove border color on focus
              },
            },
            '& .MuiInput-underline:before': {
              borderBottom: 'none', // Remove underline in default state
            },
            '& .MuiInput-underline:hover:before': {
              borderBottom: 'none', // Remove underline on hover
            },
            '& .MuiInput-underline:after': {
              borderBottom: 'none', // Remove underline after focus
            },
          }}
      />
      {friendDropdownOpen && filteredFriends && (
        <ul className="absolute w-full mt-1 bg-[#F5F7F8] text-black border rounded shadow max-h-60 overflow-auto scroll-container z-20">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer text-black flex items-center"
                onClick={() => {
                  setFormData({ ...formData, friend: friend.name });
                  setFriendDropdownOpen(false);
                }}
              >
                <Avatar
                  src={friend.profile_pic}
                  alt={friend.name}
                  className="w-6 h-6 rounded-full mr-2"
                />
                {friend.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No options found</li>
          )}
        </ul>
      )}
  
    </div>
  )
}

export default Search