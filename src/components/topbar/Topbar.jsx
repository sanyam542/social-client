import "./topbar.css";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, redirect } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreIcon from "@mui/icons-material/More";
import { SearchBar } from "../searchBar/SearchBar";
import { height } from "@mui/system";

export default function Topbar() {
  // const [searchItems, setSearchItems] = useState(null);
  const { user } = useContext(AuthContext);
  const [logout, setLogout] = useState(false);
  const [addClass, setAddClass] = useState(false);

  // console.log(
  //   allUsers.data
  //     ?.filter((user) => user.username.toLowerCase().includes(query))
  //     .map((u) => {
  //       return u.username;
  //     })
  // );
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLogout = () => {
    redirect("/");
    localStorage.clear();
    // window.location.replace("http://localhost:3000/");
    window.location.reload();
  };

  function handleClickRight() {
    if (addClass == "sb" || addClass == null) {
      var element1 = document.querySelector("#sb");
      element1.classList.remove("sbSlide");
      var element = document.querySelector("#rb");
      element.classList.add("rbSlide");
      setAddClass("rb");
    } else {
      var element = document.querySelector("#rb");
      element.classList.remove("rbSlide");
      setAddClass(null);
    }
  }
  function handleClickLeft() {
    if (addClass == "rb" || addClass == null) {
      var element1 = document.querySelector("#rb");
      element1.classList.remove("rbSlide");
      var element = document.querySelector("#sb");
      element.classList.add("sbSlide");
      setAddClass("sb");
    } else {
      // var element1 = document.querySelector("#rb");
      // element1.classList.remove("rbSlide");
      setAddClass(null);
      var element = document.querySelector("#sb");
      element.classList.remove("sbSlide");
    }
  }

  const url = window.location.href;
  const urlM = "http://localhost:3000/messenger";

  // useEffect(() => {
  //   var height = window.innerHeight;

  //   console.log(height);
  // }, [height]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">GetSocial</span>
        </Link>
      </div>
      {/* <div id="topBarSearch"> */}
      <SearchBar id="topBarSearch" />
      {/* </div> */}
      <div className="topbarRight">
        {/* <div className="topbarLink">
          <span className="topbarLnk">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div> */}
        <div className="topbarIcons">
          {url !== urlM && (
            <div className="topbarIconItem personIcon">
              <PersonIcon onClick={handleClickLeft} />
            </div>
          )}
          <div className="topbarIconItem">
            <a href="/messenger">
              <ChatIcon />
            </a>
          </div>
          {/* <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div> */}
          <div className="topbarIconItem">
            <MoreVertIcon onClick={() => setLogout(!logout)} />
          </div>
          {logout && (
            <div className="logout">
              <a href="/" onClick={handleLogout}>
                <LogoutIcon />
                <p> LogOut</p>
              </a>
            </div>
          )}
        </div>

        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : PF + "/person/noAvatar.png"
            }
            alt=""
            className="topbarImg "
          />
        </Link>
        {url !== urlM && (
          <div className="more">
            <MoreIcon onClick={handleClickRight} />
          </div>
        )}
      </div>
    </div>
  );
}
