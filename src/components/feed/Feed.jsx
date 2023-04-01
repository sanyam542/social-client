import Share from "../share/Share";
import "./feed.css";
import "../share/Share";
import Post from "../post/Post";

import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { SearchBar } from "../searchBar/SearchBar";
const SU = process.env.REACT_APP_SERVER_URL;

export default function Feed(props) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = props.username
        ? await axios
            .get(`${SU}posts/profile/` + props.username)
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
            .get(
              // "https://social-api-6q3t.onrender.com/api/posts/timeline/"
              `${SU}posts/timeline/` + user._id
            )
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
        <div id="feedSearchBar">
          <SearchBar
            style={{ border: "1px solid black", borderRadius: "30px" }}
          />
        </div>
        {(!props.username || props.username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
