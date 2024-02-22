import React, { useContext, useRef, useState } from "react";
import { AVATAR_IMG } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const [owner, setOwner] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <>
      {message.senderId === currentUser.uid && owner ? (
        <div className=" flex flex-row-reverse gap-5 mb-5">
          <div className="flex flex-col text-gray-500 font-light">
            <img
              className="h-7 w-7 object-cover rounded-full"
              src={
                message.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : data.user.photoURL
              }
              alt="profile"
            />
            <span>Just now</span>
          </div>

          <div className="max-w-[80%] flex flex-col items-end gap-3">
            <p className="bg-[#8da4f1] text-gray-900 px-2 py-1 rounded-tl-xl rounded-bl-xl rounded-br-xl">
              {message.text}
            </p>
            {message.img && <img src={message.img} alt="" />}
          </div>
        </div>
      ) : (
        <div className=" flex gap-5 mb-5">
          <div className="flex flex-col text-gray-500 font-light">
            <img
              className="h-7 w-7 object-cover rounded-full"
              src={AVATAR_IMG}
              alt="profile"
            />
            <span>Just now</span>
          </div>

          <div className="max-w-[80%] flex flex-col gap-3">
            <p className="bg-white px-2 py-1 rounded-tr-xl rounded-bl-xl rounded-br-xl">
              hello
            </p>
            <img
              className="h-40 w-28 object-cover "
              src={AVATAR_IMG}
              alt="profile"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
