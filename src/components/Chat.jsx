import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="h-10 w-2/3 bg-[#5d5b8d]">
      <div className="my-2 px-2 flex justify-between items-center">
        <span className="text-gray-300">{data.user?.displayName}</span>
        <div className="px-2 gap-4 flex justify-between items-center">
          <h1>🤖</h1>
          <h1>🎥</h1>
          <h1>🆕</h1>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
