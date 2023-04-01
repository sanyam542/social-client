import React, { useEffect, useState } from "react";
import axios from "axios";
import "./searchBar.css";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const SU = process.env.REACT_APP_SERVER_URL;

export const SearchBar = (props) => {
  const [query, setQuery] = useState("");

  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = axios
        .get(`${SU}users/all`)
        .then(function (response) {
          // handle success

          setAllUsers(response);
          // console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    fetchUsers();
  }, []);

  return (
    <div className="topbarCenter" id={props.id} style={props.style}>
      <div className="searchbar">
        <SearchIcon className="searchIcon" />
        <input
          onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
          placeholder="Search for a User"
          className="searchInput"
          // onChange={(e)=>}
        />
        {query !== "" ? (
          <CloseIcon className="closeIcon" onClick={() => setQuery("")} />
        ) : null}
      </div>
      {query !== "" ? (
        <div className="searchItems">
          <ul>
            {allUsers.data
              ?.filter((user) => user.username.toLowerCase().includes(query))
              .map((u) => {
                return (
                  <>
                    <li>
                      {" "}
                      <img
                        src={
                          u.profilePicture
                            ? PF + u.profilePicture
                            : PF + "person/noAvatar.png"
                        }
                        alt=""
                        className="topbarImg"
                      />
                      <a href={`/profile/${u.username}`}>{u.username}</a>
                    </li>
                    <hr />
                  </>
                );
              })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
