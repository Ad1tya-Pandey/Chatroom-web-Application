import React, { useEffect, useState } from "react";
import axios from "axios";

const Chatpage = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    // for using func as blocking style execution
    const { data } = await axios.get("/api/chat");

    //console.log(data);
    setChats(data);
  };

  useEffect(() => {
    // it is a hook, it runs when the component is rendered in react for the first time
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}> {chat.chatName}</div>
      ))}{" "}
    </div>
  );
};

export default Chatpage;
