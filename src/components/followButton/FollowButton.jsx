import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import "./followButton.css";
const SU = process.env.REACT_APP_SERVER_URL;

const FollowButton = ({ user }) => {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState();

  useEffect(() => {
    currentUser.followings.includes(user?._id)
      ? setFollowed(true)
      : setFollowed(false);
  }, [currentUser, user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(
          `${SU}users/${user._id}/unfollow`,

          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`${SU}users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user.username !== currentUser.username && (
        <button className="followButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <RemoveIcon /> : <AddIcon />}
        </button>
      )}
    </>
  );
};

export default FollowButton;
