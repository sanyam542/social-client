import "./profile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const SU = process.env.REACT_APP_SERVER_URL;

export default function Profile() {
  const [user, setUser] = useState([]);
  const [dpFile, setDpFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const username = useParams().username;

  //fecthing data
  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`${SU}users?username=${username}`)

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

  const handleDp = async (e) => {
    e.preventDefault();
    const newProfilePic = {
      userId: user._id,
    };
    const data = new FormData();
    const fileName = dpFile.name;
    data.append("file", dpFile);
    data.append("name", fileName);
    // newProfilePic.profilePicture = fileName;
    try {
      const url = await axios.post(`${SU}upload`, data);
      newProfilePic.profilePicture = url.data;
      dispatch({ type: "UPDATE", payload: url.data });
    } catch (err) {
      console.log(err);
    }
    try {
      await axios.put(
        `${SU}users/${user._id}`,

        newProfilePic
      );
      console.log(currentUser);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCover = async (e) => {
    e.preventDefault();
    const newCoverPic = {
      userId: user._id,
    };
    const data = new FormData();
    const fileName = coverFile.name;
    data.append("file", coverFile);
    data.append("name", fileName);
    // newCoverPic.coverPicture = fileName;
    try {
      const url = await axios.post(`${SU}upload`, data);
      newCoverPic.coverPicture = url.data;
    } catch (err) {
      console.log(err);
    }
    try {
      await axios.put(
        `${SU}users/${user._id}`,

        newCoverPic
      );

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // $(function () {
  //   $(".profileUserImg").hover(
  //     function () {
  //       $("#b").css("background-color", "transparent");
  //     },
  //     function () {
  //       // on mouseout, reset the background colour
  //       $(".editProfileDiv").css("background-color", "white");
  //     }
  //   );
  // });

  return (
    <>
      <Topbar />

      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            {user.username === currentUser.username && (
              <form action="" onSubmit={handleCover} className="coverForm">
                <label htmlFor="cover" className="editCover">
                  <EditIcon />
                  <span className="editOptionText">Change cover picture</span>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept=".jpg,.png,.jpeg"
                    id="cover"
                    onChange={(e) => {
                      setCoverFile(e.target.files[0]);
                    }}
                  />

                  {/* {coverFile !== null && <button type="submit">Upload</button>} */}
                </label>
                {coverFile !== null && (
                  <div>
                    <CancelIcon
                      className="coverCancelImg"
                      onClick={() => setCoverFile(null)}
                    />
                    <button
                      type="submit"
                      className="uploadButton"
                      style={{ left: "35px" }}
                    >
                      Upload
                    </button>
                  </div>
                )}
              </form>
            )}
            {coverFile && (
              <div className="">
                <img
                  src={URL.createObjectURL(coverFile)}
                  className="coverPicUpdate"
                  alt="cover"
                />
              </div>
            )}

            <div className="profileCover">
              <img
                className=" profileCoverImg "
                src={
                  user.coverPicture
                    ? user.coverPicture
                    : PF + "marc-kleen-EjQxjS9y6yc-unsplash.jpg"
                }
                alt="cover"
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : PF + "/person/noAvatar.png"
                }
                alt="profilePic"
              />

              {user.username === currentUser.username && (
                <form action="" className="profileForm" onSubmit={handleDp}>
                  <label htmlFor="dp" className="editProfileLabel">
                    <div className="editProfileDiv">
                      <EditIcon className="profileIcon" />
                      <span className="editOptionText ">Change </span>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        id="dp"
                        accept=".jpg,.png,.jpeg"
                        onChange={(e) => {
                          setDpFile(e.target.files[0]);
                        }}
                      />
                    </div>
                  </label>
                  {dpFile !== null && (
                    <>
                      <CancelIcon
                        className="CancelImg"
                        onClick={() => setDpFile(null)}
                      />
                      <button type="submit" className="uploadButton">
                        Upload
                      </button>
                    </>
                  )}
                </form>
              )}
              {dpFile && (
                <div className="shareImgContainer">
                  <img
                    src={URL.createObjectURL(dpFile)}
                    className="proflePicUpdate"
                    alt="profilePic"
                  />
                </div>
              )}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>

              <hr />
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} profile="profile" />
            <Rightbar user={user} className="rightbar" />
          </div>
        </div>
      </div>
    </>
  );
}
