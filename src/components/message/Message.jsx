import "./message.css";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "axios";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const SU = process.env.REACT_APP_SERVER_URL;

export default function Message({ message, own }) {
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`${SU}users/?userId=${message.sender}`)

        .then(function (response) {
          setUser(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    fetchUser();
  }, [message]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src={
            user?.profilePicture
              ? user.profilePicture
              : `{${PF}/person/noAvatar.png}`
          }
          className="messageImg"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
