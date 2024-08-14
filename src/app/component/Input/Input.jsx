import { TextField } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import React from 'react'

function Input() {
  return (
    <input
    type="text"
    placeholder="Type a message..."
    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
  />)
}

export default Input