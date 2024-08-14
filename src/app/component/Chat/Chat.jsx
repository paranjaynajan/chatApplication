import React, { useEffect, useState } from 'react'
import friends from "@/utils/jsonData"

import Image from 'next/image';


import Input from '../Input/Input';
import Callingbar from '../Callingbar/Callingbar';
import ChatWindow from '../Chatwindow/Chatwindow';
import ChatPlaceholder from '../ChatPlaceholder/ChatPlaceholder';
function Chat({ friendId, setFriendId }) {
  const [user, setUser] = useState(0)





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
    <ChatPlaceholder/>



    );
  }
  const messages = [
    { id: 1, type: 'received', text: 'Hey! How are you doing?' },
    { id: 2, type: 'sent', text: 'I’m good, thanks! How about you?' },
    { id: 3, type: 'received', text: 'Did you see the game last night?' },
    { id: 4, type: 'sent', text: 'Yes, it was amazing!' },
    { id: 5, type: 'received', text: 'Let’s catch up sometime!' },
    { id: 6, type: 'sent', text: 'Sure, let’s plan something for the weekend.' },
    { id: 7, type: 'received', text: 'I’ll send you the documents by evening.' },
    { id: 8, type: 'sent', text: 'Thanks! I’ll look into it.' },
    { id: 9, type: 'received', text: 'Can you join the call at 3 PM?' },
    { id: 10, type: 'sent', text: 'Yes, I’ll be there.' },
    { id: 11, type: 'received', text: 'Got the tickets for the concert!' },
    { id: 12, type: 'sent', text: 'Great! I’m excited for it.' },
    { id: 13, type: 'received', text: 'See you at the gym tomorrow!' },
    { id: 14, type: 'sent', text: 'Looking forward to it!' },
    { id: 15, type: 'received', text: 'Happy Birthday! 🎉' },
    { id: 16, type: 'sent', text: 'Thank you! 😊' },
    { id: 17, type: 'received', text: 'Good morning! Have a great day ahead!' },
    { id: 18, type: 'sent', text: 'Good morning! You too!' },
    { id: 19, type: 'received', text: 'Are we still on for dinner tonight?' },
    { id: 20, type: 'sent', text: 'Yes, see you at 8 PM.' },
    { id: 19, type: 'received', text: 'Are we still on for dinner tonight?' },
    { id: 20, type: 'sent', text: 'Yes, see you at 8 PM.' },
    { id: 19, type: 'received', text: 'Are we still on for dinner tonight?' },
    { id: 20, type: 'sent', text: 'Yes.' },
  ];

  return (
    <div className="flex flex-col h-full  ">
      <div className="sticky top-0 z-10">
        <Callingbar userName={user[0]?.name} setFriendId={setFriendId} />
      </div>
      <div style={{ scrollBehavior: 'smooth' }} className="flex-grow  pb-5 bg-[url('/path/to/whatsapp-bg.png')] bg-repeat bg-center p-4 overflow-y-auto scroll-container2">
       <ChatWindow messages={messages}/>
      </div>
      <div className="p-4 bg-[#F5F7F8] sticky bottom-0">
        <Input/>
      </div>
    </div>
  );
}

export default Chat