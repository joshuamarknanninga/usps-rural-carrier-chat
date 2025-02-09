import React from 'react';

const ChatList = ({ onSelectRoom }) => {
  const rooms = ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5'];

  return (
    <div className="chat-list">
      <h2>Chat Rooms</h2>
      <ul>
        {rooms.map((room, index) => (
          <li key={index} onClick={() => onSelectRoom(room)}>
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;