import "./sidebar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import { Users } from "../../dummyData";
import CloseFriend from "../CloseFriend/CloseFriend";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const SU = process.env.REACT_APP_SERVER_URL;

export default function Sidebar() {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = axios
        .get(
          // "http://localhost:8800/api/users/all"
          `${SU}users/all`
        )
        .then(function (response) {
          // handle success

          setAllUsers(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    fetchUsers();
  }, []);

  return (
    <div className="sidebar" id="sb">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutlineIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutlineIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <SchoolIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr "></hr>
        <ul className="sidebarFriendList">
          {/* {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))} */}
          <h3>All users</h3>
          {/* {allUsers.data !== undefined
            ? allUsers.data.map((u) => <p key={u.id}>{u.username}</p>)
            : null} */}
          <div className="usersContainer">
            {allUsers.data?.map((u, index) => (
              <a
                key={index}
                href={"/profile/" + u.username}
                style={{ textDecoration: "none" }}
              >
                <div className="sidbarUsers">
                  <img
                    src={
                      u.profilePicture
                        ? u.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt="error"
                    className="sidebarImg"
                  />
                  <span className="rightbarFollowingName">{u.username}</span>
                </div>
              </a>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}
