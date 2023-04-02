import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
const SU = process.env.REACT_APP_SERVER_URL;

export default function Post(props) {
  const [like, setlike] = useState(props.post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [del, setDel] = useState(false);

  const [user, setUser] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(props.post.likes.includes(currentUser._id));
  }, [currentUser._id, props.post.likes]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler = async () => {
    try {
      await axios.put(`${SU}posts/` + props.post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }

    setlike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // const user = Users.filter((u) => u.id === 1);
  // console.log(user);

  //fecthing data
  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`${SU}users/?userId=${props.post.userId}`)
        .then(function (response) {
          // handle success
          setUser(response.data);
          // console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    fetchUser();
  }, [props.post.userId]);

  const handleDelete = async () => {
    try {
      await axios.post(`${SU}posts/${props.post._id}`, {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }

    // axios
    //   .delete(`http://localhost:8800/api/posts/${props.post._id}`, {
    //     userId: currentUser._id,
    //   })

    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   });
    console.log(currentUser._id);
    window.location.reload();
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "/person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(props.post.createdAt)}</span>
          </div>
          {props.post.userId === currentUser._id && (
            <div className="postTopRight">
              <MoreVertIcon className="" onClick={() => setDel(!del)} />
              {del && (
                <div className="deleteBox">
                  <DeleteIcon />
                  <div className="deleteButton" onClick={handleDelete}>
                    Delete
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="postCenter">
          <span className="postText">{props.post?.desc}</span>
          {props.post.img != null && (
            <img className="postImg" src={PF + props.post.img} />
          )}
          {/* {console.log(props.post.img)} */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {/* <img
              className="likeIcon"
              src={PF + "/like.png"}
              onClick={likeHandler}
              alt=""
            /> */}
            <img
              className="likeIcon"
              src={PF + "/heart.png"}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            {/* <span className="postCommentText">
              {" "}
              {props.post.comment} comments{" "}
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
