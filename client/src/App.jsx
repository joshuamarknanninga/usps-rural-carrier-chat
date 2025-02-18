import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatRoom from './components/ChatRoom';
import useWebSocket from './hooks/useWebSocket';

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const ws = useWebSocket('ws://localhost:5001');

  useEffect(() => {
    if (ws) {
      ws.onmessage = async (event) => {
        let messageData;
  
        // Check if the message is a Blob
        if (event.data instanceof Blob) {
          const text = await event.data.text(); // Convert Blob to text
          messageData = JSON.parse(text); // Parse the text as JSON
        } else {
          messageData = JSON.parse(event.data); // Parse the string as JSON
        }
  
        setMessages((prevMessages) => [...prevMessages, messageData]);
      };
    }
  }, [ws]);

  const sendMessage = () => {
    if (newMessage.trim() && ws) {
      const message = {
        roomId: selectedRoom,
        message: newMessage,
        user: 'User',
        timestamp: new Date(),
      };
      ws.send(JSON.stringify(message));
      setNewMessage('');
    }
  };

  return (
    <div className="App">
      <ChatList onSelectRoom={setSelectedRoom} />
      {selectedRoom && (
        <ChatRoom
          messages={messages}
          newMessage={newMessage}
          onMessageChange={(e) => setNewMessage(e.target.value)}
          onSendMessage={sendMessage}
        />
      )}
    </div>
  );
}

export default App;