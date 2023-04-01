import axios from "axios";
import { useContext, useRef } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Users } from "../../dummyData";
import Online from "../online/Online.jsx";
import "./rightbar.css";
// console.log(Users);
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const SU = process.env.REACT_APP_SERVER_URL;

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState();
  // currentUser.followings.includes(user?._id)
  const [info, setInfo] = useState(false);
  const inputCity = useRef("");
  const inputFrom = useRef("");
  const inputRelationship = useRef(1);

  useEffect(() => {
    // console.log(currentUser.followings);
    // console.log(user?._id);
    // console.log(currentUser.followings.includes(user?._id));
    currentUser.followings.includes(user?._id)
      ? setFollowed(true)
      : setFollowed(false);
  }, [currentUser, user]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          // "/users/friends/"
          `${SU}users/friends/` + user._id
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    // console.log(friends);
  }, [user]);
  // document.location.reload();

  const handleClick = async () => {
    console.log(followed);
    try {
      if (followed) {
        await axios.put(
          // `/users/${user._id}/unfollow`
          `${SU}users/${user._id}/unfollow`,

          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(
          // `/users/${user._id}/follow`
          `${SU}users/${user._id}/follow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInfoSubmit = async (e) => {
    console.log("clicked");
    e.preventDefault();
    try {
      await axios.put(
        `${SU}users/${user._id}`,

        {
          city: inputCity.current.value,
          from: inputFrom.current.value,
          relationship: inputRelationship.current.value,
          userId: user._id,
        }
      );
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={PF + "/gift.png"} className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and<b> 3 other friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAd" src={PF + "1576406586911.jpeg"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users?.map((u) => {
            return <Online key={u.id} user={u} />;
          })}
        </ul>
      </>
    );
  };
  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <form action="" onSubmit={handleInfoSubmit}>
          <div className="userInfo">
            <h4 className="rightbarTitle">User Information</h4>

            {user.username == currentUser.username &&
              (info ? (
                <CloseIcon className="icon" onClick={() => setInfo(false)} />
              ) : (
                <EditIcon className="icon" onClick={() => setInfo(true)} />
              ))}
            {info ? <button type="submit">update</button> : null}
          </div>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfokey">
                City : {info ? <input ref={inputCity} /> : null}
              </span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfokey">
                From :{info ? <input ref={inputFrom} /> : null}
              </span>
              <span className="rightbarInfoValue">{user.from}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfokey">
                Realtionship :{" "}
                {info ? (
                  <select
                    name=""
                    ref={inputRelationship}
                    id=""
                    onChange={() =>
                      console.log(inputRelationship.current.value)
                    }
                  >
                    {" "}
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                ) : null}
              </span>
              <span className="rightbarInfoValue">
                {user.relationship == 1 ? "Single" : "Married"}
              </span>
            </div>
          </div>
        </form>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends?.map((friend) => (
            <a
              key={friend._id}
              href={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </a>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar " id="rb">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
