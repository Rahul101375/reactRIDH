import React from "react";

import "./chatroom.css";
import chat from "./chat";
// import  party from 'party-js';
const ChatRoom = (props) => {
    const { roomId } = props?.match?.params || {};

// const {roomId} = props
  const { messages, sendMessage } = chat(roomId );
  const [newMessage, setNewMessage] = React.useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
 
  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
//     party.element(document.querySelector("#my-element"), {
//     count: party.variation(50, 0.5),
//     angleSpan: party.minmax(60, 120)
// });
  };
 
  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.user}:{message.body} 
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button id="my-element" onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default ChatRoom;