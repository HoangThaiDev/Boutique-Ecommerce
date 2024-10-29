// Import Modules
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Import File CSS
import classes from "./css/boxChat.module.css";

// Import Icons
import { AiOutlineMessage } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { useEffect } from "react";

export default function BoxChat() {
  // Create + use Hooks
  const location = useLocation();

  // Create + use States
  const [isshowBoxChat, setIsShowBoxChat] = useState(false);

  // Side Effects
  useEffect(() => {
    setIsShowBoxChat(false);
  }, [location]);

  // Create + use event handles
  function showBoxChatHandle() {
    setIsShowBoxChat(true);
  }

  const hideBoxChatHandle = () => {
    setIsShowBoxChat(false);
  };

  return (
    <div className={classes["box-chat"]}>
      <AiOutlineMessage
        className={
          !isshowBoxChat
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
          <div className={classes["media-chat-admin"]}>
            <div className={classes["message-admin"]}>
              <span className={classes["messsage-admin-name"]}>ADMIN:</span>
              <span className={classes["messsage-admin-content"]}>
                Hello client
              </span>
            </div>
          </div>
          <div className={classes["media-chat-client"]}>
            <div className={classes["message-client"]}>
              <span className={classes["messsage-client-name"]}>ME:</span>
              <span className={classes["messsage-client-content"]}>
                Hello admin
              </span>
            </div>
          </div>
        </div>

        <div className={classes["box-chat-footer"]}>
          <FaUserCircle className={classes["icon-admin"]} />
          <input type="text" placeholder="Enter Message!" />
          <IoIosSend className={classes["icon-send-text"]} />
        </div>
      </div>
    </div>
  );
}
