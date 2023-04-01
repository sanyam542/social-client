import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const SU = process.env.REACT_APP_SERVER_URL;

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const [friends, setFriends] = useState([]);
  const [query, setQuery] = useState("");
  const [chatmenu, setChatmenu] = useState(false);

  useEffect(() => {
    socket.current = io(
      // "wss://social-socket-czw5.onrender.com"
      "ws://localhost:8900"
    );
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${SU}conversations/` + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${SU}messages/` + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`${SU}users/friends/` + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    console.log(user);
  }, [user]);

  // const createConversation = async () => {
  //   let data = {
  //     "senderId":user._id,
  //   "receiverId":
  //   };
  //   try {
  //     axios.post("http://localhost:8800/api/conversations", data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        `{SU}/messages`,

        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMenu = () => {
    if (chatmenu === false) {
      var element = document.querySelector(".chatMenuWrapper");
      element.classList.add("displayNone");
      setChatmenu(true);
    } else {
      var element = document.querySelector(".chatMenuWrapper");
      element.classList.remove("displayNone");
      setChatmenu(false);
    }
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="arrowContainer">
            {chatmenu ? (
              <ArrowForwardIcon className="arrow" onClick={handleMenu} />
            ) : (
              <ArrowBackIcon className="arrow" onClick={handleMenu} />
            )}
          </div>
          <div className="chatMenuWrapper">
            <input
              placeholder="Search for friends"
              className="chatMenuInput"
              onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
            />
            {query !== "" ? (
              <div className="conversationSearch">
                <ul>
                  {friends
                    ?.filter(
                      (user) =>
                        user.username.toLowerCase().includes(query) &&
                        !conversations.some((c) => c.members.includes(user._id))
                    )
                    .map((u) => {
                      return (
                        <li>
                          {" "}
                          <img
                            src={
                              u.profilePicture
                                ? PF + "/" + u.profilePicture
                                : PF + "/" + "person/noAvatar.png"
                            }
                            alt=""
                            className=""
                          />
                          <p>{u.username}</p>
                          <button
                            className="add"
                            onClick={async () => {
                              try {
                                axios.post(
                                  `${SU}conversations/`,

                                  { senderId: user._id, receiverId: u._id }
                                );
                                console.log("success");
                                window.location.reload();
                              } catch (err) {
                                console.log(err);
                              }
                            }}
                          >
                            <AddIcon />
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ) : null}

            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
