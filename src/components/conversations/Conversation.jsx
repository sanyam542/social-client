import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const SU = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(`${SU}users?userId=` + friendId);
        setUser(res.data);
        // console.log(user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture
            ? user.profilePicture
            : PF + "person/noAvatar.png"
        }
        className="conversationImg"
        alt={user?.username}
      />
      {/* <p className="convName">{user?.username}</p> */}
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
