import React, { useEffect, useState } from "react";
import closeIcon from "../../images/closeIcon.png";
// import send from '../../images/send.png'
import { user } from "../join/Join";
import "./Chat.css";
import socketIo from "socket.io-client";
import Message from "../message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;

const ENDPOINT = "http://localhost:4500";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState("");

  const send = () => {
    const message = document.getElementById("chatInput").value;
    document.getElementById("chatInput").value = "";
    socket.emit("chat-message", { message, id });
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("connected");
      setId(socket.id);
    });

    console.log(socket);
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("new-user", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnected");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("send-message", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {};
  }, [messages]);
  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>CHAT*APP</h2>
          <a href="/">
            {" "}
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classss={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyPress = {(e)=>e.key === "Enter"? send() : null} type="text" id="chatInput" />
          <button onClick={send} className="sendBtn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
