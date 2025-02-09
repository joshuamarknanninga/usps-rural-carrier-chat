import React from 'react';

const ChatRoom = ({ messages, newMessage, onMessageChange, onSendMessage }) => {
  return (
    <div className="chat-room">
      <h2>Chat Room</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={onMessageChange}
        placeholder="Type a message..."
      />
      <button onClick={onSendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;