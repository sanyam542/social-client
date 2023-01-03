import Share from "../share/Share";
import "./feed.css";
import "../share/Share";
import Post from "../post/Post";

import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Feed(props) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = props.username
        ? await axios
            .get("/posts/profile/" + props.username)
            .then(function (response) {
              // handle success
              setPosts(
                response.data.sort((p1, p2) => {
                  return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
              );
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
        : await axios
            .get("/posts/timeline/" + user._id)
            .then(function (response) {
              // handle success
              setPosts(
                response.data.sort((p1, p2) => {
                  return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
              );
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
    };
    fetchPosts();
  }, [user, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!props.username || props.username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
