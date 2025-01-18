import React, { useState, useEffect } from 'react';
import { getMessages, sendMessage } from '../api';
import socket from '../socket';

const Chat = ({ userToken }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const msgs = await getMessages(userToken);
      setMessages(msgs);
    };

    fetchMessages();

    socket.emit('join', userToken);
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [userToken]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const message = await sendMessage(newMessage, userToken);
      socket.emit('send_message', message);
      setNewMessage('');
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg._id}>
            <strong>{msg.sender.username}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
