import "./profile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, userParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState([]);

  const username = useParams().username;
  console.log(username);

  //fecthing data
  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`/users?username=${username}`)
        .then(function (response) {
          // handle success
          setUser(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />

      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "/person/noCover.png"
                }
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "/person/noAvatar.png"
                }
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
