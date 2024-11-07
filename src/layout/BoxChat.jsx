// Import Modules
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getSocket } from "../utils/socket";
import { useSelector } from "react-redux";

// Import File CSS
import classes from "./css/boxChat.module.css";

// Import Icons
import { AiOutlineMessage } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import APIServer from "../API/customAPI";

export default function BoxChat() {
  // Create + use Socket
  const socket = getSocket();
  const roomID = JSON.parse(localStorage.getItem("chat_room_id")) || null;

  // Create + use Hooks
  const location = useLocation();
  const messageClientRef = useRef();

  // Create + use States
  const [isshowBoxChat, setIsShowBoxChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.user);

  // Side Effects

  useEffect(() => {
    setIsShowBoxChat(false);
  }, [location]);

  // Socket
  socket.on("Server:adminSendMessage", (messages) => {
    setMessages(messages);
  });

  socket.on("Server:adminEndChat", (mess) => {
    setMessages([]);
    localStorage.removeItem("chat_room_id");
    alert(mess);
  });

  // Create + use event handles
  const sendMessageHandle = async () => {
    const valueMessage = messageClientRef.current.value;
    if (valueMessage.length === 0) return false;

    try {
      const res = await APIServer.message.send(roomID, valueMessage);
      if (res.status === 200) {
        const { messages } = res.data;

        if (messages.length === 0) {
          localStorage.removeItem("chat_room_id");
        }

        setMessages(messages);
        messageClientRef.current.value = "";
      }
    } catch (error) {
      const { data } = error.response;
      alert(data.message);
    }
  };

  const createChatRoom = async () => {
    try {
      const accessToken = user.accessToken || "";

      const res = await APIServer.chatRoom.create(accessToken);
      if (res.status === 200) {
        const { chatRoomId, messages } = res.data;
        localStorage.setItem("chat_room_id", JSON.stringify(chatRoomId));
        setMessages(messages);
      }
    } catch (error) {
      const { data } = error.response;
      alert(data.message);
      setIsShowBoxChat(false);
    }
  };

  const getChatRoom = async (roomID) => {
    try {
      const res = await APIServer.message.get(roomID);
      if (res.status === 200) {
        const { messages } = res.data;
        setMessages(messages);
      }
    } catch (error) {
      const { data } = error.response;
      alert(data.message);
      setIsShowBoxChat(false);
    }
  };

  const showBoxChatHandle = async () => {
    setIsShowBoxChat(true);

    if (!roomID) {
      return await createChatRoom();
    }

    if (roomID) {
      return await getChatRoom(roomID);
    }
  };

  const hideBoxChatHandle = () => {
    setIsShowBoxChat(false);
  };

  return (
    <div className={classes["box-chat"]}>
      <AiOutlineMessage
        className={
          isshowBoxChat
            ? `${classes["icon-box-chat"]} ${classes["active"]}`
            : classes["icon-box-chat"]
        }
        onClick={showBoxChatHandle}
      />

      <div
        className={
          isshowBoxChat
            ? `${classes["box-chat-container"]} ${classes["active"]}`
            : classes["box-chat-container"]
        }
      >
        <IoIosClose
          className={classes["icon-close-box-chat"]}
          onClick={hideBoxChatHandle}
        />

        <div className={classes["box-chat-header"]}>
          <p>Customer Support</p>
          <span>Let's Chat App</span>
        </div>
        <div className={classes["box-chat-section"]}>
          {messages.length > 0 &&
            messages.map((message) => (
              <div
                className={
                  message.sender === "admin"
                    ? classes["media-chat-admin"]
                    : classes["media-chat-client"]
                }
                key={message._id}
              >
                <div
                  className={
                    message.sender === "admin"
                      ? classes["message-admin"]
                      : classes["message-client"]
                  }
                >
                  <span
                    className={
                      message.sender === "admin"
                        ? classes["messsage-admin-name"]
                        : classes["messsage-client-name"]
                    }
                  >
                    {message.sender === "admin" ? "ADMIN" : "YOU:"}
                  </span>
                  <span
                    className={
                      message.sender === "admin"
                        ? classes["messsage-admin-content"]
                        : classes["messsage-client-content"]
                    }
                  >
                    {message.content}
                  </span>
                </div>
              </div>
            ))}
        </div>

        <div className={classes["box-chat-footer"]}>
          <FaUserCircle className={classes["icon-admin"]} />
          <input
            type="text"
            placeholder="Enter Message!"
            ref={messageClientRef}
          />
          <IoIosSend
            className={classes["icon-send-text"]}
            onClick={sendMessageHandle}
          />
        </div>
      </div>
    </div>
  );
}
