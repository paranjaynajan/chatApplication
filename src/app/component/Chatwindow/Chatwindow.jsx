const ChatWindow=({messages})=>{
    return ( <div className="flex flex-col h-[100px] mb-[40px] space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.type === 'sent' ? 'self-end bg-green-100' : 'self-start bg-white'
            } p-2 rounded-lg max-w-xs shadow-md`}
          >
            <p className="text-sm">{message.text}</p>
          </div>
        ))}
      </div>)
}
export default ChatWindow